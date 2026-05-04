// description des données reçues du broker MQTT

// tous les types de capteurs possibles
export type SensorType = 
    | 'POSITIVE_NUMBER' // nombre positif quelconque
    | 'PERCENT' // pourcentage (0 à 100)
    | 'ON_OFF' // allumé ou éteint
    | 'OPEN_CLOSE' // ouvert ou fermé
    | 'TEMPERATURE' // température en °C
    | 'HUMIDITY' // taux d'humidité
    | 'PRESSURE' // pression atmosphérique
    | 'SPEED' // vitesse


// la frome d'un capteur
//tout objet Sensor DOIT avoir ces champs
export interface Sensor {
    id: string // identifiant unique , ex: "temp_bureau"
    name: string // nom lisible , ex: "Température Bureau"
    value: string// valeur actuelle , ex: "21.3"
    type: SensorType // type de capteur , ex: "TEMPERATURE"
    history: string[] // anciennes valeurs , ex: ["21.3", "21.1", "20.9"]
}

// tous les capteurs dans un dictionnaire
// { "temp_bureau": {...}, "venti": {...} }
export type SensorsMap = Record<string, Sensor>
