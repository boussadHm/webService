import React from 'react'
import styles from './SensorCard.module.css'

// 🔴 TYPE TEMPORAIRE
type Sensor = {
  id: string
  name: string
  value: string
  type: string
}

interface Props {
  sensor: Sensor
}

export const SensorCard: React.FC<Props> = ({ sensor }) => {

  const value = Number(sensor.value)

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{sensor.name}</h3>

      <p className={styles.type}>{sensor.type}</p>

      <p className={styles.value}>
        {isNaN(value) ? sensor.value : value.toFixed(1)}
      </p>
    </div>
  )
}