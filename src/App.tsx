// composant principal de l'application
// il définit les routes : quelle page affihcier selon l'url du navigateur

import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/organisms/Navbar";
import { HomePage } from "./pages/HomePage";
import { SensorPage } from "./pages/SensorPage";
import styles from "./App.module.css";
import { BrokerInput } from "./components/molecules/BrokerInput";

function App() {
  return (
    // layout : Navbar à gauche + contenu à droite
    <div className={styles.app}>
      {/*Navbar = sidebar gauche avec liste des capteurs */}
      <Navbar />

      {/* Contenu principal à droite */}
      <main className={styles.main}>
        {/* En-tête avec le composant BrokerInput */}
        <div className={styles.header}>
          <BrokerInput />
        </div>

        <Routes>
          {/* /-->  page d'accueil avec tous les capteurs */}
          <Route path="/" element={<HomePage />} />

          {/* /:sensorId--> page détail d'un capteur
              ex: /temp_bureau ->affiche le capteur temp_bureau */}
          <Route path="/:sensorId" element={<SensorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
