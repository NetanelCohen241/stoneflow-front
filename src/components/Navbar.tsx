import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n, Lang } from '../i18n'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useI18n()

  const toggleMenu = () => setOpen((o) => !o)

  return (
    <nav className="bg-gradient-to-r from-primary to-accent text-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Stoneflow</h1>
        <button
          className="md:hidden text-white"
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
          <Link to="/dashboard" className="text-white/80 hover:text-white">{t('navbar.dashboard')}</Link>
          <Link to="/orders/new" className="text-white/80 hover:text-white">{t('navbar.newOrder')}</Link>
          <Link to="/viewer" className="text-white/80 hover:text-white">{t('navbar.viewer')}</Link>
          <Link to="/settings" className="text-white/80 hover:text-white">{t('navbar.settings')}</Link>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="ml-2 bg-transparent border border-white/50 rounded text-black md:text-white"
            data-testid="lang-select"
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
        <Link to="/dashboard" className="block text-white/80 hover:text-white">{t('navbar.dashboard')}</Link>
        <Link to="/orders/new" className="block text-white/80 hover:text-white">{t('navbar.newOrder')}</Link>
        <Link to="/viewer" className="block text-white/80 hover:text-white">{t('navbar.viewer')}</Link>
        <Link to="/settings" className="block text-white/80 hover:text-white">{t('navbar.settings')}</Link>
      </div>
    </nav>
  )
}
