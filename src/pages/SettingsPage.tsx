import React from 'react';
import { useAuth } from '../hooks/useAuth';

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

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
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
  );
}