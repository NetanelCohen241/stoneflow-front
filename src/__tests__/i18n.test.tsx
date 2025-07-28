import { renderHook, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nProvider, useI18n } from '../i18n/I18nContext'

it('provides hebrew by default and switches language', () => {
  const { result } = renderHook(() => useI18n(), { wrapper: I18nProvider })
  expect(result.current.t('dashboard')).toBe('לוח בקרה')
  act(() => result.current.setLang('en'))
  expect(result.current.t('dashboard')).toBe('Dashboard')
})
