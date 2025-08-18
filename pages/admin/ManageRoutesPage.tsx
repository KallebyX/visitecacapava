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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Gerenciar Rotas</h1>
        <Link
          to="/admin/routes/new"
          className="bg-brand-green text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-brand-dark-green transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Nova Rota</span>
        </Link>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Nome da Rota</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Descrição</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">Paradas</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(route => (
              <tr key={route.id} className="border-b border-slate-200/80 hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{route.name}</td>
                <td className="p-4 text-sm text-slate-600 max-w-sm">{route.description}</td>
                <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-700">
                        <MapPin size={16}/>
                        {route.pointsOfInterest.length}
                    </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Link to={`/admin/routes/edit/${route.id}`} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(route.id, route.name)} className="p-2 text-slate-500 hover:text-brand-red hover:bg-red-100 rounded-full transition-colors">
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