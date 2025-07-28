import { renderHook, act } from '@testing-library/react'
import { I18nProvider, useI18n } from '../index'

it('provides translations and allows switching languages', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nProvider initialLang="en">{children}</I18nProvider>
  )
  const { result } = renderHook(() => useI18n(), { wrapper })
  expect(result.current.t('login.title')).toBe('Log in')
  act(() => {
    result.current.setLang('he')
  })
  expect(result.current.t('login.title')).toBe('\u05d4\u05ea\u05d7\u05d1\u05e8')
})
