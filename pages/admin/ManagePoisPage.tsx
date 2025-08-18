import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { backendService } from '../../services/backendService';
import type { PointOfInterest } from '../../types';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

const ManagePoisPage: React.FC = () => {
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPois = useCallback(() => {
    setLoading(true);
    backendService.getPointsOfInterest().then(data => {
      setPois(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchPois();
  }, [fetchPois]);

  const handleDelete = async (poiId: string, poiName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o ponto turístico "${poiName}"? Isso também o removerá de todas as rotas.`)) {
      await backendService.deletePointOfInterest(poiId);
      fetchPois();
    }
  };

  if (loading) return <p>Carregando pontos turísticos...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-dark-green">Gerenciar Pontos Turísticos</h1>
        <Link
          to="/admin/pois/new"
          className="bg-brand-green text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-brand-dark-green transition-colors"
        >
          <Plus size={20} />
          <span>Criar Novo Ponto</span>
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead>
                <tr className="border-b">
                <th className="p-4">Nome do Ponto</th>
                <th className="p-4">Descrição Curta</th>
                <th className="p-4 text-center">Pontos</th>
                <th className="p-4 text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {pois.map(poi => (
                <tr key={poi.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold flex items-center gap-4">
                        <img src={poi.imageUrl} alt={poi.name} className="w-16 h-12 object-cover rounded-md"/>
                        {poi.name}
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-sm truncate">{poi.description}</td>
                    <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            <Star size={16}/>
                            {poi.points}
                        </div>
                    </td>
                    <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                        <Link to={`/admin/pois/edit/${poi.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                        <Edit size={18} />
                        </Link>
                        <button onClick={() => handleDelete(poi.id, poi.name)} className="p-2 text-brand-red hover:bg-red-100 rounded-full">
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
    </div>
  );
};

export default ManagePoisPage;
