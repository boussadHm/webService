import React, { createContext, useContext,} from 'react'
import type{ SensorsMap } from '../types/Sensor'
import { useMqtt } from '../hooks/useMqtt'

const DEFAULT_BROKER = 'wss://random.pigne.org:443'

interface SensorContextType {
  sensors: SensorsMap
  connected: boolean
  connect: (url?: string) => void
  disconnect: () => void
}

const SensorContext = createContext<SensorContextType | undefined>(undefined)

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { sensors, connected, connect: mqttConnect, disconnect: mqttDisconnect } = useMqtt(DEFAULT_BROKER)

  const connect = (url?: string) => {
    mqttConnect(url || DEFAULT_BROKER)
  }

  const disconnect = () => {
    mqttDisconnect()
  }

  return (
    <SensorContext.Provider value={{ sensors, connected, connect, disconnect }}>
      {children}
    </SensorContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSensors = () => {
  const context = useContext(SensorContext)
  if (!context) throw new Error('useSensors doit être utilisé dans SensorProvider')
  return context
}