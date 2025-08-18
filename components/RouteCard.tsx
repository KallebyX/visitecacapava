import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Route, PointOfInterest } from '../types';
import { backendService } from '../services/backendService';
import { MapPin } from 'lucide-react';

interface RouteCardProps {
  route: Route;
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const [points, setPoints] = useState<PointOfInterest[]>([]);
  
  useEffect(() => {
    Promise.all(
      route.pointsOfInterest.map(id => backendService.getPointOfInterestById(id))
    ).then(pois => setPoints(pois.filter((p): p is PointOfInterest => !!p)));
  }, [route]);
  
  const totalPoints = points.reduce((acc, p) => acc + (p?.points || 0), 0);

  return (
    <Link to={`/routes/${route.id}`} className="block bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative">
        <img src={route.imageUrl || points[0]?.imageUrl || 'https://picsum.photos/800/600'} alt={route.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white text-2xl font-bold">{route.name}</h3>
        </div>
        <div className="absolute top-4 right-4 bg-brand-light-green text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <MapPin size={14} />
          <span>{points.length} paradas</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-4">{route.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-brand-green">{totalPoints} Pontos Totais</span>
          <span className="font-bold text-brand-dark-green group-hover:text-brand-light-green transition-colors">
            Ver Rota &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RouteCard;