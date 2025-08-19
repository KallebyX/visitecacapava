import React, { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import GoogleMapsIntegration from '../../components/GoogleMapsIntegration';
import { FaUtensils, FaPlus, FaSync, FaMapMarkerAlt } from 'react-icons/fa';

const ManageRestaurantsIntegrationPage: React.FC = () => {
  const [importedRestaurants, setImportedRestaurants] = useState<any[]>([]);
  const [showIntegration, setShowIntegration] = useState(false);

  const handleRestaurantsUpdated = (restaurants: any[]) => {
    setImportedRestaurants(prev => [...prev, ...restaurants]);
    console.log('Restaurantes importados:', restaurants);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark-green">
              Integração de Restaurantes
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie e importe restaurantes do Google Maps
            </p>
          </div>
          
          <button
            onClick={() => setShowIntegration(!showIntegration)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaMapMarkerAlt />
            {showIntegration ? 'Ocultar' : 'Mostrar'} Integração
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Restaurantes</p>
                <p className="text-3xl font-bold text-brand-dark-green">5</p>
              </div>
              <FaUtensils size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Importados Hoje</p>
                <p className="text-3xl font-bold text-blue-600">{importedRestaurants.length}</p>
              </div>
              <FaPlus size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verificados</p>
                <p className="text-3xl font-bold text-green-600">4</p>
              </div>
              <FaSync size={32} />
            </div>
          </div>
        </div>

        {/* Google Maps Integration */}
        {showIntegration && (
          <GoogleMapsIntegration onRestaurantsUpdated={handleRestaurantsUpdated} />
        )}

        {/* Imported Restaurants Preview */}
        {importedRestaurants.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-brand-dark-green mb-4">
              Restaurantes Importados ({importedRestaurants.length})
            </h3>
            
            <div className="space-y-4">
              {importedRestaurants.map((restaurant, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {restaurant.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {restaurant.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📍 {restaurant.address}</span>
                        <span>⭐ {restaurant.rating}</span>
                        <span>🍽️ {restaurant.cuisine}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Aprovar
                      </button>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-3">
            Como usar a Integração Google Maps
          </h3>
          <ol className="text-blue-700 space-y-2">
            <li>1. Configure sua API key do Google Maps Places</li>
            <li>2. Clique em "Mostrar Integração" para abrir o painel</li>
            <li>3. Use "Buscar Restaurantes" para encontrar estabelecimentos próximos</li>
            <li>4. Selecione os restaurantes que deseja importar</li>
            <li>5. Clique em "Importar Selecionados" para adicionar ao sistema</li>
            <li>6. Revise e aprove os dados importados</li>
          </ol>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageRestaurantsIntegrationPage;
