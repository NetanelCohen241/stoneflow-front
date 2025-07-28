import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Stoneflow</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/orders/new" className="text-gray-700 hover:text-blue-600">New Order</Link>
        <Link to="/viewer" className="text-gray-700 hover:text-blue-600">Viewer</Link>
        <Link to="/settings" className="text-gray-700 hover:text-blue-600">Settings</Link>
      </div>
    </nav>
  )
}
