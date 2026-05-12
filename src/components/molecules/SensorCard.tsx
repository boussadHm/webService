import React from 'react'
import styles from './SensorCard.module.css'
import type { Sensor } from '../../types/Sensor'
import { getUnit, getIcon } from '../../utils/sensorUtils'

interface Props {
  sensor: Sensor
}

export const SensorCard: React.FC<Props> = ({ sensor }) => {

  const value = Number(sensor.value)

  return (
    <div className={styles.card}>

      <span className={styles.icon}>
        {getIcon(sensor.type)}
      </span>

      <h3 className={styles.name}>{sensor.name}</h3>

      <p className={styles.type}>{sensor.type}</p>

      {/* Valeur avec unité : si la valeur n'est pas un nombre, affiche la valeur brute */}
      <p className={styles.value}>
        {isNaN(value) ? sensor.value : value.toFixed(1)}
        <span className={styles.unit}> {getUnit(sensor.type)}</span>
      </p>

    </div>
  )
}