import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../components/Navbar'
import { I18nProvider } from '../i18n/I18nContext'
import { BrowserRouter } from 'react-router-dom'

function renderNav() {
  return render(
    <BrowserRouter>
      <I18nProvider>
        <Navbar />
      </I18nProvider>
    </BrowserRouter>
  )
}

describe('Navbar translations', () => {
  it('shows hebrew by default and changes to english', () => {
    renderNav()
    expect(screen.getByText('לוח בקרה')).toBeInTheDocument()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } })
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
