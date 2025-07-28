import React from 'react'
import { useI18n } from '../i18n/I18nContext'

export default function DashboardPage() {
  const { t } = useI18n()
  return <h2 className="p-6 text-2xl">{t('dashboard')}</h2>
}
