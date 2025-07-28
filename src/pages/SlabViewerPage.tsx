import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrder, Order, Piece } from '../services/orders'
import { useI18n } from '../i18n/I18nContext'

export default function SlabViewerPage() {
  const { orderId, pieceId } = useParams<{ orderId: string; pieceId: string }>()
  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [piece, setPiece] = useState<Piece | undefined>(undefined)
  const [material, setMaterial] = useState<string>('Granite')
  const { t } = useI18n()

  useEffect(() => {
    if (!orderId || !pieceId) return
    const found = getOrder(orderId)
    setOrder(found)
    const p = found?.pieces.find((pc) => pc.id === pieceId)
    setPiece(p)
    if (found) setMaterial(found.material)
  }, [orderId, pieceId])

  if (!order || !piece) {
    return (
      <div className="p-4">
        <p>Slab not found.</p>
      </div>
    )
  }

  const materialColors: Record<string, string> = {
    Quartz: '#D6D3D1',
    Granite: '#A8A29E',
    Marble: '#E5E7EB',
    Concrete: '#9CA3AF',
  }
  const slabColor = materialColors[material] || '#D1D5DB'
  const thickness = 4

  return (
    <div className="p-4 space-y-4 pb-20 md:pb-4">
      <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline">
        ← {t('newOrder')}
      </Link>
      <h2 className="text-2xl font-bold">{t('viewer')}</h2>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1 flex items-center justify-center h-64 md:h-96">
          <div
            className="relative"
            style={{
              width: `${piece.width}px`,
              height: `${piece.height}px`,
              perspective: '800px',
            }}
          >
            <div
              className="absolute"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: slabColor,
                transform: `rotateX(-90deg) translateZ(${thickness}px)`,
                transformOrigin: 'top left',
              }}
            />
            <div
              className="absolute"
              style={{
                width: '100%',
                height: `${thickness}px`,
                backgroundColor: slabColor,
                transform: 'translateY(100%)',
                transformOrigin: 'top left',
              }}
            />
            <div
              className="absolute"
              style={{
                width: `${thickness}px`,
                height: '100%',
                backgroundColor: slabColor,
                transform: 'translateX(100%)',
                transformOrigin: 'top left',
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-64 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Material</label>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full bg-white">
              <option>Quartz</option>
              <option>Granite</option>
              <option>Marble</option>
              <option>Concrete</option>
            </select>
          </div>
          <button
            type="button"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700"
            onClick={() => alert('PDF export not implemented')}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
