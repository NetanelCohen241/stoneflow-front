import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from '../Card'

it('renders with default styling', () => {
  render(
    <Card>
      <span>content</span>
    </Card>
  )
  const card = screen.getByText('content').parentElement
  expect(card).toHaveClass('rounded-xl')
  expect(card).toHaveClass('shadow-md')
})
