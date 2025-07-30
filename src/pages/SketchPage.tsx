import React, { useRef, useState } from 'react'
import { Stage, Layer, Line, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import jsPDF from 'jspdf'
import Button from '../components/Button'
import Input from '../components/Input'

export default function SketchPage() {
  const [imageData, setImageData] = useState<string | null>(null)
  const [bg] = useImage(imageData || '')
  const [lines, setLines] = useState<Array<{ points: number[] }>>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const stageRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [title, setTitle] = useState('')
  const [userName, setUserName] = useState('')
  const [dims, setDims] = useState({ width: 0, height: 0, depth: 0 })
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!/^image\/(png|jpe?g)$/.test(file.type)) {
      alert('Only JPG/PNG images are allowed')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImageData(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleMouseDown = (e: any) => {
    setIsDrawing(true)
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return
    const pos = e.target.getStage().getPointerPosition()
    const lastLine = lines[lines.length - 1]
    lastLine.points = lastLine.points.concat([pos.x, pos.y])
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const generatePDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    let imgY = 10
    if (imageData && stageRef.current) {
      const uri = stageRef.current.toDataURL()
      doc.addImage(uri, 'PNG', 10, imgY, pageWidth - 20, 0)
      imgY += (pageWidth - 20) * 0.75 + 10
    }
    if (threeCanvasRef.current) {
      const dataUrl = threeCanvasRef.current.toDataURL('image/png')
      doc.addImage(dataUrl, 'PNG', 10, imgY, pageWidth - 20, 60)
      imgY += 70
    }
    doc.text(`Title: ${title}`, 10, imgY)
    doc.text(`Name: ${userName}`, 10, imgY + 10)
    const today = new Date().toLocaleDateString()
    doc.text(`Date: ${today}`, 10, doc.internal.pageSize.getHeight() - 10)
    doc.save('sketch.pdf')
  }

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <Input
        label="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        label="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        label="Upload Sketch"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {imageData && (
        <Stage
          width={600}
          height={400}
          className="border"
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            <KonvaImage image={bg} width={600} height={400} />
            {lines.map((line, i) => (
              <Line key={i} points={line.points} stroke="red" strokeWidth={2} />
            ))}
          </Layer>
        </Stage>
      )}
      <div className="grid grid-cols-3 gap-2">
        <Input
          label="Width (cm)"
          type="number"
          value={dims.width}
          onChange={(e) => setDims({ ...dims, width: Number(e.target.value) })}
        />
        <Input
          label="Height (cm)"
          type="number"
          value={dims.height}
          onChange={(e) => setDims({ ...dims, height: Number(e.target.value) })}
        />
        <Input
          label="Depth (cm)"
          type="number"
          value={dims.depth}
          onChange={(e) => setDims({ ...dims, depth: Number(e.target.value) })}
        />
      </div>
      <div className="h-40 border" id="three-container">
        <Canvas ref={threeCanvasRef as any} camera={{ position: [3, 3, 3] }}>
          <ambientLight />
          <mesh scale={[dims.width / 10 || 1, dims.height / 10 || 1, dims.depth / 10 || 1]}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
          <OrbitControls />
        </Canvas>
      </div>
      <Button onClick={generatePDF}>Download PDF</Button>
    </div>
  )
}
