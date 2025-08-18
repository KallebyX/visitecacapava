
import React from 'react';
import type { Badge } from '../types';
import { Leaf, Mountain, BookOpen, Star, Utensils } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
    Mountain,
    BookOpen,
    Utensils,
    Star,
    Leaf,
};

interface BadgeIconProps {
  badge: Badge;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ badge }) => {
  const Icon = iconMap[badge.icon];
  
  if (!Icon) {
    return null; // Or a fallback icon
  }

  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center transition-transform transform group-hover:scale-110">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <p className="text-sm font-semibold mt-2">{badge.name}</p>
      <div className="absolute bottom-full mb-2 w-48 bg-brand-dark-green text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {badge.description}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-brand-dark-green"></div>
      </div>
    </div>
  );
};

export default BadgeIcon;