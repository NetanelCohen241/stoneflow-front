import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import NewOrderPage from './pages/NewOrderPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import SlabViewerPage from './pages/SlabViewerPage'
import SettingsPage from './pages/SettingsPage'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders/new" element={<NewOrderPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/viewer" element={<SlabViewerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}
