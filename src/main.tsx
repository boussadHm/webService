// le point d'entree de l'application React
// c'est le premier fichier qui s'execute
// il injecte l'app Reat dans le div#root de index.html


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// browserRouter : active la navigation React Router
// sans lui les routes ne fonctionneront pas
import { BrowserRouter } from 'react-router-dom'

// SensorProvider : rend les données de capteurs disponibles 
// dans toute l'application via le Context API
import { SensorProvider } from './context/SensorContext'


import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    {/* BrowserRouter enveloppe toute l'app
        pout que Reat Router fonctionne*/}
    <BrowserRouter>
        {/* SensorProvider connecte l'app au broker MQTT
            et partage les capteurs dans tous les composants */}
        <SensorProvider>
            <App />
        </SensorProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
