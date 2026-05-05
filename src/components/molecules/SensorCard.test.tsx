import { render, screen } from '@testing-library/react'
import { SensorCard } from './SensorCard'

test('affiche le nom du capteur', () => {
  render(
    <SensorCard
      sensor={{
        id: 'temp',
        name: 'Température',
        value: '22',
        type: 'TEMPERATURE'
      }}
    />
  )

  expect(screen.getByText(/Température/i)).toBeInTheDocument()
})