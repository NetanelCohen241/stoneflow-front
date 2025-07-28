import React, { createContext, useContext, useState } from 'react'

export type Lang = 'he' | 'en'

const messages = {
  he: {
    brand: 'סטוןפלו',
    dashboard: 'לוח בקרה',
    newOrder: 'הזמנה חדשה',
    viewer: 'צופה',
    settings: 'הגדרות',
    login: 'התחברות',
    signUp: 'הרשמה',
    welcome: 'ברוכים הבאים',
    language: 'שפה',
  },
  en: {
    brand: 'Stoneflow',
    dashboard: 'Dashboard',
    newOrder: 'New Order',
    viewer: 'Viewer',
    settings: 'Settings',
    login: 'Login',
    signUp: 'Sign Up',
    welcome: 'Welcome',
    language: 'Language',
  },
} as const

type MessageKey = keyof typeof messages.en

interface I18nContextValue {
  lang: Lang
  t: (key: MessageKey) => string
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'he',
  t: (k: MessageKey) => messages.he[k],
  setLang: () => {},
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('he')
  const t = (key: MessageKey) => messages[lang][key]
  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
