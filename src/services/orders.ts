import { v4 as uuidv4 } from 'uuid';

export type OrderStatus = 'New' | 'In Production' | 'Completed' | 'Cancelled';

export interface Cutout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Piece {
  id: string;
  width: number;
  height: number;
  cutouts: Cutout[];
  photo?: string | null;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  surfaceType: string;
  material: string;
  pieces: Piece[];
  status: OrderStatus;
  createdAt: string;
}

const STORAGE_KEY = 'orders';

function readOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Order[]) : [];
}

function writeOrders(orders: Order[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

/**
 * Retrieve all orders from localStorage.
 */
export function getOrders(): Order[] {
  return readOrders();
}

/**
 * Retrieve a single order by its ID.
 */
export function getOrder(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

/**
 * Create a new order and persist it.
 */
export function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const orders = readOrders();
  const newOrder: Order = {
    ...order,
    id: uuidv4(),
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  writeOrders(orders);
  return newOrder;
}

/**
 * Update an existing order.
 */
export function updateOrder(id: string, updates: Partial<Omit<Order, 'id' | 'createdAt'>>): Order | undefined {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return undefined;
  const updated = { ...orders[idx], ...updates } as Order;
  orders[idx] = updated;
  writeOrders(orders);
  return updated;
}