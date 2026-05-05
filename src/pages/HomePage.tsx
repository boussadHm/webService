// c'est la page d'accueil de notre application
// elle affiche la liste de tous les capteurs reçus du broker MQTT

import React from 'react'
import { Link } from 'react-router-dom'
import { useSensors } from '../context/SensorContext'
import styles from './HomePage.module.css'

export const HomePage : React.FC = () => {
    // on recupere les capteurs depuis le contexte
    const{sensors} = useSensors()

    //on transfoire le dictionnaire en tableau
    const sensorList = Object.values(sensors)

    //si des capteurs sont pas encore reçus, on affiche un message de chargement
    if (sensorList.length === 0) {
    return (
      <div className={styles.waiting}>
        <p>⏳ En attente des capteurs...</p>
      </div>
    )
  }

  // sinon on affiche la liste des capteurs
  return (
    <div className={styles.grid}>
      {sensorList.map(sensor => (
        <Link
          key={sensor.id}
          to={`/${sensor.id}`}
          className={styles.link}
        >
          <div className={styles.card}>
            <h3>{sensor.name}</h3>
            <p>{sensor.value}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}