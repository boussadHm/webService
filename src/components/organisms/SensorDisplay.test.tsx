import { render, screen } from '@testing-library/react'
import { SensorDisplay } from './SensorDisplay'

describe('SensorDisplay', () => {

  it('affiche une température', () => {

    const sensor = {
      id: '1',
      name: 'Temp',
      value: '22.5',
      type: 'TEMPERATURE',
      history: []
    }

    render(<SensorDisplay sensor={sensor} />)

    expect(screen.getByText(/22.5/)).toBeInTheDocument()

  })

})