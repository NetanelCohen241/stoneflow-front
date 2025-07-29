import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import NewOrderPage from '../NewOrderPage'
import { I18nProvider } from '../../i18n'
import { AuthProvider } from '../../hooks/useAuth'

describe('NewOrderPage kitchen section', () => {
  function setup() {
    render(
      <BrowserRouter>
        <I18nProvider initialLang="en">
          <AuthProvider>
            <NewOrderPage />
          </AuthProvider>
        </I18nProvider>
      </BrowserRouter>
    )
  }

  it('allows adding a surface from the kitchen section', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: /add surface/i }))
    expect(screen.getAllByPlaceholderText(/description/i)).toHaveLength(1)
  })

  it('adds and removes an object entry', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: /add object/i }))
    expect(screen.getAllByPlaceholderText(/description/i)).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: /remove/i }))
    expect(screen.queryAllByPlaceholderText(/description/i)).toHaveLength(0)
  })
})
