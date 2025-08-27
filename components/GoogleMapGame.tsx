import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MapPin, Navigation, Target, Award, Zap, Clock, 
  CheckCircle, Star, Trophy, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { backendService } from '../services/backendService';
import type { Route, PointOfInterest } from '../types';

// Interface para o Google Maps
declare global {
  interface Window {
    google: any;
    initGoogleMap: () => void;
  }
}

interface PlayerPosition {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

interface RouteProgress {
  routeId: string;
  currentPointIndex: number;
  completedPoints: string[];
  startTime: number;
  isActive: boolean;
}

// POIs de exemplo com coordenadas reais de Caçapava do Sul
const samplePOIs: { [key: string]: PointOfInterest } = {
  'poi-igreja-matriz': {
    id: 'poi-igreja-matriz',
    name: 'Igreja Matriz',
    description: 'Igreja histórica no centro',
    longDescription: 'Igreja histórica no coração de Caçapava do Sul',
    imageUrl: '/img/pontos_turisticos/IgrejaMatriz.jpg',
    points: 50,
    lat: -30.5119,
    lng: -53.4907
  },
  'poi-pedra-segredo': {
    id: 'poi-pedra-segredo',
    name: 'Pedra do Segredo',
    description: 'Formação rochosa única',
    longDescription: 'Formação rochosa espetacular com vista panorâmica',
    imageUrl: '/img/pontos_turisticos/pedradosegredo.png',
    points: 100,
    lat: -30.4919,
    lng: -53.4767
  },
  'poi-guaritas': {
    id: 'poi-guaritas',
    name: 'Guaritas do Camaquã',
    description: 'Formações rochosas milenares',
    longDescription: 'Espetaculares formações rochosas de arenito',
    imageUrl: '/img/pontos_turisticos/guaritas.png',
    points: 150,
    lat: -30.8319,
    lng: -53.4917
  },
  'poi-cascata-salso': {
    id: 'poi-cascata-salso',
    name: 'Cascata do Salso',
    description: 'Cachoeira deslumbrante',
    longDescription: 'Cachoeira deslumbrante com águas cristalinas',
    imageUrl: '/img/pontos_turisticos/cascata.jpg',
    points: 120,
    lat: -30.3619,
    lng: -53.5717
  },
  'poi-museu-lanceiros': {
    id: 'poi-museu-lanceiros',
    name: 'Museu dos Lanceiros Negros',
    description: 'História da Revolução Farroupilha',
    longDescription: 'Museu dedicado à história dos Lanceiros Negros',
    imageUrl: '/img/pontos_turisticos/museu.jpg',
    points: 80,
    lat: -30.5169,
    lng: -53.4887
  }
};

// Usar OpenStreetMap via Leaflet como alternativa ao Google Maps
const GoogleMapGame: React.FC = () => {
  const { user } = useAuth();
  const { currentUser, checkIn } = useGamification();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);
  const poiMarkersRef = useRef<L.Marker[]>([]);
  const routePathRef = useRef<L.Polyline | null>(null);
  const watchIdRef = useRef<number | null>(null);
  
  // Estado do jogo
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition | null>(null);
  const [availableRoutes, setAvailableRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routeProgress, setRouteProgress] = useState<RouteProgress | null>(null);
  const [nearbyPOIs, setNearbyPOIs] = useState<PointOfInterest[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Carregar Leaflet dinamicamente
  useEffect(() => {
    if (gameState === 'playing' && !window.L) {
      // Carregar CSS do Leaflet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Carregar JS do Leaflet
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else if (window.L) {
      setMapLoaded(true);
    }
  }, [gameState]);

  // Inicializar mapa Leaflet
  useEffect(() => {
    if (mapLoaded && gameState === 'playing' && mapRef.current && !mapInstanceRef.current && window.L) {
      const map = window.L.map(mapRef.current).setView([-30.5119, -53.4917], 14);
      
      // Adicionar camada de tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      mapInstanceRef.current = map;
      
      // Centralizar no jogador se tiver localização
      if (playerPosition) {
        map.setView([playerPosition.lat, playerPosition.lng], 16);
      }
    }
  }, [mapLoaded, gameState, playerPosition]);

  // Calcular distância entre dois pontos (em metros)
  const calculateDistance = (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }): number => {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = pos1.lat * Math.PI/180;
    const φ2 = pos2.lat * Math.PI/180;
    const Δφ = (pos2.lat-pos1.lat) * Math.PI/180;
    const Δλ = (pos2.lng-pos1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Atualizar marcador do jogador
  const updatePlayerMarker = useCallback((position: PlayerPosition) => {
    if (!mapInstanceRef.current || !window.L) return;

    const latLng = [position.lat, position.lng] as [number, number];

    if (!playerMarkerRef.current) {
      // Criar ícone customizado para o jogador
      const playerIcon = window.L.divIcon({
        className: 'custom-player-marker',
        html: `<div style="
          background-color: #3B82F6;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      playerMarkerRef.current = window.L.marker(latLng, { icon: playerIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup('Você está aqui!');

      // Círculo de precisão
      window.L.circle(latLng, {
        radius: position.accuracy,
        fillColor: '#3B82F6',
        fillOpacity: 0.1,
        color: '#3B82F6',
        weight: 2
      }).addTo(mapInstanceRef.current);
    } else {
      playerMarkerRef.current.setLatLng(latLng);
    }

    // Centralizar no jogador
    mapInstanceRef.current.panTo(latLng);
  }, []);

  // Atualizar marcadores dos POIs
  const updatePOIMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !window.L || !selectedRoute || !routeProgress) return;

    // Limpar marcadores antigos
    poiMarkersRef.current.forEach(marker => mapInstanceRef.current!.removeLayer(marker));
    poiMarkersRef.current = [];

    // Criar novos marcadores
    selectedRoute.pointsOfInterest.forEach((poiId, index) => {
      const poi = samplePOIs[poiId];
      if (!poi) return;

      const isCompleted = routeProgress.completedPoints.includes(poiId);
      const isCurrent = index === routeProgress.currentPointIndex;

      // Criar ícone customizado
      const poiIcon = window.L.divIcon({
        className: `custom-poi-marker ${isCurrent && !isCompleted ? 'pulse' : ''}`,
        html: `<div style="
          background-color: ${isCompleted ? '#10B981' : isCurrent ? '#F59E0B' : '#6B7280'};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
        ">${isCompleted ? '✓' : index + 1}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = window.L.marker([poi.lat, poi.lng], { icon: poiIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div style="padding: 10px;">
            <h3 style="font-weight: bold; margin: 0 0 5px 0;">${poi.name}</h3>
            <p style="margin: 0 0 5px 0; color: #666;">${poi.description}</p>
            ${isCompleted 
              ? '<p style="color: #10B981; margin: 0;">✓ Visitado</p>' 
              : `<p style="color: #3B82F6; font-weight: bold; margin: 0;">+${poi.points} pontos</p>`
            }
          </div>
        `);

      poiMarkersRef.current.push(marker);
    });

    // Desenhar linha da rota
    if (routePathRef.current) {
      mapInstanceRef.current.removeLayer(routePathRef.current);
    }

    const routeCoordinates = selectedRoute.pointsOfInterest
      .map(poiId => samplePOIs[poiId])
      .filter(Boolean)
      .map(poi => [poi.lat, poi.lng] as [number, number]);

    routePathRef.current = window.L.polyline(routeCoordinates, {
      color: '#10B981',
      weight: 4,
      opacity: 0.8,
      dashArray: '10, 5'
    }).addTo(mapInstanceRef.current);
  }, [selectedRoute, routeProgress]);

  // Verificar POIs próximos
  const checkNearbyPOIs = useCallback(async (position: PlayerPosition) => {
    if (!selectedRoute || !routeProgress) return;

    const routePOIs = selectedRoute.pointsOfInterest
      .map(poiId => samplePOIs[poiId])
      .filter(Boolean);
    
    const nearby = routePOIs.filter(poi => {
      const distance = calculateDistance(position, { lat: poi.lat, lng: poi.lng });
      return distance <= 50; // 50 metros de raio
    });

    setNearbyPOIs(nearby);

    // Auto check-in se estiver perto
    nearby.forEach(poi => {
      if (!routeProgress.completedPoints.includes(poi.id)) {
        performCheckIn(poi);
      }
    });
  }, [selectedRoute, routeProgress]);

  // Realizar check-in no ponto
  const performCheckIn = async (poi: PointOfInterest) => {
    if (!currentUser || !routeProgress) return;

    try {
      // Vibração de sucesso
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }

      // Atualizar progresso da rota
      const newCompletedPoints = [...routeProgress.completedPoints, poi.id];
      const newProgress = {
        ...routeProgress,
        completedPoints: newCompletedPoints,
        currentPointIndex: routeProgress.currentPointIndex + 1
      };
      setRouteProgress(newProgress);

      // Verificar se completou a rota
      if (newCompletedPoints.length === selectedRoute!.pointsOfInterest.length) {
        completeRoute();
      }
    } catch (error) {
      console.error('Erro ao fazer check-in:', error);
    }
  };

  // Carregar rotas disponíveis
  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const routes = await backendService.getRoutes();
        setAvailableRoutes(routes);
      } catch (error) {
        console.error('Erro ao carregar rotas:', error);
      }
    };
    loadRoutes();
  }, []);

  // Rastreamento de localização
  useEffect(() => {
    if (isTracking && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition: PlayerPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          };
          setPlayerPosition(newPosition);
          updatePlayerMarker(newPosition);
          checkNearbyPOIs(newPosition);
        },
        (error) => {
          console.error('Erro de geolocalização:', error);
          // Usar posição simulada para teste
          const simulatedPosition: PlayerPosition = {
            lat: -30.5119,
            lng: -53.4907,
            accuracy: 20,
            timestamp: Date.now()
          };
          setPlayerPosition(simulatedPosition);
          updatePlayerMarker(simulatedPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000
        }
      );
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking, updatePlayerMarker, checkNearbyPOIs]);

  // Atualizar marcadores quando mudar o progresso
  useEffect(() => {
    updatePOIMarkers();
  }, [routeProgress, updatePOIMarkers]);

  // Iniciar rota
  const startRoute = (route: Route) => {
    setSelectedRoute(route);
    setRouteProgress({
      routeId: route.id,
      currentPointIndex: 0,
      completedPoints: [],
      startTime: Date.now(),
      isActive: true
    });
    setGameState('playing');
    setIsTracking(true);
  };

  // Completar rota
  const completeRoute = () => {
    setGameState('completed');
    setIsTracking(false);
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // Reiniciar jogo
  const resetGame = () => {
    setSelectedRoute(null);
    setRouteProgress(null);
    setGameState('menu');
    setIsTracking(false);
    setNearbyPOIs([]);
    
    // Limpar mapa
    if (playerMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(playerMarkerRef.current);
      playerMarkerRef.current = null;
    }
    poiMarkersRef.current.forEach(marker => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(marker);
      }
    });
    poiMarkersRef.current = [];
    if (routePathRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(routePathRef.current);
      routePathRef.current = null;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  };

  // Menu inicial
  if (gameState === 'menu') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Caçapava</h1>
            <p className="text-gray-600">Escolha uma rota e comece sua aventura!</p>
          </div>

          <div className="space-y-4 mb-8">
            {availableRoutes.map(route => (
              <button
                key={route.id}
                onClick={() => startRoute(route)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 text-left"
              >
                <h3 className="font-bold text-lg mb-1">{route.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{route.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {route.pointsOfInterest.length} pontos
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} />
                    {route.pointsOfInterest.length * 50} pontos
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>🏆 Você tem {currentUser?.points || 0} pontos</p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de rota completada
  if (gameState === 'completed' && selectedRoute) {
    const duration = routeProgress ? (Date.now() - routeProgress.startTime) / 1000 / 60 : 0;
    const pointsEarned = selectedRoute.pointsOfInterest.length * 50;

    return (
      <div className="w-full h-screen bg-gradient-to-br from-yellow-400 to-green-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Parabéns! 🎉</h1>
          <p className="text-xl text-gray-600 mb-6">Você completou a rota!</p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600">Rota</p>
              <p className="font-bold text-lg">{selectedRoute.name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Tempo</p>
                <p className="font-bold text-lg">{Math.round(duration)} min</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Pontos</p>
                <p className="font-bold text-lg text-green-600">+{pointsEarned}</p>
              </div>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
          >
            Nova Aventura
          </button>
        </div>
      </div>
    );
  }

  // Tela principal do jogo com mapa
  return (
    <div className="relative w-full h-screen">
      {/* Mapa Leaflet */}
      <div ref={mapRef} className="w-full h-full" />

      {/* HUD do jogo */}
      <div className="absolute top-0 left-0 right-0 p-4 z-[1000]">
        {/* Barra de progresso da rota */}
        {selectedRoute && routeProgress && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">{selectedRoute.name}</h3>
              <span className="text-sm text-gray-600">
                {routeProgress.completedPoints.length}/{selectedRoute.pointsOfInterest.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(routeProgress.completedPoints.length / selectedRoute.pointsOfInterest.length) * 100}%`
                } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* Indicador de POIs próximos */}
        {nearbyPOIs.length > 0 && (
          <div className="bg-yellow-500 text-white rounded-xl p-3 shadow-lg animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <Target size={20} />
              <span className="font-semibold">
                {nearbyPOIs.length} ponto{nearbyPOIs.length > 1 ? 's' : ''} próximo{nearbyPOIs.length > 1 ? 's' : ''}!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Controles inferiores */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-[1000]">
        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="bg-red-500 text-white p-4 rounded-xl shadow-lg hover:bg-red-600 transition-colors"
            aria-label="Sair do jogo"
          >
            <X size={24} />
          </button>
          
          {playerPosition && mapInstanceRef.current && (
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.panTo([playerPosition.lat, playerPosition.lng]);
                  mapInstanceRef.current.setZoom(16);
                }
              }}
              className="bg-blue-500 text-white p-4 rounded-xl shadow-lg hover:bg-blue-600 transition-colors flex-1"
              aria-label="Centralizar no jogador"
            >
              <Navigation size={24} className="mx-auto" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleMapGame;