import React, { useState, useEffect } from 'react';
import { 
  MapPin, Play, Pause, Target, Trophy, Users, Calendar,
  CheckCircle, Star, Zap, Download, BarChart3, Filter,
  RefreshCw, AlertTriangle, Shield, Database
} from 'lucide-react';
import GameMap from '../components/GameMap';
import SecretaryDashboard from '../components/admin/SecretaryDashboard';
import { 
  generatePersonalizedRoute, 
  ANCHOR_POIS, 
  RoutePoint, 
  GameRoute,
  updateRouteProgress 
} from '../utils/gameRoutes';
import { 
  getCheckinHistory, 
  canCheckin, 
  recordCheckin, 
  formatCooldown 
} from '../utils/checkinSystem';
import { 
  purgeCacapavaData, 
  getTrashReport, 
  validateMunicipalityMiddleware 
} from '../utils/dataQuality';
import { 
  ANCHOR_POIS as SEED_POIS, 
  seedAnchorPOIs, 
  getAnchorPOIsStats 
} from '../utils/seedData';
import { CACAPAVA_CENTER, MAP_CONFIG } from '../utils/geolocation';

const GameSystemDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('demo');
  const [gameState, setGameState] = useState<{
    isPlaying: boolean;
    currentRoute: GameRoute | null;
    userLocation: { lat: number; lng: number } | null;
    discoveredPOIs: string[];
    completedCheckins: string[];
    totalXP: number;
  }>({
    isPlaying: false,
    currentRoute: null,
    userLocation: null,
    discoveredPOIs: [],
    completedCheckins: [],
    totalXP: 0
  });
  
  const [dataQualityReport, setDataQualityReport] = useState<any>(null);
  const [seedStats, setSeedStats] = useState<any>(null);
  const [secretaryDateRange, setSecretaryDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
    end: new Date()
  });

  // Inicializar sistema
  useEffect(() => {
    initializeSystem();
  }, []);

  const initializeSystem = async () => {
    try {
      // Carregar estatísticas dos POIs âncora
      const stats = getAnchorPOIsStats();
      setSeedStats(stats);
      
      // Simular localização do usuário (centro de Caçapava)
      setGameState(prev => ({
        ...prev,
        userLocation: CACAPAVA_CENTER
      }));
      
      console.log('✅ Sistema inicializado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao inicializar sistema:', error);
    }
  };

  const startGame = () => {
    // Gerar rota personalizada
    const personalizedRoute = generatePersonalizedRoute(
      {
        categories: ['historia', 'natureza'],
        difficulty: 'medio',
        timeAvailable: 180, // 3 horas
        startLocation: CACAPAVA_CENTER
      },
      ANCHOR_POIS
    );

    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      currentRoute: personalizedRoute
    }));
  };

  const stopGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      currentRoute: null,
      discoveredPOIs: [],
      completedCheckins: []
    }));
  };

  const handlePOIDiscover = (poiId: string) => {
    if (!gameState.discoveredPOIs.includes(poiId)) {
      setGameState(prev => ({
        ...prev,
        discoveredPOIs: [...prev.discoveredPOIs, poiId],
        totalXP: prev.totalXP + 10 // XP por descoberta
      }));
      
      // Mostrar toast de descoberta
      console.log(`🎯 POI descoberto: ${poiId} (+10 XP)`);
    }
  };

  const handleCheckin = (poiId: string, type: 'proximity' | 'qr') => {
    const checkinResult = canCheckin('demo_user', poiId);
    
    if (checkinResult.canCheckin) {
      recordCheckin('demo_user', poiId);
      
      const xpGained = type === 'qr' ? 25 : 15;
      setGameState(prev => ({
        ...prev,
        completedCheckins: [...prev.completedCheckins, poiId],
        totalXP: prev.totalXP + xpGained
      }));
      
      // Atualizar progresso da rota
      if (gameState.currentRoute) {
        const updatedRoute = updateRouteProgress(
          gameState.currentRoute, 
          [...gameState.completedCheckins, poiId]
        );
        setGameState(prev => ({
          ...prev,
          currentRoute: updatedRoute
        }));
      }
      
      console.log(`✅ Check-in realizado: ${poiId} (+${xpGained} XP)`);
    } else {
      alert(checkinResult.reason);
    }
  };

  const runDataQuality = async () => {
    const report = await purgeCacapavaData();
    setDataQualityReport(report);
  };

  const runSeedData = async () => {
    await seedAnchorPOIs();
    const stats = getAnchorPOIsStats();
    setSeedStats(stats);
  };

  const TabButton: React.FC<{ id: string; label: string; icon: React.ReactNode; badge?: string }> = 
    ({ id, label, icon, badge }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Sistema Caçapava Game - Demo Completo
              </h1>
              <p className="text-gray-600">
                Mapa jogável + Data Quality + Painel da Secretaria
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">XP Total</div>
                <div className="text-xl font-bold text-blue-600">{gameState.totalXP}</div>
              </div>
              
              {gameState.isPlaying ? (
                <button
                  onClick={stopGame}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  <Pause size={16} />
                  <span>Parar Jogo</span>
                </button>
              ) : (
                <button
                  onClick={startGame}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  <Play size={16} />
                  <span>Iniciar Jogo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton 
            id="demo" 
            label="Mapa Jogável" 
            icon={<MapPin size={20} />}
            badge={gameState.isPlaying ? "ATIVO" : undefined}
          />
          <TabButton 
            id="quality" 
            label="Data Quality" 
            icon={<Database size={20} />} 
          />
          <TabButton 
            id="secretary" 
            label="Painel Secretaria" 
            icon={<BarChart3 size={20} />} 
          />
          <TabButton 
            id="validation" 
            label="Validação Geográfica" 
            icon={<Shield size={20} />} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'demo' && (
          <div className="space-y-6">
            {/* Game Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center space-x-3">
                  <Target className="text-blue-600" size={24} />
                  <div>
                    <div className="text-2xl font-bold">{gameState.discoveredPOIs.length}</div>
                    <div className="text-sm text-gray-600">POIs Descobertos</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <div>
                    <div className="text-2xl font-bold">{gameState.completedCheckins.length}</div>
                    <div className="text-sm text-gray-600">Check-ins</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center space-x-3">
                  <Trophy className="text-yellow-600" size={24} />
                  <div>
                    <div className="text-2xl font-bold">{gameState.totalXP}</div>
                    <div className="text-sm text-gray-600">XP Total</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-purple-600" size={24} />
                  <div>
                    <div className="text-2xl font-bold">
                      {gameState.currentRoute?.progress || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Progresso Rota</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Map */}
            <div className="bg-white rounded-lg shadow border overflow-hidden">
              <div className="h-96">
                <GameMap
                  currentRoute={gameState.currentRoute}
                  userLocation={gameState.userLocation}
                  onPOIDiscover={handlePOIDiscover}
                  onCheckin={handleCheckin}
                  isPlaying={gameState.isPlaying}
                />
              </div>
            </div>

            {/* Current Route Info */}
            {gameState.currentRoute && (
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-bold mb-4">Rota Atual: {gameState.currentRoute.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Pontos</div>
                    <div className="font-semibold">{gameState.currentRoute.points.length} locais</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Duração</div>
                    <div className="font-semibold">{gameState.currentRoute.estimatedDuration} min</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">XP Total</div>
                    <div className="font-semibold">{gameState.currentRoute.xpReward} XP</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Progresso da Rota</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${gameState.currentRoute.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Data Quality - Limpeza de Dados</h3>
                <button
                  onClick={runDataQuality}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <RefreshCw size={16} />
                  <span>Executar Limpeza</span>
                </button>
              </div>

              {dataQualityReport ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {dataQualityReport.totalProcessed}
                      </div>
                      <div className="text-sm text-blue-700">Total Processado</div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {dataQualityReport.kept}
                      </div>
                      <div className="text-sm text-green-700">Mantidos</div>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {dataQualityReport.trashed}
                      </div>
                      <div className="text-sm text-red-700">Removidos</div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {dataQualityReport.normalized}
                      </div>
                      <div className="text-sm text-yellow-700">Normalizados</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Motivos de Remoção</h4>
                      {Object.entries(dataQualityReport.reasons).map(([reason, count]) => (
                        <div key={reason} className="flex justify-between py-2 border-b">
                          <span className="text-sm">{reason}</span>
                          <span className="font-semibold">{count as number}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Categorias Mantidas</h4>
                      {Object.entries(dataQualityReport.categories).map(([category, count]) => (
                        <div key={category} className="flex justify-between py-2 border-b">
                          <span className="text-sm">{category}</span>
                          <span className="font-semibold">{count as number}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Database size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Execute a limpeza para ver o relatório</p>
                </div>
              )}
            </div>

            {/* Seed Data Section */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">POIs Âncora (Seed Data)</h3>
                <button
                  onClick={runSeedData}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  <Database size={16} />
                  <span>Inserir Seeds</span>
                </button>
              </div>

              {seedStats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Estatísticas Gerais</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total de POIs:</span>
                        <span className="font-semibold">{seedStats.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>XP Total:</span>
                        <span className="font-semibold">{seedStats.xpTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tempo Total:</span>
                        <span className="font-semibold">{seedStats.tempoTotal}min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Por Categoria</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(seedStats.porCategoria).map(([category, count]) => (
                        <div key={category} className="flex justify-between">
                          <span className="capitalize">{category}:</span>
                          <span className="font-semibold">{count as number}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Preços</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gratuitos:</span>
                        <span className="font-semibold">{seedStats.gratuitos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pagos:</span>
                        <span className="font-semibold">{seedStats.pagos}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'secretary' && (
          <SecretaryDashboard
            dateRange={secretaryDateRange}
            onDateRangeChange={setSecretaryDateRange}
          />
        )}

        {activeTab === 'validation' && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-xl font-bold mb-6">Sistema de Validação Geográfica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">BBOX de Caçapava do Sul (RS)</h4>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div>minLat: -30.968529</div>
                  <div>maxLat: -30.138805</div>
                  <div>minLng: -53.821469</div>
                  <div>maxLng: -53.169939</div>
                </div>
                
                <h4 className="font-semibold">Centro de Referência</h4>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div>lat: -30.516</div>
                  <div>lng: -53.487</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Validações Ativas</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">BBOX validation ativa</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">Anti-Caçapava (SP) ativo</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">Middleware de runtime ativo</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">Validação de POIs âncora OK</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="text-blue-600 mt-1" size={16} />
                    <div className="text-sm text-blue-800">
                      <div className="font-semibold mb-1">Sistema Blindado</div>
                      <div>Nenhum dado fora de Caçapava do Sul (RS) será aceito ou exibido no app.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSystemDemo;
