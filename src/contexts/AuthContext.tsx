import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { demoUsers } from '../data/demoUsers';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
}

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AppUser>;
  logout: () => void;
  setAuthData: (userData: AppUser) => void;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
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
      throw new Error('Email ou mot de passe incorrect');
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setAuthData,
        getAccessToken,
      }}
    >
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
