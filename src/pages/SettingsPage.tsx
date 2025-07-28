import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../i18n';

/**
 * Settings page component.
 *
 * Provides a minimal account settings interface, displaying the
 * authenticated user’s token (for demo purposes) and offering a logout
 * button to clear authentication state. In a real application this
 * would show user profile information and configurable preferences.
 */
export default function SettingsPage() {
  const { token, logout } = useAuth();
  const { t } = useI18n();

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-4">
      <h2 className="text-2xl font-bold">{t('settings.title')}</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-stone-700 break-all">
          <span className="font-semibold">{t('settings.token')}</span> {token}
        </p>
      </div>
      <button
        type="button"
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        {t('settings.logout')}
      </button>
    </div>
  );
}