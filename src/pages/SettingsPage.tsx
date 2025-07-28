import React from 'react'
import { useI18n } from '../i18n/I18nContext'

export default function SettingsPage() {
  const { t } = useI18n()
  return <h2 className="p-6 text-2xl">{t('settings')}</h2>
}
