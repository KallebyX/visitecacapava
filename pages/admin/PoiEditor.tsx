import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { backendService } from '../../services/backendService';

const PoiEditor: React.FC = () => {
    const { poiId } = useParams<{ poiId: string }>();
    const navigate = useNavigate();
    const isEditing = !!poiId;

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        longDescription: '',
        imageUrl: '',
        website: '',
        points: 10,
        lat: 0,
        lng: 0,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            backendService.getPointOfInterestById(poiId).then(poi => {
                if (poi) {
                    setFormState({
                        name: poi.name,
                        description: poi.description,
                        longDescription: poi.longDescription,
                        imageUrl: poi.imageUrl,
                        website: poi.website || '',
                        points: poi.points,
                        lat: poi.lat,
                        lng: poi.lng,
                    });
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [poiId, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
        
        // Clear validation errors when user starts typing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const validateForm = (): string[] => {
        const errors: string[] = [];
        
        // Validate website URL if provided
        if (formState.website && !backendService.validateWebsiteUrl(formState.website)) {
            errors.push('URL do website deve ser um endereço válido (http:// ou https://)');
        }
        
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form
        const errors = validateForm();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        
        setSaving(true);
        setValidationErrors([]);
        
        const poiData = {
            ...formState,
            // Ensure numeric types are correctly formatted
            points: Number(formState.points),
            lat: Number(formState.lat),
            lng: Number(formState.lng)
        };

        if (isEditing) {
            await backendService.updatePointOfInterest(poiId, poiData);
        } else {
            await backendService.createPointOfInterest(poiData);
        }
        setSaving(false);
        navigate('/admin/pois');
    };

    if (loading) return <p>Carregando editor...</p>;
    
    const inputStyle = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green";

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-brand-dark-green">
                {isEditing ? 'Editar Ponto Turístico' : 'Criar Novo Ponto Turístico'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                {validationErrors.length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Corrija os seguintes erros:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input type="text" name="name" value={formState.name} onChange={handleChange} required className={inputStyle} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição Curta</label>
                        <input type="text" name="description" value={formState.description} onChange={handleChange} required className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                        <input type="url" name="imageUrl" value={formState.imageUrl} onChange={handleChange} required className={inputStyle} />
                    </div>
                </div>

                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website (opcional)
                        <span className="text-xs text-gray-500 ml-2">Deve começar com http:// ou https://</span>
                    </label>
                    <input 
                        type="url" 
                        name="website" 
                        value={formState.website} 
                        onChange={handleChange} 
                        placeholder="https://exemplo.com"
                        className={inputStyle} 
                    />
                </div>

                <div>
                    <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">Descrição Longa</label>
                    <textarea name="longDescription" value={formState.longDescription} onChange={handleChange} required rows={4} className={inputStyle}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="points" className="block text-sm font-medium text-gray-700">Pontos</label>
                        <input type="number" name="points" value={formState.points} onChange={handleChange} required className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude</label>
                        <input type="number" step="any" name="lat" value={formState.lat} onChange={handleChange} required className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="lng" className="block text-sm font-medium text-gray-700">Longitude</label>
                        <input type="number" step="any" name="lng" value={formState.lng} onChange={handleChange} required className={inputStyle} />
                    </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => navigate('/admin/pois')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" disabled={saving} className="bg-brand-green text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-dark-green transition-colors disabled:bg-gray-400">
                        {saving ? 'Salvando...' : 'Salvar Ponto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PoiEditor;
