import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { User, Badge } from '../types';
import { backendService } from '../services/backendService';
import { useAuth } from './AuthContext';

interface GamificationContextType {
  currentUser: User | null;
  checkIn: (pointId: string) => Promise<{ success: boolean, message: string, newBadges: Badge[] }>;
  getVisitedIds: () => Set<string>;
  updateUserProfile: (name: string, avatarUrl: string) => Promise<User | null>;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (authUser?.role === 'tourist') {
        backendService.getUserById(authUser.id).then(user => {
            if (user) setCurrentUser(user);
        })
    }
  }, [authUser]);

  const getVisitedIds = useCallback(() => {
    return new Set(currentUser?.visited.map(v => v.pointId) || []);
  }, [currentUser]);

  const checkIn = useCallback(async (pointId: string) => {
    if (!currentUser) return { success: false, message: 'Usuário não encontrado.', newBadges: [] };
    
    const result = await backendService.checkIn(currentUser.id, pointId);
    if(result.success) {
        const updatedUser = await backendService.getUserById(currentUser.id);
        if(updatedUser) setCurrentUser(updatedUser);
    }
    return result;
  }, [currentUser]);
  
  const updateUserProfile = useCallback(async (name: string, avatarUrl: string) => {
      if (!currentUser) return null;
      const updatedUser = await backendService.updateUser(currentUser.id, { name, avatarUrl });
      if (updatedUser) {
          setCurrentUser(updatedUser);
      }
      return updatedUser;
  }, [currentUser]);

  const contextValue = useMemo(() => ({
    currentUser,
    checkIn,
    getVisitedIds,
    updateUserProfile
  }), [currentUser, checkIn, getVisitedIds, updateUserProfile]);

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
