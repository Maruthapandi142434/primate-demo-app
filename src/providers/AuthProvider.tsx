// src/providers/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  createdAt?: Date;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const { user } = await res.json();
          setUser(user);
        }
      } catch (error) {
        console.error('Failed to load session', error);
      } finally {
        setLoading(false);
      }
    }
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      
      // Force a full page reload to clear any server-side state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}