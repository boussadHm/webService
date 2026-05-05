import { render, screen } from '@testing-library/react'
import { BrokerInput } from './BrokerInput'
import { SensorProvider } from '../../context/SensorContext'

test('affiche le bouton Connect', () => {
  render(
    <SensorProvider>
      <BrokerInput />
    </SensorProvider>
  )

  expect(screen.getByText(/Connect/i)).toBeInTheDocument()
})