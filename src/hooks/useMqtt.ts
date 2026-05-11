// ce fichier gere la connexion au broker mqtt
// le brpker mqtt est un serveur qui reçoit les données des capteurs et les transmet aux clients abonnés

// useEffect = faire quelque chose au démarrage
// useRef = garder une variable sans re-afficher
// useState = stocker des données
import { useEffect, useRef, useState } from 'react'

// mqtt = la bibliothèque pour se connecter au broker
import mqtt from 'mqtt'
import type { MqttClient } from 'mqtt'

// on importe nos types TypeScript
import type { Sensor, SensorsMap } from '../types/Sensor'

// Nombre maximum de valeurs gardées dans l'historique
const HISTORY_SIZE = 10

// notre hook personnalisé
// initialUrl = l'URL du broker qu'on lui donne au démarrage
export function useMqtt(initialUrl: string) {

  // La liste de tous les capteurs reçus
  // Au départ elle est vide {}
  const [sensors, setSensors] = useState<SensorsMap>({})

  // true = connecté au broker
  // false = déconnecté
  const [connected, setConnected] = useState(false)

  // useRef garde le client MQTT en mémoire
  // sans déclencher un re-affichage de la page
  const clientRef = useRef<MqttClient | null>(null)

  // FONCTION CONNEXION 
  // Cette fonction se connecte au broker MQTT
  const connect = (url: string) => {

    // Si on est déjà connecté, on coupe d'abord
    if (clientRef.current) {
      clientRef.current.end()
    }

    // On se connecte au broker avec l'URL donnée
    const client = mqtt.connect(url, {
      clean: true,         // on repart de zéro à chaque connexion
      reconnectPeriod: 3000,   // on active la reconnexion automatique toutes les 3 secondes car il ya un bug 
      keepalive: 60,       //garde la connexion active en envoyant un ping toutes les 60 secondes
    })

    // Quand la connexion est établie avec le broker
    client.on('connect', () => {
      setConnected(true)   // on met connected à true
      
      // On s'abonne à TOUS les capteurs
      // value/# = tous les topics qui commencent par "value/"
      // ex: value/temp_bureau, value/ventilateur...
      client.subscribe('value/#', { qos: 1 })
    })

    // À CHAQUE message reçu d'un capteur
    client.on('message', (topic: string, message: Buffer) => {
      
      // On extrait l'ID du capteur depuis le topic
      // "value/temp_bureau" -->"temp_bureau"
      const id = topic.replace('value/', '')

      try {
        // On transforme le texte JSON en objet JavaScript
        // '{"name":"temp_bureau","value":"21.3","type":"TEMPERATURE"}'
        // devient → { name: "temp_bureau", value: "21.3", type: "TEMPERATURE" }
        const data = JSON.parse(message.toString())

        // On met à jour la liste des capteurs
        setSensors(prev => {
          
          // On récupère l'ancien capteur s'il existe
          const existing = prev[id]

          // On construit le nouvel historique
          // [nouvelle valeur, ...anciennes valeurs]
          const newHistory = [
            data.value,
            ...(existing?.history ?? [])
          ].slice(0, HISTORY_SIZE) // on garde max 10 valeurs

          // On retourne un nouvel objet avec le capteur mis à jour
          return {
            ...prev,   // on garde tous les autres capteurs
            [id]: {    // on met à jour CE capteur
              id,
              name: data.name,
              value: data.value,
              type: data.type,
              history: newHistory
            } as Sensor
          }
        })

      } catch (e) {
        console.error('Erreur parsing message MQTT:', e)
      }
    })

    // En cas d'erreur de connexion
    client.on('error', () => setConnected(false))

    // Quand la connexion se ferme
    client.on('close', () => setConnected(false))

    // On sauvegarde le client pour plus tard
    clientRef.current = client
  }
  // DÉCONNEXION 
  // Cette fonction coupe la connexion au broker
  const disconnect = () => {
    clientRef.current?.end()  // on ferme la connexion
    clientRef.current = null
    setConnected(false)
    setSensors({})            // on vide les capteurs
  }

  // DÉMARRAGE 
  // useEffect s'exécute une fois quand le composant apparaît
  // [] = une seule fois au démarrage
  useEffect(() => {
    connect(initialUrl)

    // Nettoyage quand le composant disparaît
    return () => {
      clientRef.current?.end()
    }
  }, []) 

  // On retourne ce dont les autres composants ont besoin
  return { sensors, connected, connect, disconnect }

} // fin du hook useMqtt