import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { 
  Navigation, Target, Play, CheckCircle, Star, Trophy, 
  Zap, Clock, MapPin, Route as RouteIcon
} from 'lucide-react';

// Fix para ícones do Leaflet
import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
import { MAP_CONFIG, calculateDistance, withinDiscoveryRadius } from '../utils/geolocation';
import { RoutePoint, GameRoute, checkNearbyPOIs, generateRoutePolyline } from '../utils/gameRoutes';
import { canCheckin, generateSecureQR, formatCooldown } from '../utils/checkinSystem';

interface GameMapProps {
  currentRoute?: GameRoute;
  userLocation?: { lat: number; lng: number };
  onPOIDiscover: (poiId: string) => void;
  onCheckin: (poiId: string, type: 'proximity' | 'qr') => void;
  isPlaying: boolean;
}

const GameMap: React.FC<GameMapProps> = ({
  currentRoute,
  userLocation,
  onPOIDiscover,
  onCheckin,
  isPlaying
}) => {
  const [discoveredPOIs, setDiscoveredPOIs] = useState<string[]>([]);
  const [showQRCode, setShowQRCode] = useState<string | null>(null);
  const [nearbyPOIs, setNearbyPOIs] = useState<RoutePoint[]>([]);
  const [userMarker, setUserMarker] = useState<L.Marker | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Ícones customizados
  const createCustomIcon = (type: 'user' | 'poi' | 'discovered' | 'nearby', category?: string) => {
    const iconConfigs = {
      user: { color: '#3B82F6', size: 20, icon: '📍' },
      poi: { color: '#6B7280', size: 16, icon: getPoiIcon(category) },
      discovered: { color: '#10B981', size: 18, icon: '✅' },
      nearby: { color: '#F59E0B', size: 20, icon: '🎯' }
    };

    const config = iconConfigs[type];
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${config.color};
          width: ${config.size}px;
          height: ${config.size}px;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${config.size * 0.6}px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">
          ${config.icon}
        </div>
      `,
      iconSize: [config.size, config.size],
      iconAnchor: [config.size / 2, config.size / 2]
    });
  };

  const getPoiIcon = (category?: string): string => {
    const icons: { [key: string]: string } = {
      'historia': '🏛️',
      'natureza': '🌿',
      'gastronomia': '🍽️',
      'familia': '👨‍👩‍👧‍👦'
    };
    return icons[category || 'default'] || '📍';
  };

  // Componente para eventos do mapa
  const MapEvents = () => {
    useMapEvents({
      locationfound: (e) => {
        if (userLocation && isPlaying) {
          // Verificar POIs próximos quando localização atualizar
          if (currentRoute) {
            const nearby = checkNearbyPOIs(userLocation, currentRoute);
            setNearbyPOIs(nearby);
            
            // Notificar descobertas
            nearby.forEach(poi => {
              if (!discoveredPOIs.includes(poi.id)) {
                onPOIDiscover(poi.id);
                setDiscoveredPOIs(prev => [...prev, poi.id]);
              }
            });
          }
        }
      }
    });
    return null;
  };

  // Iniciar rastreamento de localização
  useEffect(() => {
    if (isPlaying && navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Atualizar marker do usuário
          if (mapRef.current && userMarker) {
            userMarker.setLatLng([newLocation.lat, newLocation.lng]);
          }
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000
        }
      );
      setWatchId(id);
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isPlaying]);

  // Componente de POI com interações
  const POIMarker: React.FC<{ poi: RoutePoint }> = ({ poi }) => {
    const isDiscovered = discoveredPOIs.includes(poi.id);
    const isNearby = nearbyPOIs.some(p => p.id === poi.id);
    const distance = userLocation ? calculateDistance(userLocation, poi.coordinates) : null;

    const handleDiscover = () => {
      if (isNearby && !isDiscovered) {
        onPOIDiscover(poi.id);
        setDiscoveredPOIs(prev => [...prev, poi.id]);
      }
    };

    const handleCheckin = (type: 'proximity' | 'qr') => {
      const checkinResult = canCheckin('user_id', poi.id); // Em produção, usar ID real do usuário
      
      if (checkinResult.canCheckin) {
        onCheckin(poi.id, type);
      } else {
        alert(checkinResult.reason);
      }
    };

    const showQR = () => {
      const qrCode = generateSecureQR(poi.id);
      setShowQRCode(qrCode);
    };

    const iconType = isDiscovered ? 'discovered' : isNearby ? 'nearby' : 'poi';

    return (
      <Marker
        position={[poi.coordinates.lat, poi.coordinates.lng]}
        icon={createCustomIcon(iconType, poi.category)}
      >
        <Popup>
          <div className="space-y-3 min-w-64">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">{getPoiIcon(poi.category)}</div>
              <div>
                <h3 className="font-bold text-lg">{poi.name}</h3>
                <p className="text-sm text-gray-600">{poi.category}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700">{poi.description}</p>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span className="flex items-center"><Clock size={12} className="mr-1" />{poi.estimatedTime}min</span>
              <span className="flex items-center"><Star size={12} className="mr-1" />{poi.xpReward} XP</span>
              {distance && <span className="flex items-center"><MapPin size={12} className="mr-1" />{distance.toFixed(0)}m</span>}
            </div>
            
            {isNearby && !isDiscovered && (
              <button
                onClick={handleDiscover}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <Target size={16} />
                <span>Descobrir ({distance?.toFixed(0)}m)</span>
              </button>
            )}
            
            {isDiscovered && (
              <div className="space-y-2">
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle size={16} className="mr-2" />
                  <span>Descoberto!</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCheckin('proximity')}
                    disabled={!isNearby}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 ${
                      isNearby 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Zap size={14} />
                    <span>Check-in</span>
                  </button>
                  
                  <button
                    onClick={showQR}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1"
                  >
                    <span>📱</span>
                    <span>QR</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };

  // Raio de descoberta visual
  const DiscoveryRadius: React.FC<{ center: { lat: number; lng: number } }> = ({ center }) => (
    <CircleMarker
      center={[center.lat, center.lng]}
      radius={60} // pixels no mapa
      pathOptions={{
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 5'
      }}
    />
  );

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[MAP_CONFIG.center.lat, MAP_CONFIG.center.lng]}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        className="w-full h-full rounded-lg"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEvents />
        
        {/* Marker do usuário */}
        {userLocation && (
          <>
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={createCustomIcon('user')}
              ref={setUserMarker}
            >
              <Popup>
                <div className="text-center">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="font-medium">Sua localização</p>
                  <p className="text-xs text-gray-500">
                    {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                  </p>
                </div>
              </Popup>
            </Marker>
            
            {/* Raio de descoberta */}
            {isPlaying && <DiscoveryRadius center={userLocation} />}
          </>
        )}
        
        {/* POIs da rota */}
        {currentRoute?.points.map((poi) => (
          <POIMarker key={poi.id} poi={poi} />
        ))}
        
        {/* Polyline da rota */}
        {currentRoute && (
          <Polyline
            positions={generateRoutePolyline(currentRoute.points)}
            pathOptions={{
              color: '#10B981',
              weight: 4,
              opacity: 0.8,
              dashArray: '10, 5'
            }}
          />
        )}
      </MapContainer>
      
      {/* HUD do jogo */}
      {isPlaying && currentRoute && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <RouteIcon className="text-green-600" size={20} />
            <div>
              <h3 className="font-bold text-sm">{currentRoute.name}</h3>
              <p className="text-xs text-gray-600">{currentRoute.points.length} pontos</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progresso</span>
              <span>{currentRoute.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentRoute.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 mt-3">
            <span className="flex items-center">
              <Clock size={10} className="mr-1" />
              {currentRoute.estimatedDuration}min
            </span>
            <span className="flex items-center">
              <Trophy size={10} className="mr-1" />
              {currentRoute.xpReward} XP
            </span>
          </div>
        </div>
      )}
      
      {/* Controles do jogador */}
      {userLocation && (
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([userLocation.lat, userLocation.lng], 16);
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
          >
            <Navigation size={20} />
          </button>
          
          {nearbyPOIs.length > 0 && (
            <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
              🎯 {nearbyPOIs.length} POI{nearbyPOIs.length > 1 ? 's' : ''} próximo{nearbyPOIs.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}
      
      {/* Modal do QR Code */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-center">QR Code Check-in</h3>
            
            <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
              <div className="text-6xl mb-2">📱</div>
              <div className="text-xs font-mono bg-white p-2 rounded border break-all">
                {showQRCode}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center mb-4">
              Escaneie este código no local para confirmar sua visita
            </p>
            
            <button
              onClick={() => setShowQRCode(null)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameMap;
