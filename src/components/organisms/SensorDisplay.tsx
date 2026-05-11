import React from 'react';
import type { Sensor } from '../../types/Sensor';
import { getUnit } from '../../utils/sensorUtils';
import styles from './SensorDisplay.module.css';

interface Props {
  sensor: Sensor;
}

export const SensorDisplay: React.FC<Props> = ({ sensor }) => {
  const rawValue = sensor.value;
  const numericValue = Number(rawValue);
  const isValidNumber = !isNaN(numericValue);

  // ------------------------------
  //  TEMPERATURE
  if (sensor.type === 'TEMPERATURE') {
    let color = '#2c7a47'; // vert modéré
    if (numericValue > 26) color = '#d32f2f';
    if (numericValue < 10) color = '#1976d2';
    return (
      <div className={styles.temperature} style={{ color }}>
        🌡️ {numericValue.toFixed(1)} °C
      </div>
    );
  }

  // ------------------------------
  // ON_OFF
  
  if (sensor.type === 'ON_OFF') {
    const isOn =
      rawValue === '1' ||
      rawValue === 'true' ||
      rawValue.toLowerCase() === 'on';
    return (
      <div className={styles.onoff}>
        {isOn ? (
          <span className={styles.on}>💡 ON</span>
        ) : (
          <span className={styles.off}>☀ OFF</span>
        )}
      </div>
    );
  }

  // ------------------------------
  // OPEN_CLOSE
  if (sensor.type === 'OPEN_CLOSE') {
    const isOpen =
      rawValue === '1' ||
      rawValue === 'true' ||
      rawValue.toLowerCase() === 'open';
    return (
      <div className={styles.openclose}>
        {isOpen ? (
          <span className={styles.open}>🔓 OPEN</span>
        ) : (
          <span className={styles.closed}>🔒 CLOSED</span>
        )}
      </div>
    );
  }

  // ------------------------------
  // PERCENT ou HUMIDITY → jauge horizontale
  if (sensor.type === 'PERCENT' || sensor.type === 'HUMIDITY') {
    const percent = Math.min(100, Math.max(0, numericValue));
    const isDry = percent < 30;
    const isWet = percent > 70;
    let fillColor = '#2c7a47'; // normal
    if (isDry) fillColor = '#f9a825'; // orange sec
    if (isWet) fillColor = '#0288d1'; // bleu humide

    return (
      <div className={styles.gauge}>
        <div className={styles.bar}>
          <div
            className={styles.fill}
            style={{ width: `${percent}%`, backgroundColor: fillColor }}
          />
        </div>
        <div className={styles.label}>
          {sensor.type === 'HUMIDITY' ? '💧' : '📊'} {percent.toFixed(0)}%
        </div>
      </div>
    );
  }

  // ------------------------------
  //  PRESSURE
   
  if (sensor.type === 'PRESSURE') {
    // Valeur typique : 950 ~ 1050 hPa
    const pressure = numericValue;
    let trendIcon = '⏺️';
    if (pressure > 1020) trendIcon = '⬆️'; // haute pression
    else if (pressure < 990) trendIcon = '⬇️';
    return (
      <div className={styles.pressure}>
        <span className={styles.icon}>📈</span>
        <span className={styles.value}>{pressure.toFixed(0)}</span>
        <span className={styles.unit}>hPa</span>
        <span className={styles.trend}>{trendIcon}</span>
      </div>
    );
  }

  // ------------------------------
  // SPEED (vitesse)
  if (sensor.type === 'SPEED') {
    const speed = numericValue;
    let intensity = 'faible';
    if (speed > 50) intensity = 'élevée';
    else if (speed > 20) intensity = 'modérée';
    return (
      <div className={styles.speed}>
        <span className={styles.icon}>💨</span>
        <span className={styles.value}>{speed.toFixed(1)}</span>
        <span className={styles.unit}>km/h</span>
        <span className={styles.badge}>({intensity})</span>
      </div>
    );
  }

  // ------------------------------
  // POSITIVE_NUMBER (générique)
  if (sensor.type === 'POSITIVE_NUMBER') {
    return (
      <div className={styles.positiveNumber}>
        <span className={styles.value}>
          {isValidNumber ? numericValue.toFixed(2) : rawValue}
        </span>
        <span className={styles.unit}>{getUnit(sensor.type)}</span>
      </div>
    );
  }

  // ------------------------------
  // DEFAUT (fallback)
  return (
    <div className={styles.default}>
      <span className={styles.value}>
        {isValidNumber ? numericValue.toFixed(2) : rawValue}
      </span>
      <span className={styles.unit}>{getUnit(sensor.type)}</span>
    </div>
  );
};