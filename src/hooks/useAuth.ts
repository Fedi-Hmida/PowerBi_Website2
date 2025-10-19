import { useState, useEffect } from 'react';
import { demoUsers } from '../data/demoUsers';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('demo_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored) as AppUser);
      } catch (e) {
        localStorage.removeItem('demo_user');
      }
    }
    setIsLoading(false);
  }, []);

  const setAuthData = (userData: AppUser) => {
    localStorage.setItem('demo_user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email: string, password: string) => {
    const found = demoUsers.find(u => u.email === email && u.password === password);
    if (!found) {
      throw new Error('Invalid credentials');
    }

    const appUser: AppUser = {
      id: found.id,
      email: found.email,
      name: found.name,
      role: found.role
    };

    setAuthData(appUser);
    return appUser;
  };

  const logout = () => {
    localStorage.removeItem('demo_user');
    setUser(null);
  };

  const getAccessToken = async () => {
    const stored = localStorage.getItem('demo_user');
    return stored ? 'demo-token' : null;
  };

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
    login,
    logout,
    getAccessToken,
    setAuthData
  };
}
