import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders, Order, OrderStatus } from '../services/orders'
import { useI18n } from '../i18n/I18nContext'

export default function DashboardPage() {
  const { t } = useI18n()
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All')
  const orders = useMemo(() => getOrders(), [])
  const filtered =
    statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter)

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
        <Link
          to="/orders/new"
          className="bg-accent text-white px-4 py-2 rounded-md shadow hover:bg-orange-600"
        >
          + {t('newOrder')}
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="status" className="text-sm font-medium">
          Filter:
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'All')}
          className="bg-white"
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="In Production">In Production</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="text-stone-500">No orders yet. Create one to get started.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((order) => (
            <li
              key={order.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <Link to={`/orders/${order.id}`} className="block">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{order.customerName}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-600">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-stone-500">
                  {order.surfaceType} · {order.material}
                </p>
                <p className="text-sm text-stone-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
