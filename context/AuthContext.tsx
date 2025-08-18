import React, { createContext, useContext, useState, useMemo } from 'react';
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
  // In a real app, you'd initialize this from localStorage or a cookie
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const loggedInUser = await backendService.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      return { success: true, role: loggedInUser.role };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    // In a real app, you'd clear the session from localStorage/cookies
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
