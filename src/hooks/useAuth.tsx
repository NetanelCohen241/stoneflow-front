import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create a React context to hold authentication state.
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider component wraps the application and provides authentication
 * state and actions via context. The token is stored in localStorage to
 * persist across page reloads.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      setToken(stored);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, send a request to the API to authenticate.
    // Here we simulate successful login for any non‑empty credentials.
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    const fakeToken = btoa(`${email}:${password}`);
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate registration. In a real app this would call the backend.
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    // After registration, log the user in directly.
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const value: AuthContextValue = {
    isAuthenticated: !!token,
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to access the AuthContext. Throws an error if used outside
 * of the AuthProvider.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}