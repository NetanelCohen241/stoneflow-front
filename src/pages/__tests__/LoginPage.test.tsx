import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from '../LoginPage'
import { I18nProvider } from '../../i18n'
import { AuthProvider } from '../../hooks/useAuth'

describe('LoginPage', () => {
  it('renders visible submit button', () => {
    render(
      <BrowserRouter>
        <I18nProvider initialLang="en">
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </I18nProvider>
      </BrowserRouter>
    )
    const btn = screen.getByRole('button', { name: /log in/i })
    expect(btn).toHaveClass('bg-primary')
  })
})
