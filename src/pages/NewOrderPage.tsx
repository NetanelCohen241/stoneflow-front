import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, Piece, Cutout } from '../services/orders';
import { useI18n } from '../i18n';
import { v4 as uuidv4 } from 'uuid';

/**
 * New order page component.
 *
 * Provides a multi‑step form allowing the technician to specify customer
 * details, select surface type and material, and define one or more slab
 * pieces. Each piece can include arbitrary rectangular cutouts. When
 * submitted, the order is persisted to localStorage and the user is
 * redirected to the order details screen.
 */
export default function NewOrderPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [surfaceType, setSurfaceType] = useState('Kitchen');
  const [material, setMaterial] = useState('Quartz');

  // Piece currently being edited
  const [pieceWidth, setPieceWidth] = useState<number | ''>('');
  const [pieceHeight, setPieceHeight] = useState<number | ''>('');
  const [cutouts, setCutouts] = useState<Cutout[]>([]);
  const [piecePhoto, setPiecePhoto] = useState<string | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);

  const resetPieceForm = () => {
    setPieceWidth('');
    setPieceHeight('');
    setCutouts([]);
    setPiecePhoto(null);
  };

  const handleAddCutout = () => {
    setCutouts((prev) => [...prev, { x: 0, y: 0, width: 0, height: 0 }]);
  };

  const handleCutoutChange = (index: number, field: keyof Cutout, value: number) => {
    setCutouts((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const handleRemoveCutout = (index: number) => {
    setCutouts((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPiecePhoto(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPiecePhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPiece = () => {
    if (pieceWidth && pieceHeight) {
      const newPiece: Piece = {
        id: uuidv4(),
        width: Number(pieceWidth),
        height: Number(pieceHeight),
        cutouts: cutouts.map((c) => ({ ...c })),
        photo: piecePhoto,
      };
      setPieces((prev) => [...prev, newPiece]);
      resetPieceForm();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || pieces.length === 0) {
      alert(t('newOrder.completeAlert'));
      return;
    }
    const order = createOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      surfaceType,
      material,
      pieces,
    });
    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="p-4 pb-24 md:pb-4 space-y-6">
      <h2 className="text-2xl font-bold">{t('newOrder.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">{t('newOrder.customerName')}</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('newOrder.phone')}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('newOrder.address')}</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('newOrder.surfaceType')}</label>
            <select value={surfaceType} onChange={(e) => setSurfaceType(e.target.value)} className="w-full bg-white">
              <option>{t('surface.kitchen')}</option>
              <option>{t('surface.bathroom')}</option>
              <option>{t('surface.bar')}</option>
              <option>{t('surface.other')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('newOrder.material')}</label>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full bg-white">
              <option>{t('material.quartz')}</option>
              <option>{t('material.granite')}</option>
              <option>{t('material.marble')}</option>
              <option>{t('material.concrete')}</option>
            </select>
          </div>
        </div>
        {/* Piece definition */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">{t('newOrder.addSlabPiece')}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">{t('newOrder.width')}</label>
              <input
                type="number"
                value={pieceWidth}
                onChange={(e) => setPieceWidth(e.target.value === '' ? '' : Number(e.target.value))}
                min={0}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('newOrder.height')}</label>
              <input
                type="number"
                value={pieceHeight}
                onChange={(e) => setPieceHeight(e.target.value === '' ? '' : Number(e.target.value))}
                min={0}
                className="w-full"
              />
            </div>
          </div>
          {/* Cutouts Section */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{t('newOrder.cutouts')}</h4>
              <button
                type="button"
                onClick={handleAddCutout}
                className="text-sm text-blue-600 hover:underline"
              >
                {t('newOrder.addCutout')}
              </button>
            </div>
            {cutouts.length === 0 && <p className="text-sm text-stone-500">{t('newOrder.noCutouts')}</p>}
            {cutouts.map((cutout, idx) => (
              <div key={idx} className="grid gap-2 grid-cols-4 items-end">
                <div>
                  <label className="block text-xs mb-1">{t('newOrder.x')}</label>
                  <input
                    type="number"
                    value={cutout.x}
                    onChange={(e) => handleCutoutChange(idx, 'x', Number(e.target.value))}
                    min={0}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">{t('newOrder.y')}</label>
                  <input
                    type="number"
                    value={cutout.y}
                    onChange={(e) => handleCutoutChange(idx, 'y', Number(e.target.value))}
                    min={0}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">{t('newOrder.width')}</label>
                  <input
                    type="number"
                    value={cutout.width}
                    onChange={(e) => handleCutoutChange(idx, 'width', Number(e.target.value))}
                    min={0}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">{t('newOrder.height')}</label>
                  <input
                    type="number"
                    value={cutout.height}
                    onChange={(e) => handleCutoutChange(idx, 'height', Number(e.target.value))}
                    min={0}
                    className="w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCutout(idx)}
                  className="text-xs text-red-600 hover:underline ml-2"
                >
                  {t('newOrder.remove')}
                </button>
              </div>
            ))}
          </div>
          {/* Photo upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">{t('newOrder.uploadPhoto')}</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {piecePhoto && (
              <img src={piecePhoto} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>
          {/* Add Piece Button */}
          <button
            type="button"
            onClick={handleAddPiece}
            disabled={!pieceWidth || !pieceHeight}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {t('newOrder.addPiece')}
          </button>
        </div>
        {/* List of added pieces */}
        {pieces.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">{t('newOrder.pieces')}</h3>
            <ul className="space-y-2">
              {pieces.map((p, idx) => (
                <li key={p.id} className="border p-3 rounded-md flex items-center justify-between">
                  <span>
                    Piece #{idx + 1}: {p.width} × {p.height} cm ({p.cutouts.length}{' '}
                    cutout{p.cutouts.length === 1 ? '' : 's'})
                  </span>
                  {p.photo && <img src={p.photo} alt="piece" className="w-8 h-8 object-cover rounded ml-2" />}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Submit Order */}
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded-md hover:bg-orange-600"
        >
          {t('newOrder.create')}
        </button>
      </form>
    </div>
  );
}