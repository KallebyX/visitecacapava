import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { backendService } from '../../services/backendService';
import type { PointOfInterest } from '../../types';

const RouteEditor: React.FC = () => {
    const { routeId } = useParams<{ routeId: string }>();
    const navigate = useNavigate();
    const isEditing = !!routeId;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [selectedPois, setSelectedPois] = useState<Set<string>>(new Set());
    const [allPois, setAllPois] = useState<PointOfInterest[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const pois = await backendService.getPointsOfInterest();
            setAllPois(pois);

            if (isEditing) {
                const route = await backendService.getRouteById(routeId);
                if (route) {
                    setName(route.name);
                    setDescription(route.description);
                    setImageUrl(route.imageUrl || '');
                    setSelectedPois(new Set(route.pointsOfInterest));
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [routeId, isEditing]);

    const handlePoiToggle = (poiId: string) => {
        const newSelection = new Set(selectedPois);
        if (newSelection.has(poiId)) {
            newSelection.delete(poiId);
        } else {
            newSelection.add(poiId);
        }
        setSelectedPois(newSelection);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const routeData = {
            name,
            description,
            imageUrl,
            pointsOfInterest: Array.from(selectedPois),
        };

        if (isEditing) {
            await backendService.updateRoute(routeId, routeData);
        } else {
            await backendService.createRoute(routeData);
        }
        setSaving(false);
        navigate('/admin/routes');
    };

    if (loading) return <p>Carregando editor...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-brand-dark-green">
                {isEditing ? 'Editar Rota' : 'Criar Nova Rota'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome da Rota</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem da Rota</label>
                    <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Deixe em branco para usar a imagem do primeiro ponto" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Pontos Turísticos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-4 border rounded-lg">
                        {allPois.map(poi => (
                            <div key={poi.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`poi-${poi.id}`}
                                    checked={selectedPois.has(poi.id)}
                                    onChange={() => handlePoiToggle(poi.id)}
                                    className="h-4 w-4 text-brand-green border-gray-300 rounded focus:ring-brand-green"
                                />
                                <label htmlFor={`poi-${poi.id}`} className="ml-3 text-sm text-gray-700">{poi.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => navigate('/admin/routes')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" disabled={saving} className="bg-brand-green text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-dark-green transition-colors disabled:bg-gray-400">
                        {saving ? 'Salvando...' : 'Salvar Rota'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RouteEditor;