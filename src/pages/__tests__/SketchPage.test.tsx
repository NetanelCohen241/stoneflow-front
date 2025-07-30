import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SketchPage from '../SketchPage'
import { vi } from 'vitest'
import React from 'react'
var mockedSave: any

vi.mock('react-konva', async () => {
  const ReactModule = await import('react')
  return {
    Stage: ReactModule.forwardRef((props: any, ref: any) => {
      ReactModule.useImperativeHandle(ref, () => ({ toDataURL: () => 'data:image/png' }))
      return ReactModule.createElement('canvas', props)
    }),
    Layer: (props: any) => ReactModule.createElement('div', props),
    Line: (props: any) => ReactModule.createElement('div', props),
    Image: (props: any) => ReactModule.createElement('img', props)
  }
})
vi.mock('use-image', () => ({ default: () => [new Image()] }))
vi.mock('@react-three/fiber', async () => {
  const ReactModule = await import('react')
  return {
    Canvas: ReactModule.forwardRef((props: any, ref: any) => ReactModule.createElement('canvas', { ...props, ref }))
  }
})
vi.mock('@react-three/drei', async () => {
  const ReactModule = await import('react')
  return { OrbitControls: () => ReactModule.createElement('div') }
})

vi.mock('jspdf', () => {
  const saveMock = vi.fn()
  const addImageMock = vi.fn()
  const textMock = vi.fn()
  mockedSave = saveMock
  return {
    __esModule: true,
    default: class {
      addImage = addImageMock
      text = textMock
      internal = { pageSize: { getWidth: () => 210, getHeight: () => 297 } }
      save = saveMock
    },
    saveMock,
    addImageMock,
    textMock
  }
})

describe('SketchPage', () => {
  it('renders stage after image upload', () => {
    const { container } = render(<SketchPage />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['img'], 'test.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('calls jsPDF save on download', () => {
    const { container } = render(<SketchPage />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['img'], 'test.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [file] } })
    const button = screen.getByRole('button', { name: /download pdf/i })
    // mock refs
    const stage = container.querySelector('canvas') as HTMLCanvasElement
    if (stage) Object.defineProperty(stage, 'toDataURL', { value: () => 'data:image/png;base64,' })
    fireEvent.click(button)
    expect(mockedSave).toHaveBeenCalled()
  })
})

