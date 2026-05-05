import React, { useState } from 'react'
import { useSensors } from '../../context/SensorContext'
import styles from './BrokerInput.module.css'

export const BrokerInput: React.FC = () => {
  const { connected, connect, disconnect } = useSensors()

  const [url, setUrl] = useState('wss://random.pigne.org:443')

  const handleClick = () => {
    if (connected) {
      disconnect()
    } else {
      connect(url)
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={connected}
        className={styles.input}
      />

      <button
        onClick={handleClick}
        className={connected ? styles.disconnect : styles.connect}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  )
}