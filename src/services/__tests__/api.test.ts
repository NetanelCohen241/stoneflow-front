import { vi } from 'vitest'
import { apiLogin, apiRegister, apiCreateOrder, API_BASE_URL } from '../api'

describe('api service', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls login endpoint', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ access_token: 'abc', token_type: 'bearer' }), { status: 200 })
    )
    const res = await apiLogin('user', 'pass')
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, expect.any(Object))
    expect(res.access_token).toBe('abc')
  })

  it('calls register endpoint', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 200 }))
    await apiRegister({ name: 'n', email: 'e', password: 'p' })
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/auth/register`, expect.any(Object))
  })

  it('calls create order endpoint', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
    await apiCreateOrder({ customer_id: '1' }, 'tok')
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/orders`, expect.any(Object))
  })
})
