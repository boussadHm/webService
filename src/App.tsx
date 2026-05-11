// composant principal de l'application
// il définit les routes : quelle page affihcier selon l'url du navigateur

import { Routes, Route } from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import { SensorPage } from './pages/SensorPage'
import styles from './App.module.css'


function App() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>

        <Routes>
          {/* /-->  page d'accueil avec tous les capteurs */}
          <Route path="/" element={<HomePage />} />

          {/* /:sensorId--> page détail d'un capteur
              ex: /temp_bureau ->affiche le capteur temp_bureau */}
          <Route path="/:sensorId" element={<SensorPage />} />
        </Routes>

      </main>
    </div>
  )
}

export default App