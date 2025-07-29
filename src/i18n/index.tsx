import React, { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'he' | 'en'

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'navbar.dashboard': 'Dashboard',
    'navbar.newOrder': 'New Order',
    'navbar.viewer': 'Viewer',
    'navbar.settings': 'Settings',
    'dashboard.title': 'Orders',
    'dashboard.newOrder': '+ New Order',
    'dashboard.filter': 'Filter:',
    'dashboard.all': 'All',
    'status.new': 'New',
    'status.inProduction': 'In Production',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',
    'dashboard.noOrders': 'No orders yet. Create one to get started.',
    'login.title': 'Log in',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Log in',
    'login.submitLoading': 'Logging in...',
    'login.signupPrompt': "Don\u2019t have an account?",
    'login.signupLink': 'Sign up',
    'signup.title': 'Sign up',
    'signup.name': 'Name',
    'signup.email': 'Email',
    'signup.password': 'Password',
    'signup.confirmPassword': 'Confirm Password',
    'signup.submit': 'Sign up',
    'signup.submitLoading': 'Signing up...',
    'signup.loginPrompt': 'Already have an account?',
    'signup.loginLink': 'Log in',
    'signup.passwordMismatch': 'Passwords do not match',
    'newOrder.title': 'New Order',
    'newOrder.customerName': 'Customer Name',
    'newOrder.phone': 'Phone',
    'newOrder.address': 'Address',
    'newOrder.surfaceType': 'Surface Type',
    'newOrder.material': 'Material',
    'surface.kitchen': 'Kitchen',
    'surface.bathroom': 'Bathroom',
    'surface.bar': 'Bar',
    'surface.other': 'Other',
    'material.quartz': 'Quartz',
    'material.granite': 'Granite',
    'material.marble': 'Marble',
    'material.concrete': 'Concrete',
    'newOrder.addSlabPiece': 'Add Slab Piece',
    'newOrder.width': 'Width (cm)',
    'newOrder.x': 'X (cm)',
    'newOrder.y': 'Y (cm)',
    'newOrder.height': 'Height (cm)',
    'newOrder.cutouts': 'Cutouts',
    'newOrder.addCutout': '+ Add Cutout',
    'newOrder.noCutouts': 'No cutouts defined.',
    'newOrder.remove': 'Remove',
    'newOrder.uploadPhoto': 'Upload Photo',
    'newOrder.kitchenSection': 'Kitchen Photo & Measurements',
    'newOrder.capturePhoto': 'Take or Upload Photo',
    'newOrder.surfaces': 'Surfaces',
    'newOrder.objects': 'Objects',
    'newOrder.addSurface': '+ Add Surface',
    'newOrder.addObject': '+ Add Object',
    'newOrder.description': 'Description',
    'newOrder.addPiece': '+ Add Piece',
    'newOrder.pieces': 'Pieces',
    'newOrder.create': 'Create Order',
    'newOrder.completeAlert': 'Please complete all order details and add at least one piece.',
    'orderDetails.title': 'Order Details',
    'orderDetails.back': 'Back to Dashboard',
    'orderDetails.customer': 'Customer:',
    'orderDetails.phone': 'Phone:',
    'orderDetails.address': 'Address:',
    'orderDetails.surfaceType': 'Surface Type:',
    'orderDetails.material': 'Material:',
    'orderDetails.status': 'Status:',
    'orderDetails.pieces': 'Pieces',
    'orderDetails.view3d': '3D View',
    'orderDetails.dimensions': 'Dimensions: {width} × {height} cm',
    'orderDetails.cutouts': 'Cutouts: {count}',
    'slabViewer.notFound': 'Slab not found.',
    'slabViewer.back': '\u2190 Back to Order',
    'slabViewer.title': '3D Slab Viewer',
    'slabViewer.material': 'Material',
    'slabViewer.downloadPdf': 'Download PDF',
    'settings.title': 'Settings',
    'settings.token': 'Your token:',
    'settings.logout': 'Log out'
  },
  he: {
    'navbar.dashboard': '\u05dc\u05d5\u05d7 \u05d1\u05e7\u05e8\u05d4',
    'navbar.newOrder': '\u05d4\u05d6\u05de\u05e0\u05d4 \u05d7\u05d3\u05e9\u05d4',
    'navbar.viewer': '\u05de\u05e6\u05d9\u05d2',
    'navbar.settings': '\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea',
    'dashboard.title': '\u05d4\u05d6\u05de\u05e0\u05d5\u05ea',
    'dashboard.newOrder': '+ \u05d4\u05d6\u05de\u05e0\u05d4 \u05d7\u05d3\u05e9\u05d4',
    'dashboard.filter': '\u05e1\u05d9\u05e0\u05d5\u05df:',
    'dashboard.all': '\u05d4\u05db\u05dc',
    'status.new': '\u05d7\u05d3\u05e9',
    'status.inProduction': '\u05d1\u05d9\u05e6\u05d5\u05e8',
    'status.completed': '\u05d4\u05d5\u05e9\u05dc\u05dd',
    'status.cancelled': '\u05d1\u05d5\u05d8\u05dc',
    'dashboard.noOrders': '\u05d0\u05d9\u05df \u05d4\u05d6\u05de\u05e0\u05d5\u05ea. \u05e6\u05d5\u05e8 \u05d4\u05d6\u05de\u05e0\u05d4 \u05db\u05d3\u05d9 להתחיל.',
    'login.title': '\u05d4\u05ea\u05d7\u05d1\u05e8',
    'login.email': '\u05d0\u05d9\u05de\u05d9\u05d9\u05dc',
    'login.password': '\u05e1\u05d9\u05e1\u05de\u05d4',
    'login.submit': '\u05d4\u05ea\u05d7\u05d1\u05e8',
    'login.submitLoading': '\u05d4\u05ea\u05d7\u05d1\u05e8...',
    'login.signupPrompt': '\u05d0\u05d9\u05df \u05dc\u05da \u05d7\u05e9\u05d1\u05d5\u05df?',
    'login.signupLink': '\u05d4\u05e8\u05e9\u05dd',
    'signup.title': '\u05d4\u05e8\u05e9\u05dd',
    'signup.name': '\u05e9\u05dd',
    'signup.email': '\u05d0\u05d9\u05de\u05d9\u05d9\u05dc',
    'signup.password': '\u05e1\u05d9\u05e1\u05de\u05d4',
    'signup.confirmPassword': '\u05d0\u05d9\u05e9\u05d5\u05e8 \u05e1\u05d9\u05e1\u05de\u05d4',
    'signup.submit': '\u05d4\u05e8\u05e9\u05dd',
    'signup.submitLoading': '\u05e0\u05e8\u05e9\u05dd...',
    'signup.loginPrompt': '\u05db\u05d1\u05e8 \u05d7\u05e9\u05d1\u05d5\u05df?',
    'signup.loginLink': '\u05d4\u05ea\u05d7\u05d1\u05e8',
    'signup.passwordMismatch': '\u05e1\u05d9\u05e1\u05de\u05d5\u05ea \u05d0\u05d9\u05e0\u05df \u05d7\u05d5\u05e4\u05e4\u05d5\u05ea',
    'newOrder.title': '\u05d4\u05d6\u05de\u05e0\u05d4 \u05d7\u05d3\u05e9\u05d4',
    'newOrder.customerName': '\u05e9\u05dd \u05dc\u05e7\u05d5\u05d7',
    'newOrder.phone': '\u05d8\u05dc\u05e4\u05d5\u05df',
    'newOrder.address': '\u05db\u05ea\u05d5\u05d1\u05ea',
    'newOrder.surfaceType': '\u05e1\u05d5\u05d2 \u05e9\u05d7\u05d5\u05ea',
    'newOrder.material': '\u05d7\u05d5\u05de\u05e8',
    'surface.kitchen': '\u05de\u05d8\u05d1\u05d7',
    'surface.bathroom': '\u05d7\u05d3\u05e8 \u05d0\u05de\u05d1\u05d8\u05d9\u05d4',
    'surface.bar': '\u05d1\u05e8',
    'surface.other': '\u05d0\u05d7\u05e8',
    'material.quartz': '\u05e7\u05d5\u05f2\u05e8\u05e5',
    'material.granite': '\u05d2\u05e8\u05e0\u05d9\u05d8',
    'material.marble': '\u05e9\u05d9\u05e9',
    'material.concrete': '\u05d1\u05d8\u05d5\u05df',
    'newOrder.addSlabPiece': '\u05d4\u05d5\u05e1\u05e3 \u05e7\u05d8\u05e2 \u05dc\u05d5\u05d7\u05d4',
    'newOrder.width': '\u05e8\u05d5\u05d7\u05d1 (cm)',
    'newOrder.x': 'X (cm)',
    'newOrder.y': 'Y (cm)',
    'newOrder.height': '\u05d2\u05d5\u05d1\u05d4 (cm)',
    'newOrder.cutouts': '\u05e7\u05d9\u05e2\u05d5\u05ea',
    'newOrder.addCutout': '+ \u05d4\u05d5\u05e1\u05e3 \u05e7\u05d9\u05e2\u05d4',
    'newOrder.noCutouts': '\u05d0\u05d9\u05df \u05e7\u05d9\u05e2\u05d5\u05ea.',
    'newOrder.remove': '\u05d4\u05e1\u05e8',
    'newOrder.uploadPhoto': '\u05d4\u05e2\u05dc\u05d4 \u05ea\u05de\u05d5\u05e0\u05d4',
    'newOrder.kitchenSection': '\u05ea\u05de\u05d5\u05e0\u05ea \u05d4\u05de\u05d8\u05d1\u05d7 \u05d5\u05de\u05d3\u05d9\u05d3\u05d5\u05ea',
    'newOrder.capturePhoto': '\u05e6\u05dc\u05dd \u05d0\u05d5 \u05d4\u05e2\u05dc\u05d4 \u05ea\u05de\u05d5\u05e0\u05d4',
    'newOrder.surfaces': '\u05de\u05e9\u05d8\u05d7\u05d9\u05dd',
    'newOrder.objects': '\u05d0\u05d5\u05d1\u05d9\u05d9\u05e7\u05d8\u05d9\u05dd',
    'newOrder.addSurface': '+ \u05d4\u05d5\u05e1\u05e3 \u05de\u05e9\u05d8\u05d7',
    'newOrder.addObject': '+ \u05d4\u05d5\u05e1\u05e3 \u05d0\u05d5\u05d1\u05d9\u05d9\u05e7\u05d8',
    'newOrder.description': '\u05ea\u05d9\u05d0\u05d5\u05e8',
    'newOrder.addPiece': '+ \u05d4\u05d5\u05e1\u05e3 \u05e7\u05d8\u05e2',
    'newOrder.pieces': '\u05e7\u05d8\u05e2\u05d9\u05dd',
    'newOrder.create': '\u05e6\u05d5\u05e8 \u05d4\u05d6\u05de\u05e0\u05d4',
    'newOrder.completeAlert': '\u05d4\u05e9\u05dc\u05dd \u05d0\u05ea \u05db\u05dc \u05e4\u05e8\u05d8\u05d9 \u05d4\u05d4זמנה \u05d5הוסף \u05dcפחות \u05e7\u05d8\u05e2 אחד.',
    'orderDetails.title': '\u05e4\u05e8\u05d8\u05d9 \u05d4זמנ\u05d4',
    'orderDetails.back': '\u05d7\u05d6\u05e8 \u05dc\u05dcוח \u05d1\u05e7\u05e8\u05d4',
    'orderDetails.customer': '\u05dc\u05e7וח:',
    'orderDetails.phone': '\u05d8\u05dcפון:',
    'orderDetails.address': '\u05dbתובת:',
    'orderDetails.surfaceType': '\u05e1וג \u05e9חות:',
    'orderDetails.material': '\u05d7ומר:',
    'orderDetails.status': '\u05d1מע:',
    'orderDetails.pieces': '\u05e7\u05d8\u05e2\u05d9\u05dd',
    'orderDetails.view3d': '3D \u05e6\u05e4\u05d9\u05d4',
    'orderDetails.dimensions': '\u05de\u05de\u05d3\u05d9\u05dd: {width} \u00d7 {height} cm',
    'orderDetails.cutouts': '\u05e7\u05d9\u05e2\u05d5\u05ea: {count}',
    'slabViewer.notFound': '\u05dcוח \u05dc\u05d0 \u05e0\u05deצא.',
    'slabViewer.back': '\u2190 \u05d7\u05d6\u05e8 \u05dc\u05d4זמנה',
    'slabViewer.title': '3D \u05deציג \u05dcוח',
    'slabViewer.material': '\u05d7ומר',
    'slabViewer.downloadPdf': '\u05d4ורד PDF',
    'settings.title': '\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea',
    'settings.token': '\u05d4\u05d8\u05d5\u05e7\u05df \u05e9\u05dcך:',
    'settings.logout': '\u05d4\u05ea\u05e0\u05ea\u05e7'
  }
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function I18nProvider({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang || 'he')

  useEffect(() => {
    if (!initialLang) {
      const stored = localStorage.getItem('lang') as Lang | null
      if (stored === 'en' || stored === 'he') {
        setLangState(stored)
      }
    }
  }, [initialLang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  const t = (key: string, params?: Record<string, string | number>) => {
    const str = translations[lang][key] || translations.he[key] || translations.en[key] || key
    if (!params) return str
    return str.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ''))
  }

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}
