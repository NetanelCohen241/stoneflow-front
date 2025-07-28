import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useI18n } from '../i18n/I18nContext'

export default function SettingsPage() {
  const { token, logout } = useAuth()
  const { t } = useI18n()

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-4">
      <h2 className="text-2xl font-bold">{t('settings')}</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-stone-700 break-all">
          <span className="font-semibold">Your token:</span> {token}
        </p>
      </div>
      <button
        type="button"
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Log out
      </button>
    </div>
  )
}
