// composant graphique temps réel
// affiche l'historique d'un capteur sous forme de courbe
// bibliotheque utilisée : recharts 
import React from 'react'
import {
  LineChart,           // type de graphique : courbe
  Line,                // la ligne de la courbe
  XAxis,               // axe horizontal
  YAxis,               // axe vertical
  Tooltip,             // info-bulle au survol de la courbe
  ResponsiveContainer  // s'adapte automatiquement à la taille
} from 'recharts'
import type { SensorType } from '../../types/Sensor'
import { getUnit } from '../../utils/sensorUtils'
import styles from './SensorChart.module.css'

interface SensorChartProps {
  history: string[]   // tableau des anciennes valeurs
  type: SensorType    // type du capteur pour l'unité
}

export const SensorChart: React.FC<SensorChartProps> = ({ history, type }) => {

  // On transforme les strings en objets pour recharts
  // ex: ["21.3", "21.1"] ->  [{ index:1, valeur:21.1 }, { index:2, valeur:21.3 }]
  // .reverse() pour avoir les plus anciennes à gauche
  // .filter() pour enlever les valeurs non numériques (OPEN, CLOSED, ON, OFF)
  const data = [...history]
    .reverse()
    .map((val, index) => ({
      index: index + 1,
      valeur: parseFloat(val)
    }))
    .filter(d => !isNaN(d.valeur)) //  enlève les NaN 

  // ex: capteur OPEN_CLOSE ou ON_OFF
  if (data.length < 2) {
    return (
      <p className={styles.waiting}>
        📊 Pas de graphique pour ce type de capteur
      </p>
    )
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>📈 Évolution en temps réel</h3>

      {/* ResponsiveContainer s'adapte à la largeur disponible */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>

          {/* Axe vertical avec l'unité du capteur */}
          <YAxis
            width={60}
            tickFormatter={val => `${val}${getUnit(type)}`}
          />

          {/* Axe horizontal caché */}
          <XAxis dataKey="index" hide />

          {/* Info-bulle qui apparaît au survol */}
          <Tooltip
            formatter={(val) => [`${val} ${getUnit(type)}`, 'Valeur']}
          />

          {/* La courbe bleue */}
          <Line
            type="monotone"           // courbe lisse
            dataKey="valeur"          // quelle donnée afficher
            stroke="#0077cc"          // couleur bleue
            strokeWidth={2}           // épaisseur
            dot={false}               // pas de points sur la courbe
            isAnimationActive={false} // désactive animation (temps réel)
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}