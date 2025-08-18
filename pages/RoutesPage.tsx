import React, { useState, useEffect } from 'react';
import RouteCard from '../components/RouteCard';
import type { Route } from '../types';
import { backendService } from '../services/backendService';

const RoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backendService.getRoutes().then(data => {
      setRoutes(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center">Carregando rotas...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-display text-center mb-2">Nossas Rotas</h1>
      <p className="text-lg text-center text-gray-600 mb-8">Escolha uma aventura e comece a explorar Caçapava do Sul.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {routes.map(route => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
};

export default RoutesPage;
