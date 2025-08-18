import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { backendService } from '../services/backendService';
import { Crown, Medal, Award } from 'lucide-react';
import type { User } from '../types';

const RankIcon: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
  if (rank === 1) return <Medal className="w-6 h-6 text-gray-400" />;
  if (rank === 2) return <Award className="w-6 h-6 text-yellow-600" />;
  return <span className="font-bold text-gray-500 w-6 text-center">{rank + 1}</span>;
};

const LeaderboardPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backendService.getLeaderboard().then(users => {
      setSortedUsers(users);
      setLoading(false);
    });
  }, []);

  if(loading) {
      return <div className="text-center">Carregando ranking...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-display text-center mb-2">Ranking de Exploradores</h1>
      <p className="text-lg text-center text-gray-600 mb-8">Veja quem são os maiores aventureiros de Caçapava do Sul!</p>
      
      <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2">
        {sortedUsers.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center p-4 rounded-xl transition-all ${
              user.id === currentUser?.id
                ? 'bg-brand-light-green/20 border-2 border-brand-light-green'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0 w-10 flex justify-center"><RankIcon rank={index} /></div>
            <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full mx-4 object-cover" />
            <div className="flex-grow">
              <p className="font-bold text-lg">{user.name}</p>
            </div>
            <div className="font-black text-xl text-brand-green">{user.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;