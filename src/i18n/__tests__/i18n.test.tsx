import { renderHook, act } from '@testing-library/react'
import { I18nProvider, useI18n } from '../index'

it('provides translations and updates document direction', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nProvider initialLang="en">{children}</I18nProvider>
  )
  const { result } = renderHook(() => useI18n(), { wrapper })
  expect(document.documentElement.dir).toBe('ltr')
  expect(result.current.t('login.title')).toBe('Log in')
  act(() => {
    result.current.setLang('he')
  })
  expect(document.documentElement.dir).toBe('rtl')
  expect(result.current.t('login.title')).toBe('\u05d4\u05ea\u05d7\u05d1\u05e8')
})
