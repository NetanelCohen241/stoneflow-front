export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function apiLogin(username: string, password: string): Promise<LoginResponse> {
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);
  body.append('grant_type', 'password');
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    throw new Error('Login failed');
  }
  return res.json();
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export async function apiRegister(data: RegisterBody): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Registration failed');
  }
}

export interface OrderRequest {
  customer_id: string;
  location_type?: string | null;
  material_type?: string | null;
  technician_id?: string | null;
}

export async function apiCreateOrder(order: OrderRequest, token: string): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    throw new Error('Order creation failed');
  }
  return res.json();
}
