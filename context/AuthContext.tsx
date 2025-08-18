import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { backendService } from '../services/backendService';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // On component mount, try to load user from sessionStorage
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      setUser(null); // Clear state if storage is corrupt
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await backendService.login(email, password);
      
      if (loggedInUser) {
        sessionStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return { success: true, role: loggedInUser.role };
      }
      return { success: false };
    } catch (error) {
      console.error('AuthContext: Erro durante o login:', error);
      return { success: false };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout
  }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
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
