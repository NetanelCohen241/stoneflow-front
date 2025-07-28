import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { AuthProvider, useAuth } from '../useAuth'
import * as api from '../../services/api'

const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

describe('useAuth', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('logs in through api', async () => {
    vi.spyOn(api, 'apiLogin').mockResolvedValue({ access_token: 't', token_type: 'bearer' })
    const { result } = renderHook(() => useAuth(), { wrapper })
    await act(async () => {
      await result.current.login('e', 'p')
    })
    expect(localStorage.getItem('token')).toBe('t')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('registers through api', async () => {
    vi.spyOn(api, 'apiRegister').mockResolvedValue()
    vi.spyOn(api, 'apiLogin').mockResolvedValue({ access_token: 't', token_type: 'bearer' })
    const { result } = renderHook(() => useAuth(), { wrapper })
    await act(async () => {
      await result.current.register('n', 'e', 'p')
    })
    expect(api.apiRegister).toHaveBeenCalled()
    expect(result.current.isAuthenticated).toBe(true)
  })
})
