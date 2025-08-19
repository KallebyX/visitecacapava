import React, { useState, useEffect } from 'react';
import {
  Calendar, Download, Users, MapPin, Trophy, TrendingUp,
  Filter, RefreshCw, FileText, Eye, BarChart3
} from 'lucide-react';

interface AnalyticsData {
  checkinsByDay: Array<{ date: string; checkins: number; users: number }>;
  topPOIs: Array<{ name: string; checkins: number; category: string; xp: number }>;
  routesCompleted: Array<{ name: string; completions: number; avgTime: number }>;
  heatmapData: Array<{ lat: number; lng: number; intensity: number }>;
  userEngagement: Array<{ metric: string; value: number; change: number }>;
  categoryDistribution: Array<{ category: string; count: number; color: string }>;
}

interface SecretaryDashboardProps {
  dateRange: { start: Date; end: Date };
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
}

const SecretaryDashboard: React.FC<SecretaryDashboardProps> = ({
  dateRange,
  onDateRangeChange
}) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPOI, setSelectedPOI] = useState<string | null>(null);

  // Simulação de dados da Secretaria (em produção, viria da API)
  useEffect(() => {
    const loadAnalyticsData = async () => {
      setLoading(true);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        checkinsByDay: [
          { date: '2024-08-01', checkins: 45, users: 23 },
          { date: '2024-08-02', checkins: 62, users: 31 },
          { date: '2024-08-03', checkins: 38, users: 19 },
          { date: '2024-08-04', checkins: 71, users: 35 },
          { date: '2024-08-05', checkins: 89, users: 42 },
          { date: '2024-08-06', checkins: 95, users: 48 },
          { date: '2024-08-07', checkins: 103, users: 52 }
        ],
        topPOIs: [
          { name: 'Pedra do Segredo', checkins: 342, category: 'natureza', xp: 17100 },
          { name: 'Guaritas', checkins: 298, category: 'natureza', xp: 22350 },
          { name: 'Forte Dom Pedro II', checkins: 267, category: 'historia', xp: 10680 },
          { name: 'Minas do Camaquã', checkins: 234, category: 'historia', xp: 23400 },
          { name: 'Centro Histórico', checkins: 189, category: 'familia', xp: 6615 }
        ],
        routesCompleted: [
          { name: 'Rota Histórica', completions: 89, avgTime: 142 },
          { name: 'Rota da Geodiversidade', completions: 67, avgTime: 198 },
          { name: 'Centro Histórico', completions: 112, avgTime: 87 },
          { name: 'Rota do Azeite', completions: 45, avgTime: 156 }
        ],
        heatmapData: [
          { lat: -30.5089, lng: -53.4821, intensity: 95 }, // Pedra do Segredo
          { lat: -30.5234, lng: -53.4567, intensity: 87 }, // Guaritas
          { lat: -30.5156, lng: -53.4912, intensity: 73 }, // Forte
          { lat: -30.5291, lng: -53.5123, intensity: 68 }, // Minas
          { lat: -30.5134, lng: -53.4889, intensity: 52 }  // Centro
        ],
        userEngagement: [
          { metric: 'Usuários Ativos', value: 1248, change: 15.3 },
          { metric: 'Check-ins Totais', value: 4756, change: 22.1 },
          { metric: 'Rotas Completadas', value: 313, change: 8.7 },
          { metric: 'Tempo Médio no App', value: 28, change: -3.2 }
        ],
        categoryDistribution: [
          { category: 'História', count: 145, color: '#8B5CF6' },
          { category: 'Natureza', count: 189, color: '#10B981' },
          { category: 'Gastronomia', count: 87, color: '#F59E0B' },
          { category: 'Família', count: 124, color: '#EF4444' }
        ]
      };
      
      setData(mockData);
      setLoading(false);
    };

    loadAnalyticsData();
  }, [dateRange]);

  const exportData = (format: 'csv' | 'excel') => {
    if (!data) return;
    
    // Preparar dados para export
    const exportData = {
      checkins_por_dia: data.checkinsByDay,
      top_pois: data.topPOIs,
      rotas_completadas: data.routesCompleted,
      engajamento: data.userEngagement
    };
    
    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cacapava_analytics_${format}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className={`text-sm flex items-center mt-1 ${
              change > 0 ? 'text-green-200' : 'text-red-200'
            }`}>
              <TrendingUp className="mr-1" size={14} />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className="text-4xl opacity-75">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center space-x-3">
          <RefreshCw className="animate-spin text-blue-600" size={24} />
          <span className="text-lg text-gray-600">Carregando dados da Secretaria...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-red-600">Erro ao carregar dados</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Painel da Secretaria de Turismo
          </h1>
          <p className="text-gray-600 mt-1">
            Dados exclusivos de Caçapava do Sul (RS)
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => exportData('csv')}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Download size={16} />
            <span>CSV</span>
          </button>
          
          <button
            onClick={() => exportData('excel')}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FileText size={16} />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Filtros de Data */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-600" />
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => onDateRangeChange({
              ...dateRange,
              start: new Date(e.target.value)
            })}
            className="border rounded px-3 py-2"
          />
          <span className="text-gray-500">até</span>
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => onDateRangeChange({
              ...dateRange,
              end: new Date(e.target.value)
            })}
            className="border rounded px-3 py-2"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Aplicar
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.userEngagement.map((metric, index) => (
          <StatCard
            key={metric.metric}
            title={metric.metric}
            value={metric.value}
            change={metric.change}
            icon={
              index === 0 ? <Users /> :
              index === 1 ? <MapPin /> :
              index === 2 ? <Trophy /> : <Eye />
            }
            color={
              index === 0 ? 'from-blue-600 to-blue-700' :
              index === 1 ? 'from-green-600 to-green-700' :
              index === 2 ? 'from-purple-600 to-purple-700' : 'from-orange-600 to-orange-700'
            }
          />
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {[
            { id: 'overview', label: 'Visão Geral', icon: <BarChart3 size={16} /> },
            { id: 'pois', label: 'POIs', icon: <MapPin size={16} /> },
            { id: 'routes', label: 'Rotas', icon: <Trophy size={16} /> },
            { id: 'heatmap', label: 'Heatmap', icon: <TrendingUp size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Gráfico de Check-ins por Dia */}
              <div>
                <h3 className="text-xl font-bold mb-4">Check-ins por Dia</h3>
                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="space-y-4">
                    {data.checkinsByDay.map((day, index) => (
                      <div key={day.date} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{day.date}</span>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span className="text-sm">{day.checkins} check-ins</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span className="text-sm">{day.users} usuários</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Distribuição por Categorias */}
              <div>
                <h3 className="text-xl font-bold mb-4">Distribuição por Categorias</h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.categoryDistribution.map((category) => (
                    <div key={category.category} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-6 h-6 rounded" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div>
                          <div className="font-semibold">{category.category}</div>
                          <div className="text-2xl font-bold">{category.count} visitas</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pois' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Top POIs Mais Visitados</h3>
              <div className="space-y-4">
                {data.topPOIs.map((poi, index) => (
                  <div 
                    key={poi.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedPOI(selectedPOI === poi.name ? null : poi.name)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{poi.name}</h4>
                        <p className="text-sm text-gray-600">{poi.category}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">{poi.checkins}</p>
                      <p className="text-sm text-gray-600">check-ins</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Performance das Rotas</h3>
              <div className="space-y-4">
                {data.routesCompleted.map((route, index) => (
                  <div key={route.name} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{route.name}</h4>
                        <p className="text-sm text-gray-600">Tempo médio: {route.avgTime} min</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{route.completions}</div>
                        <div className="text-sm text-gray-600">completadas</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(route.completions / Math.max(...data.routesCompleted.map(r => r.completions))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'heatmap' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Mapa de Calor - Locais Mais Visitados</h3>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600">
                  Mapa de calor mostrando concentração de visitas em Caçapava do Sul
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Implementação do mapa interativo em desenvolvimento
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔒 Privacidade e Conformidade</h4>
        <p className="text-blue-700 text-sm">
          Todos os dados são pseudonimizados e agregados. Coordenadas são arredondadas para 
          proteger a privacidade dos usuários. Coleta realizada com opt-in explícito conforme LGPD.
        </p>
      </div>
    </div>
  );
};

export default SecretaryDashboard;
