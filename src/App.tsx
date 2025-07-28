import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import NewOrderPage from './pages/NewOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import SlabViewerPage from './pages/SlabViewerPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from './hooks/useAuth';

/**
 * Top‑level application component.
 *
 * Defines the routing structure for the app using React Router v6.
 * Routes that require authentication are guarded by checking the
 * authentication state provided by the `useAuth` hook. Unauthenticated
 * users will be redirected to the login page.
 */
export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Render the navigation bar on all pages except auth screens */}
      {isAuthenticated && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* Protected routes */}
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/viewer/:orderId/:pieceId" element={<SlabViewerPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </>
          )}
          {/* Catch‑all: redirect unknown routes to dashboard or login */}
          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} />} />
        </Routes>
      </div>
    </div>
  );
}