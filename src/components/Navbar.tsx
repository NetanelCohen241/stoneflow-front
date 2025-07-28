import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n, Lang } from '../i18n/I18nContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => setOpen((o) => !o)
  const { t, lang, setLang } = useI18n()

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">{t('brand')}</h1>
        <button
          className="md:hidden text-gray-700"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
            {t('dashboard')}
          </Link>
          <Link to="/orders/new" className="text-gray-700 hover:text-blue-600">
            {t('newOrder')}
          </Link>
          <Link to="/viewer" className="text-gray-700 hover:text-blue-600">
            {t('viewer')}
          </Link>
          <Link to="/settings" className="text-gray-700 hover:text-blue-600">
            {t('settings')}
          </Link>
          <select
            className="ml-4 border border-gray-300 rounded"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
          >
            <option value="he">עברית</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <div
        className={`mt-2 space-y-2 md:hidden ${open ? 'block' : 'hidden'}`}
        data-testid="mobile-menu"
      >
        <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">
          {t('dashboard')}
        </Link>
        <Link to="/orders/new" className="block text-gray-700 hover:text-blue-600">
          {t('newOrder')}
        </Link>
        <Link to="/viewer" className="block text-gray-700 hover:text-blue-600">
          {t('viewer')}
        </Link>
        <Link to="/settings" className="block text-gray-700 hover:text-blue-600">
          {t('settings')}
        </Link>
        <select
          className="mt-2 border border-gray-300 rounded"
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
        >
          <option value="he">עברית</option>
          <option value="en">English</option>
        </select>
      </div>
    </nav>
  )
}
