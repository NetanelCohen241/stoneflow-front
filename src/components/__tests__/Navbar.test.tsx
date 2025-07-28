import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders desktop links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    expect(screen.getAllByText('Dashboard')[0]).toBeInTheDocument()
    expect(screen.getAllByText('New Order')[0]).toBeInTheDocument()
  })

  it('toggles mobile menu', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    const menu = screen.getByTestId('mobile-menu')
    expect(menu.classList.contains('hidden')).toBe(true)
    await user.click(screen.getByLabelText('Toggle navigation'))
    expect(menu.classList.contains('block')).toBe(true)
  })
})
