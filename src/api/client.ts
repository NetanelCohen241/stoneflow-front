export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export interface LoginResponse {
  access_token: string
  token_type: string
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  params.append('grant_type', 'password')
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  if (!response.ok) {
    throw new Error('Login failed')
  }
  return response.json()
}

export interface SignUpData {
  name: string
  email: string
  password: string
  role: string
  tenant_id: string
}

export async function signUp(data: SignUpData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Sign up failed')
  }
  return response.json()
}

export interface OrderCreateData {
  customer_id: string
  location_type?: string | null
  material_type?: string | null
  technician_id?: string | null
}

export async function createOrder(data: OrderCreateData) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Create order failed')
  }
  return response.json()
}
