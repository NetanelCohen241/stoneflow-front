import { describe, it, expect, vi, beforeEach } from 'vitest'
import { login, signUp, createOrder, API_BASE_URL } from './client'

// helper to mock fetch
beforeEach(() => {
  vi.restoreAllMocks()
})

describe('api client', () => {
  it('calls login endpoint with form data', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => ({ token: 'x' }) })
    vi.stubGlobal('fetch', fetchMock)
    await login('user', 'pass')
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, expect.objectContaining({
      method: 'POST',
    }))
    const call = fetchMock.mock.calls[0][1]!
    expect(call.body).toContain('username=user')
    expect(call.body).toContain('password=pass')
  })

  it('calls sign up endpoint with json body', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => ({}) })
    vi.stubGlobal('fetch', fetchMock)
    await signUp({ name: 'n', email: 'e', password: 'p', role: 'r', tenant_id: 't' })
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/auth/register`, expect.objectContaining({
      method: 'POST',
    }))
    expect(fetchMock.mock.calls[0][1]!.body).toBe(JSON.stringify({ name: 'n', email: 'e', password: 'p', role: 'r', tenant_id: 't' }))
  })

  it('calls create order endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => ({}) })
    vi.stubGlobal('fetch', fetchMock)
    await createOrder({ customer_id: 'c' })
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/orders`, expect.objectContaining({
      method: 'POST',
    }))
  })

  it('throws on login failure', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false })
    vi.stubGlobal('fetch', fetchMock)
    await expect(login('u', 'p')).rejects.toThrow('Login failed')
  })
})
