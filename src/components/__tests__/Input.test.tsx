import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from '../Input'

it('applies modern focus ring', () => {
  render(<Input label="Name" />)
  const input = screen.getByRole('textbox')
  expect(input).toHaveClass('focus:ring-2')
  expect(input).toHaveClass('focus:ring-primary')
})
