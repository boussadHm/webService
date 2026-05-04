import React, { createContext, useContext, useState } from 'react'

// 🔴 TYPE TEMPORAIRE (sera remplacé par celui de Sabrina)
type Sensor = {
  id: string
  name: string
  value: string
  type: string
  history: string[]
}

// 🔴 MAP TEMPORAIRE
type SensorsMap = Record<string, Sensor>

interface SensorContextType {
  sensors: SensorsMap
  connected: boolean
}
// TODO: remplacer par les types officiels après merge avec Sabrina

const SensorContext = createContext<SensorContextType | undefined>(undefined)

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // MOCK TEMPORAIRE
  const [sensors] = useState<SensorsMap>({
    temp_bureau: {
      id: 'temp_bureau',
      name: 'Température Bureau',
      value: '22.5',
      type: 'TEMPERATURE',
      history: ['22.5', '22.3', '22.1']
    }
  })

  const connected = true

  return (
    <SensorContext.Provider value={{ sensors, connected }}>
      {children}
    </SensorContext.Provider>
  )
}

export const useSensors = () => {
  const context = useContext(SensorContext)
  if (!context) throw new Error('useSensors doit être utilisé dans SensorProvider')
  return context
}