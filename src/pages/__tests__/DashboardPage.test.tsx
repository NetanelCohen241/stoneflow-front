import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DashboardPage from '../DashboardPage'
import { I18nProvider } from '../../i18n'

const sampleOrders = [
  {
    id: '1',
    customerName: 'John Doe',
    phone: '123',
    address: '123 St',
    surfaceType: 'Kitchen',
    material: 'Quartz',
    pieces: [],
    status: 'New',
    createdAt: new Date().toISOString(),
  },
]

beforeEach(() => {
  localStorage.setItem('orders', JSON.stringify(sampleOrders))
})

afterEach(() => {
  localStorage.clear()
})

it('renders orders inside Card components', () => {
  render(
    <BrowserRouter>
      <I18nProvider initialLang="en">
        <DashboardPage />
      </I18nProvider>
    </BrowserRouter>
  )
  const card = screen.getByText('John Doe').closest('a')?.parentElement
  expect(card).toHaveClass('rounded-xl')
})
