import React, { useState } from 'react';
import { FaSync, FaMapMarkerAlt, FaExternalLinkAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { googleMapsService, GooglePlaceDetails } from '../services/googleMapsService';

interface GoogleMapsIntegrationProps {
  onRestaurantsUpdated?: (restaurants: any[]) => void;
}

const GoogleMapsIntegration: React.FC<GoogleMapsIntegrationProps> = ({
  onRestaurantsUpdated
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [foundPlaces, setFoundPlaces] = useState<GooglePlaceDetails[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<Set<string>>(new Set());
  const [syncStatus, setSyncStatus] = useState<string>('');

  // Coordinates for Caçapava do Sul center
  const CACAPAVA_CENTER = {
    lat: -30.5114,
    lng: -53.4914
  };

  const handleSearchNearby = async () => {
    setIsLoading(true);
    setSyncStatus('Buscando restaurantes próximos...');
    
    try {
      const places = await googleMapsService.searchRestaurants(
        CACAPAVA_CENTER.lat,
        CACAPAVA_CENTER.lng,
        10000 // 10km radius
      );
      
      setFoundPlaces(places);
      setSyncStatus(`Encontrados ${places.length} restaurantes no Google Maps`);
    } catch (error) {
      setSyncStatus('Erro ao buscar restaurantes. Verifique a API key do Google Maps.');
      console.error('Error searching restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlaceSelection = (placeId: string) => {
    const newSelected = new Set(selectedPlaces);
    if (newSelected.has(placeId)) {
      newSelected.delete(placeId);
    } else {
      newSelected.add(placeId);
    }
    setSelectedPlaces(newSelected);
  };

  const handleImportSelected = async () => {
    if (selectedPlaces.size === 0) {
      setSyncStatus('Selecione pelo menos um restaurante para importar');
      return;
    }

    setIsLoading(true);
    setSyncStatus('Importando restaurantes selecionados...');
    
    try {
      const importedRestaurants = [];
      
      for (const placeId of selectedPlaces) {
        const place = foundPlaces.find(p => p.place_id === placeId);
        if (place) {
          const details = await googleMapsService.getPlaceDetails(placeId);
          if (details) {
            const restaurant = googleMapsService.convertToRestaurant(
              details, 
              `gm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            );
            importedRestaurants.push(restaurant);
          }
        }
      }
      
      if (onRestaurantsUpdated) {
        onRestaurantsUpdated(importedRestaurants);
      }
      
      setSyncStatus(`${importedRestaurants.length} restaurantes importados com sucesso!`);
      setSelectedPlaces(new Set());
    } catch (error) {
      setSyncStatus('Erro ao importar restaurantes');
      console.error('Error importing restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-brand-dark-green">
          Integração Google Maps
        </h3>
        <button
          onClick={handleSearchNearby}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <FaSync />
          {isLoading ? 'Buscando...' : 'Buscar Restaurantes'}
        </button>
      </div>

      {syncStatus && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-700">{syncStatus}</p>
        </div>
      )}

      {foundPlaces.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-700">
              Restaurantes Encontrados ({foundPlaces.length})
            </h4>
            <button
              onClick={handleImportSelected}
              disabled={isLoading || selectedPlaces.size === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FaCheck />
              Importar Selecionados ({selectedPlaces.size})
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {foundPlaces.map((place) => (
              <div 
                key={place.place_id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedPlaces.has(place.place_id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => togglePlaceSelection(place.place_id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedPlaces.has(place.place_id)}
                        onChange={() => togglePlaceSelection(place.place_id)}
                        className="rounded"
                      />
                      <h5 className="font-semibold text-gray-800">{place.name}</h5>
                      {place.rating && (
                        <span className="text-yellow-500 text-sm">
                          ⭐ {place.rating} ({place.user_ratings_total || 0})
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FaMapMarkerAlt />
                      {place.formatted_address}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {place.types.slice(0, 3).map((type) => (
                        <span 
                          key={type}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          {type.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {place.price_level && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        {'$'.repeat(place.price_level)}
                      </span>
                    )}
                    
                    <a
                      href={`https://maps.google.com/maps/place/?q=place_id:${place.place_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Configuração Necessária</h5>
        <p className="text-yellow-700 text-sm mb-2">
          Para usar esta funcionalidade, você precisa:
        </p>
        <ul className="text-yellow-700 text-sm space-y-1 ml-4">
          <li>• Configurar uma API key do Google Maps Places</li>
          <li>• Habilitar as APIs: Places API, Places Details API</li>
          <li>• Adicionar a key no arquivo de configuração</li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleMapsIntegration;
