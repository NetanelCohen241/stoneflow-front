import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrder, updateOrder, Order, OrderStatus } from '../services/orders';
import { useI18n } from '../i18n';

/**
 * Order details page component.
 *
 * Displays the details of a single order, including customer
 * information, selected material, and the list of pieces with
 * dimensional information and optional photos. The status of the order
 * can be updated via a dropdown. A link is provided to open the slab
 * viewer for each piece.
 */
export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [status, setStatus] = useState<OrderStatus>('New');
  const { t } = useI18n();

  useEffect(() => {
    if (!id) return;
    const found = getOrder(id);
    if (!found) {
      navigate('/dashboard');
      return;
    }
    setOrder(found);
    setStatus(found.status);
  }, [id, navigate]);

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (!order) return;
    setStatus(newStatus);
    const updated = updateOrder(order.id, { status: newStatus });
    if (updated) {
      setOrder(updated);
    }
  };

  if (!order) {
    return null;
  }

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('orderDetails.title')}</h2>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          {t('orderDetails.back')}
        </Link>
      </div>
      <div className="bg-white p-4 rounded-lg shadow space-y-2">
        <p>
          <span className="font-semibold">{t('orderDetails.customer')}</span> {order.customerName}
        </p>
        <p>
          <span className="font-semibold">{t('orderDetails.phone')}</span> {order.phone}
        </p>
        <p>
          <span className="font-semibold">{t('orderDetails.address')}</span> {order.address}
        </p>
        <p>
          <span className="font-semibold">{t('orderDetails.surfaceType')}</span> {order.surfaceType}
        </p>
        <p>
          <span className="font-semibold">{t('orderDetails.material')}</span> {order.material}
        </p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{t('orderDetails.status')}</span>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className="bg-white border border-stone-300 px-2 py-1 rounded"
          >
            <option value="New">{t('status.new')}</option>
            <option value="In Production">{t('status.inProduction')}</option>
            <option value="Completed">{t('status.completed')}</option>
            <option value="Cancelled">{t('status.cancelled')}</option>
          </select>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{t('orderDetails.pieces')}</h3>
        <ul className="space-y-4">
          {order.pieces.map((p, idx) => (
            <li key={p.id} className="bg-white p-4 rounded-md shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Piece #{idx + 1}</h4>
                <Link
                  to={`/viewer/${order.id}/${p.id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  {t('orderDetails.view3d')}
                </Link>
              </div>
              <p className="text-sm text-stone-700">
                {t('orderDetails.dimensions', { width: p.width, height: p.height })}
              </p>
              <p className="text-sm text-stone-700">{t('orderDetails.cutouts', { count: p.cutouts.length })}</p>
              {p.photo && <img src={p.photo} alt="piece" className="mt-2 w-32 h-32 object-cover rounded" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}