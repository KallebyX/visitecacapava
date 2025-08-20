import React, { useState } from 'react';
import { QrCode, MapPin, Trophy, Route } from 'lucide-react';
import { backendService } from '../services/backendService';
import type { PointOfInterest } from '../types';
import PointOfInterestModal from '../components/PointOfInterestModal';
import GoogleMapComponent from '../components/GoogleMapComponent';
import QRCodeScanner from '../components/QRCodeScanner';
import { InteractiveRoutes } from '../components/InteractiveRoutes';
import { CheckInResult } from '../utils/qrCodeSystem';
import { ThematicRoute, RouteStep } from '../data/thematicRoutes';

const MapPage: React.FC = () => {
  const [points, setPoints] = useState<PointOfInterest[]>([]);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [activeRoute, setActiveRoute] = useState<ThematicRoute | null>(null);
  const [checkInSuccess, setCheckInSuccess] = useState<CheckInResult | null>(null);
  
  // Mock user ID - em produção viria do contexto de autenticação
  const userId = 'user-123';

  React.useEffect(() => {
    backendService.getPointsOfInterest().then(data => {
      setPoints(data);
      setLoading(false);
    });
  }, []);

  const handleCheckInSuccess = (result: CheckInResult) => {
    setCheckInSuccess(result);
    setShowQRScanner(false);
    
    // Mostrar notificação de sucesso por 5 segundos
    setTimeout(() => {
      setCheckInSuccess(null);
    }, 5000);
  };

  const handleStartRoute = (route: ThematicRoute) => {
    setActiveRoute(route);
    setShowRoutes(false);
    // Focar no primeiro ponto da rota
    if (route.steps.length > 0) {
      const firstStep = route.steps[0];
      setSelectedPoi(firstStep.poi);
    }
  };

  const handleNavigateToStep = (step: RouteStep) => {
    setSelectedPoi(step.poi);
    setShowRoutes(false);
    // Em uma implementação real, abriria navegação GPS
    alert(`Navegando para: ${step.poi.name}`);
  };

  const mapCenter = { lat: -30.5119, lng: -53.4908 }; // Caçapava do Sul center

  return (
    <div className="space-y-6">
      {/* Header com botões */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-display text-brand-dark-green mb-2">Mapa Interativo</h1>
          <p className="text-lg text-gray-600">Explore pontos turísticos e siga rotas gamificadas.</p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowRoutes(true)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Route className="w-5 h-5 mr-2" />
            Rotas Temáticas
          </button>
          
          <button
            onClick={() => setShowQRScanner(true)}
            className="flex items-center px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-brand-dark-green transition-colors shadow-lg"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Escanear QR Code
          </button>
        </div>
      </div>

      {/* Rota ativa */}
      {activeRoute && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-l-4 border-purple-400">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-purple-900">
                {activeRoute.icon} Rota Ativa: {activeRoute.name}
              </h3>
              <p className="text-sm text-purple-700 mt-1">
                Siga os marcadores no mapa para completar esta rota temática
              </p>
            </div>
            <button
              onClick={() => setActiveRoute(null)}
              className="text-purple-600 hover:text-purple-800 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Notificação de sucesso */}
      {checkInSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-700 font-semibold">
                {checkInSuccess.message}
              </p>
              {checkInSuccess.points && (
                <p className="text-sm text-green-600 mt-1">
                  +{checkInSuccess.points} pontos ganhos!
                </p>
              )}
              {checkInSuccess.badge && (
                <p className="text-sm text-blue-600 mt-1">
                  🏆 Nova medalha: {checkInSuccess.badge}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
        
      <div className="relative w-full aspect-[4/3] bg-brand-light-green/20 rounded-2xl shadow-lg overflow-hidden border-4 border-white">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando mapa...</p>
            </div>
          </div>
        ) : (
          <GoogleMapComponent
            center={mapCenter}
            zoom={13}
            pois={points}
            onMarkerClick={setSelectedPoi}
            activeRoute={activeRoute}
          />
        )}
      </div>

      {/* Instruções gamificadas */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🎮 Como Jogar</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h4 className="font-semibold text-sm">Escolha uma Rota</h4>
              <p className="text-sm text-gray-600">Selecione entre rotas históricas, naturais, gastronômicas ou culturais</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h4 className="font-semibold text-sm">Explore o Mapa</h4>
              <p className="text-sm text-gray-600">Siga os marcadores e descubra pontos turísticos</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h4 className="font-semibold text-sm">Visite os Locais</h4>
              <p className="text-sm text-gray-600">Vá até o ponto turístico na vida real</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            <div>
              <h4 className="font-semibold text-sm">Faça Check-in</h4>
              <p className="text-sm text-gray-600">Escaneie o QR Code para ganhar pontos e medalhas</p>
            </div>
          </div>
        </div>
      </div>
        
      {selectedPoi && (
        <PointOfInterestModal 
          poi={selectedPoi}
          onClose={() => setSelectedPoi(null)}
        />
      )}

      {showQRScanner && (
        <QRCodeScanner
          userId={userId}
          onClose={() => setShowQRScanner(false)}
          onCheckInSuccess={handleCheckInSuccess}
        />
      )}

      {/* Modal de Rotas Interativas */}
      {showRoutes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Rotas Interativas</h2>
                <button
                  onClick={() => setShowRoutes(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <InteractiveRoutes
                onStartRoute={handleStartRoute}
                onNavigateToStep={handleNavigateToStep}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;