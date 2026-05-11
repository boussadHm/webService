// page détail d'un capteur
// quand on clique sur un capteur depuis la page d'accueil
// --> on arrive ici avec l'url : /:sensorId
// ex: /temp_bureau, /ventilateur...etc

import React from 'react'
import { useParams, Link } from 'react-router-dom'
// useParams permet de récuperer les parametres d'une route dynamique
import { useSensors } from '../context/SensorContext'
import { getUnit } from '../utils/sensorUtils'
import styles from './SensorPage.module.css'
import { SensorDisplay } from '../components/organisms/SensorDisplay'
import { SensorChart } from '../components/molecules/SensorChart'

export const SensorPage: React.FC = () => {
    // useParams recupere l'ID depuis l'url
    // exmpl: URL = /temp_bureau --> sensorId = temp_bureau
    const { sensorId } = useParams<{ sensorId: string }>()

    // on recupere tous les capteurs depuis le Context
    const { sensors } = useSensors()

    // on cherche le capteur qui correspond à l'ID de l'url
    const sensor = sensorId ? sensors[sensorId] : undefined

    // si le capteur n'existe pas encore:
    if (!sensor) {
        return (
            <div className={styles.notFound}>
                <h2>Capteur non trouvé</h2>
                <p>Le capteur que vous cherchez n'existe pas ou n'est pas encore disponible.</p>
                <Link to="/">Retour à l'accueil</Link>
            </div>
        )
    }

    // si le capteur existe:
    return (
        <div className={styles.page}>

            {/* Nom du capteur */}
            <h2 className={styles.title}>{sensor.name}</h2>
            <p className={styles.type}>
                Type : <strong>{sensor.type}</strong>
            </p>

            {/* Valeur actuelle */}
            <section className={styles.current}>
                <h3>Valeur actuelle</h3>
                <SensorDisplay sensor={sensor} />
            </section>

            {/* Graphique dtemps réel */}
            <SensorChart history={sensor.history} type={sensor.type} />

            {/* Historique des 10 dernières valeurs */}
            <section className={styles.history}>
                <h3>Historique</h3>
                <ul className={styles.list}>
                    {sensor.history.map((val, index) => {
                        // On vérifie si c'est un nombre ou un texte
                        const numVal = parseFloat(val)
                        const displayVal = isNaN(numVal)
                            ? val  // texte (OPEN, CLOSED, ON, OFF)
                            : `${numVal.toFixed(2)} ${getUnit(sensor.type)}` // nombre

                        return (
                            <li
                                key={index}
                                className={index === 0 ? styles.latest : styles.old}
                            >
                                {displayVal}
                            </li>
                        )
                    })}
                </ul>
            </section>

            {/* Bouton retour */}
            <Link to="/" className={styles.back}>
                Retour
            </Link>

        </div>
    )
}