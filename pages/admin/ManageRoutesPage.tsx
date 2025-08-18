import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { backendService } from '../../services/backendService';
import type { Route } from '../../types';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

const ManageRoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = useCallback(() => {
    setLoading(true);
    backendService.getRoutes().then(data => {
      setRoutes(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const handleDelete = async (routeId: string, routeName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a rota "${routeName}"?`)) {
      await backendService.deleteRoute(routeId);
      fetchRoutes();
    }
  };

  if (loading) return <p>Carregando rotas...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-dark-green">Gerenciar Rotas</h1>
        <Link
          to="/admin/routes/new"
          className="bg-brand-green text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-brand-dark-green transition-colors"
        >
          <Plus size={20} />
          <span>Criar Nova Rota</span>
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Nome da Rota</th>
              <th className="p-4">Descrição</th>
              <th className="p-4 text-center">Paradas</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(route => (
              <tr key={route.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">{route.name}</td>
                <td className="p-4 text-sm text-gray-600">{route.description}</td>
                <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                        <MapPin size={16} className="text-gray-600"/>
                        {route.pointsOfInterest.length}
                    </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link to={`/admin/routes/edit/${route.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(route.id, route.name)} className="p-2 text-brand-red hover:bg-red-100 rounded-full">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoutesPage;
