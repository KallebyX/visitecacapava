import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { THEMATIC_ROUTES, ThematicRoute, RouteStep, isRouteUnlocked, getNextRouteStep, calculateRouteProgress, isRouteCompleted, calculateDistance } from '../data/thematicRoutes';
import { MapOutlineIcon } from './MapOutlineIcon';

interface InteractiveRoutesProps {
  onStartRoute: (route: ThematicRoute) => void;
  onNavigateToStep: (step: RouteStep) => void;
}

export const InteractiveRoutes: React.FC<InteractiveRoutesProps> = ({ onStartRoute, onNavigateToStep }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedRoute, setSelectedRoute] = useState<ThematicRoute | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Obter localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
        }
      );
    }
  }, []);

  // Filtrar rotas por categoria
  const filteredRoutes = THEMATIC_ROUTES.filter(route => {
    if (selectedCategory === 'todas') return true;
    return route.category === selectedCategory;
  });

  // Obter progresso da rota para o usuário
  const getRouteProgressForUser = (route: ThematicRoute) => {
    if (!user) return 0;
    const completedSteps = user.visited.map(v => v.pointId);
    return calculateRouteProgress(route, completedSteps);
  };

  // Verificar se o usuário está próximo de uma etapa
  const isNearStep = (step: RouteStep): boolean => {
    if (!userLocation) return false;
    const distance = calculateDistance(
      userLocation.lat, 
      userLocation.lng, 
      step.poi.lat, 
      step.poi.lng
    );
    return distance <= 500; // 500 metros de raio
  };

  // Obter próxima etapa de uma rota
  const getNextStepForUser = (route: ThematicRoute): RouteStep | null => {
    if (!user) return null;
    const completedSteps = user.visited.map(v => v.pointId);
    return getNextRouteStep(route, completedSteps);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'text-green-600 bg-green-100';
      case 'medio': return 'text-yellow-600 bg-yellow-100';
      case 'dificil': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historica': return '🏛️';
      case 'natural': return '🌿';
      case 'gastronomica': return '🫒';
      case 'cultural': return '🎭';
      default: return '📍';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${meters}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🗺️ Rotas Interativas
        </h2>
        <p className="text-gray-600">
          Explore Caçapava do Sul seguindo rotas temáticas gamificadas
        </p>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('todas')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'todas'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas as Rotas
        </button>
        <button
          onClick={() => setSelectedCategory('historica')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'historica'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🏛️ Histórica
        </button>
        <button
          onClick={() => setSelectedCategory('natural')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'natural'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🌿 Natural
        </button>
        <button
          onClick={() => setSelectedCategory('gastronomica')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'gastronomica'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🫒 Gastronômica
        </button>
        <button
          onClick={() => setSelectedCategory('cultural')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'cultural'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🎭 Cultural
        </button>
      </div>

      {/* Lista de rotas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoutes.map((route) => {
          const isUnlocked = isRouteUnlocked(route, user?.badges || []);
          const progress = getRouteProgressForUser(route);
          const isCompleted = isRouteCompleted(route, user?.visited.map(v => v.pointId) || []);
          const nextStep = getNextStepForUser(route);

          return (
            <div
              key={route.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
                !isUnlocked ? 'opacity-60' : ''
              }`}
            >
              {/* Header da rota */}
              <div
                className="p-4 text-white relative"
                style={{ backgroundColor: route.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{route.icon}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(route.difficulty)}`}>
                    {route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{route.name}</h3>
                <p className="text-sm opacity-90">{route.description}</p>
                
                {/* Status da rota */}
                {isCompleted && (
                  <div className="absolute top-2 right-2">
                    <span className="text-xl">✅</span>
                  </div>
                )}
              </div>

              {/* Informações da rota */}
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>⏱️ {formatDuration(route.estimatedDuration)}</span>
                  <span>📏 {formatDistance(route.totalDistance)}</span>
                  <span>🏆 {route.rewards.points} pts</span>
                </div>

                {/* Barra de progresso */}
                {user && progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Próxima etapa */}
                {user && nextStep && isUnlocked && (
                  <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium mb-1">Próxima etapa:</p>
                    <p className="text-sm text-blue-800">{nextStep.poi.name}</p>
                    {isNearStep(nextStep) && (
                      <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        📍 Você está próximo!
                      </span>
                    )}
                  </div>
                )}

                {/* Requisitos não atendidos */}
                {!isUnlocked && route.requirements && (
                  <div className="mb-3 p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-600 font-medium mb-1">Requisitos:</p>
                    <p className="text-sm text-orange-800">
                      Obtenha a medalha: {route.requirements.join(', ')}
                    </p>
                  </div>
                )}

                {/* Recompensas */}
                <div className="mb-3 p-2 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-600 font-medium mb-1">Recompensas:</p>
                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <span>🏆 {route.rewards.points} pontos</span>
                    {route.rewards.badge && (
                      <span>🏅 {route.rewards.badge}</span>
                    )}
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRoute(route)}
                    disabled={!isUnlocked}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isUnlocked
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Ver Detalhes
                  </button>
                  
                  {isUnlocked && nextStep && (
                    <button
                      onClick={() => onNavigateToStep(nextStep)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      <MapOutlineIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de detalhes da rota */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do modal */}
            <div
              className="p-6 text-white"
              style={{ backgroundColor: selectedRoute.color }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedRoute.icon} {selectedRoute.name}
                  </h2>
                  <p className="opacity-90">{selectedRoute.description}</p>
                </div>
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Conteúdo do modal */}
            <div className="p-6">
              {/* Informações gerais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl mb-1">⏱️</p>
                  <p className="text-sm text-gray-600">Duração</p>
                  <p className="font-medium">{formatDuration(selectedRoute.estimatedDuration)}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">📏</p>
                  <p className="text-sm text-gray-600">Distância</p>
                  <p className="font-medium">{formatDistance(selectedRoute.totalDistance)}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">🏆</p>
                  <p className="text-sm text-gray-600">Pontos</p>
                  <p className="font-medium">{selectedRoute.rewards.points}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">📊</p>
                  <p className="text-sm text-gray-600">Dificuldade</p>
                  <p className="font-medium capitalize">{selectedRoute.difficulty}</p>
                </div>
              </div>

              {/* Etapas da rota */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Etapas da Rota</h3>
                <div className="space-y-4">
                  {selectedRoute.steps.map((step, index) => {
                    const isVisited = user?.visited.some(v => v.pointId === step.poi.id);
                    const isNext = !isVisited && index === 0 || 
                                  (!isVisited && selectedRoute.steps.slice(0, index).every(s => 
                                    user?.visited.some(v => v.pointId === s.poi.id)
                                  ));

                    return (
                      <div
                        key={step.poi.id}
                        className={`p-4 rounded-lg border-2 ${
                          isVisited 
                            ? 'border-green-200 bg-green-50' 
                            : isNext 
                              ? 'border-blue-200 bg-blue-50'
                              : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isVisited 
                              ? 'bg-green-500 text-white' 
                              : isNext 
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                          }`}>
                            {isVisited ? '✓' : step.order}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {step.poi.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {step.description}
                            </p>
                            
                            {step.hint && (
                              <p className="text-xs text-blue-600 italic">
                                💡 {step.hint}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>⏱️ {step.estimatedTime}min</span>
                              <span>🏆 {step.poi.points} pts</span>
                              {step.distanceToNext && (
                                <span>➡️ {formatDistance(step.distanceToNext)}</span>
                              )}
                            </div>
                          </div>

                          {isNext && (
                            <button
                              onClick={() => {
                                onNavigateToStep(step);
                                setSelectedRoute(null);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              Navegar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botão de iniciar rota */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onStartRoute(selectedRoute);
                    setSelectedRoute(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Iniciar Rota
                </button>
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
