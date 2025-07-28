import { Link } from 'react-router-dom'
import { useI18n, Lang } from '../i18n/I18nContext'

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">{t('brand')}</h1>
      <div className="space-x-4 items-center flex">
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
    </nav>
  )
}
