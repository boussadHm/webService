// App.tsx - test test
import { useMqtt } from './hooks/useMqtt'

function App() {
  const { sensors, connected } = useMqtt('wss://random.pigne.org:443') // ur et port du broker MQTT

  return (
    <div>
      {/* Affiche si on est connecté ou pas */}
      <h1>{connected ? 'Connecté' : 'Déconnecté'}</h1>

      {/* Affiche le nombre de capteurs reçus */}
      <p>Capteurs reçus : {Object.keys(sensors).length}</p>

      {/* Affiche les données brutes des capteurs */}
      <pre>{JSON.stringify(sensors, null, 2)}</pre>
    </div>
  )
}

export default App