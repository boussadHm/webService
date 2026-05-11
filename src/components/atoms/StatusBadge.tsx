import React from 'react'
import styles from './StatusBadge.module.css'

interface StatusBadgeProps {
  connected: boolean
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ connected }) => {
  return (
    <span className={connected ? styles.connected : styles.disconnected}>
      {connected ? '🟢 Connecté' : '🔴 Déconnecté'}
    </span>
  )
}