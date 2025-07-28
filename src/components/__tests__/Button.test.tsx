import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button'

describe('Button', () => {
  it('applies primary background class', () => {
    render(<Button>Click</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('bg-primary')
  })
})
