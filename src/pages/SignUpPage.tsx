import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../i18n';

/**
 * Sign up page component.
 *
 * Allows a new user to create an account by entering their name,
 * email and password. After successful registration the user is
 * automatically logged in and redirected to the dashboard. Validation
 * errors and mismatched passwords are surfaced to the user.
 */
export default function SignUpPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError(t('signup.passwordMismatch'));
      return;
    }
    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
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
        <h2 className="text-2xl font-bold mb-6 text-center">{t('signup.title')}</h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
              {t('signup.name')}
            </label>
            <input
              id="name"
              type="text"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              {t('signup.email')}
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
              {t('signup.password')}
            </label>
            <input
              id="password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-stone-700">
              {t('signup.confirmPassword')}
            </label>
            <input
              id="confirm"
              type="password"
              className="w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? t('signup.submitLoading') : t('signup.submit')}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
          {t('signup.loginPrompt')} {' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            {t('signup.loginLink')}
          </Link>
      </p>
      </div>
    </div>
  );
}