import React from 'react';
import { Trophy, Medal, Star, MapPin, Calendar } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  visited: number;
  avatarUrl: string;
  badges: string[];
  lastActivity: string;
  rank: number;
}

interface LeaderboardCardProps {
  user: LeaderboardUser;
  position: number;
}

const RankIcon = ({ position }: { position: number }) => {
  switch (position) {
    case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2: return <Medal className="h-5 w-5 text-gray-400" />;
    case 3: return <Medal className="h-5 w-5 text-amber-600" />;
    default: return <Star className="h-5 w-5 text-gray-400" />;
  }
};

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ user, position }) => {
  const isTopThree = position <= 3;
  
  return (
    <div className={`relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-2 ${
      isTopThree 
        ? position === 1 
          ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50' 
          : position === 2
          ? 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50'
          : 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50'
        : 'border-gray-100'
    }`}>
      {/* Position Badge */}
      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
        position === 1 ? 'bg-yellow-500 text-white' :
        position === 2 ? 'bg-gray-400 text-white' :
        position === 3 ? 'bg-amber-600 text-white' :
        'bg-gray-200 text-gray-600'
      }`}>
        #{position}
      </div>

      <div className="flex items-center gap-3 mb-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          />
          {isTopThree && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
              <RankIcon position={position} />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" />
              <span className="font-medium">{user.points}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-green-500" />
              <span>{user.visited}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {user.badges.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {user.badges.slice(0, 3).map((badge, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-green/10 text-brand-green border border-brand-green/20"
            >
              🏆 {badge}
            </span>
          ))}
          {user.badges.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{user.badges.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Last Activity */}
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Calendar className="h-3 w-3" />
        Ativo {user.lastActivity}
      </div>
    </div>
  );
};

export default LeaderboardCard;
