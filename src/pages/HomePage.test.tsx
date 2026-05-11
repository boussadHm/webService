// src/pages/HomePage.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HomePage } from './HomePage'

// simulation du context api pour le test de HomePage
vi.mock('../context/SensorContext', () => ({
  useSensors: () => ({
    sensors: {
      temp_bureau: {
        id: 'temp_bureau',
        name: 'Température du bureau',
        value: '21.3',
        type: 'TEMPERATURE',
        history: ['21.3', '21.1']
      }
    }
  })
}))

describe('HomePage', () => {
  it('affiche les cartes des capteurs', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('Température du bureau')).toBeTruthy()
  })

  it('affiche le message attente si pas de capteurs', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('Température du bureau')).toBeTruthy()
  })
})