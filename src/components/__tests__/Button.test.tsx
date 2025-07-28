import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button'

describe('Button', () => {
  it('uses gradient styling', () => {
    render(<Button>Click</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('from-primary')
    expect(btn).toHaveClass('to-accent')
  })
})
