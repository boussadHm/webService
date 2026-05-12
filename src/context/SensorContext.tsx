import React, { createContext, useContext,} from 'react'
import type{ SensorsMap } from '../types/Sensor'
import { useMqtt } from '../hooks/useMqtt'

const DEFAULT_BROKER = 'wss://random.pigne.org:443'

// Type du contexte : expose les capteurs, état connexion, fonctions et erreur
interface SensorContextType {
  sensors: SensorsMap
  connected: boolean
  connect: (url?: string) => void
  disconnect: () => void
  error: string | null
}

// Création du contexte (sera utilisé par les composants enfants)
const SensorContext = createContext<SensorContextType | undefined>(undefined)

// Fournisseur qui enrobe l'application pour partager les données MQTT
export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { sensors, connected, connect: mqttConnect, disconnect: mqttDisconnect, error } = useMqtt(DEFAULT_BROKER)

   // Wrapper de la fonction connect pour permettre un URL optionnel (si non fourni, utilise DEFAULT_BROKER)
  const connect = (url?: string) => {
    mqttConnect(url || DEFAULT_BROKER)
  }

  const disconnect = () => {
    mqttDisconnect()
  }

  return (
    <SensorContext.Provider value={{ sensors, connected, connect, disconnect, error }}>
      {children}
    </SensorContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSensors = () => {
  const context = useContext(SensorContext)
  if (!context) throw new Error('useSensors doit être utilisé dans SensorProvider')
  return context
}