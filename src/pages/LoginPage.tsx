import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../i18n';

/**
 * Login page component.
 *
 * Presents a simple form for users to enter their email and password.
 * Upon successful login the user is redirected to the dashboard. On
 * failure, an error message is displayed. A link is provided for new
 * users to register.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-20 md:pt-0">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login.title')}</h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              {t('login.email')}
            </label>
            <input
              id="email"
              type="email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-700">
              {t('login.password')}
            </label>
            <input
              id="password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? t('login.submitLoading') : t('login.submit')}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {t('login.signupPrompt')} {' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            {t('login.signupLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}