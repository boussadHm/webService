// Fonctions utilitaires pour les capteurs

import type { SensorType } from '../types/Sensor'

// fonction qui retoune l'unité selon kle type de capteur
export function getUnit(sensorType: SensorType): string {
    const units: Record<SensorType, string> = {
        'TEMPERATURE': '°C',
        'HUMIDITY': '%',
        'PRESSURE': 'hPa',
        'SPEED': 'km/h',
        'PERCENT': '%',
        'ON_OFF': '',
        'OPEN_CLOSE': '',
        'POSITIVE_NUMBER': '',
    }
    return units[sensorType] ?? ''
}

// fonction qui retourne une icône selon le type de capteur
export function getIcon(sensorType: SensorType): string {
    const icons: Record<SensorType, string> = {
        'TEMPERATURE': '🌡️',
        'HUMIDITY': '💧',
        'PRESSURE': '🔵',
        'SPEED': '💨',
        'ON_OFF': '💡',
        'OPEN_CLOSE': '🚪',
        'PERCENT': '📊',
        'POSITIVE_NUMBER': '🔢',
    }
    return icons[sensorType] ?? '📡'
}