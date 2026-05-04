import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {

  it('affiche "Connecté" quand connected = true', () => {
    render(<StatusBadge connected={true} />)
    expect(screen.getByText(/Connecté/i)).toBeInTheDocument()
  })

  it('affiche "Déconnecté" quand connected = false', () => {
    render(<StatusBadge connected={false} />)
    expect(screen.getByText(/Déconnecté/i)).toBeInTheDocument()
  })

})