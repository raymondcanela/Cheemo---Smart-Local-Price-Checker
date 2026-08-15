/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { login as loginApi, signup as signupApi } from '../features/auth/api/authApi';
import type { LoginPayload, SignupPayload, User } from '../features/auth/types/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'cheemo_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  function getStoredSession(): { token: string; user: User } | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as { token: string; user: User };
    } catch {
      return null;
    }
  }

  const [session, setSession] = useState<{ token: string; user: User } | null>(() => getStoredSession());
  const user = session?.user ?? null;
  const token = session?.token ?? null;

  const persistSession = (accessToken: string, loggedInUser: User) => {
    setSession({ token: accessToken, user: loggedInUser });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: accessToken, user: loggedInUser }));
  };

  const login = async (payload: LoginPayload) => {
    const res = await loginApi(payload);
    persistSession(res.access_token, res.user);
  };

  const signup = async (payload: SignupPayload) => {
    const res = await signupApi(payload);
    persistSession(res.access_token, res.user);
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};