import React, { useState } from 'react';
import { InteractiveRoutes } from '../components/InteractiveRoutes';
import { ThematicRoute, RouteStep } from '../data/thematicRoutes';
import { MapPin, Trophy, Clock, Route as RouteIcon } from 'lucide-react';

const RoutesPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<ThematicRoute | null>(null);

  const handleStartRoute = (route: ThematicRoute) => {
    // Em uma implementação real, redirecionaria para o mapa com a rota ativa
    alert(`Iniciando rota: ${route.name}\n\nVocê será direcionado para o mapa interativo.`);
    // Aqui você poderia usar navigate('/mapa', { state: { activeRoute: route } })
  };

  const handleNavigateToStep = (step: RouteStep) => {
    // Em uma implementação real, abriria navegação GPS
    alert(`Navegando para: ${step.poi.name}\n\nAbrindo navegação GPS...`);
    // Aqui você poderia integrar com Google Maps ou Waze
    // window.open(`https://www.google.com/maps/dir/?api=1&destination=${step.poi.lat},${step.poi.lng}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <RouteIcon className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rotas Temáticas Interativas
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Explore Caçapava do Sul através de experiências gamificadas únicas
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="font-semibold">Histórica</h3>
                <p className="text-sm text-blue-100">Patrimônio e memória</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌿</div>
                <h3 className="font-semibold">Natural</h3>
                <p className="text-sm text-blue-100">Guaritas e natureza</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🫒</div>
                <h3 className="font-semibold">Gastronômica</h3>
                <p className="text-sm text-blue-100">Azeites premiados</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎭</div>
                <h3 className="font-semibold">Cultural</h3>
                <p className="text-sm text-blue-100">Tradições gaúchas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Como Funciona */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona o Sistema de Rotas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Um sistema gamificado inspirado em Pokémon GO para tornar sua visita mais envolvente e recompensadora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RouteIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Escolha sua Rota</h3>
              <p className="text-gray-600">Selecione entre rotas históricas, naturais, gastronômicas ou culturais</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Siga o Mapa</h3>
              <p className="text-gray-600">Use nosso mapa interativo com marcadores numerados e dicas de navegação</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-purple-600 font-bold text-lg">QR</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Faça Check-in</h3>
              <p className="text-gray-600">Escaneie QR codes nos locais para validar sua visita e ganhar pontos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Colete Recompensas</h3>
              <p className="text-gray-600">Ganhe pontos, medalhas e desbloqueie novas rotas e benefícios</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefícios */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que usar as Rotas Temáticas?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Experiência Direcionada</h3>
                <p className="text-gray-600">
                  Cada rota é cuidadosamente planejada para oferecer uma experiência coesa e enriquecedora sobre temas específicos
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aprendizado Interativo</h3>
                <p className="text-gray-600">
                  Aprenda sobre história, natureza, gastronomia e cultura local de forma envolvente e divertida
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sistema de Recompensas</h3>
                <p className="text-gray-600">
                  Seja recompensado por explorar a cidade com pontos, medalhas e benefícios em estabelecimentos locais
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rotas Disponíveis */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveRoutes
            onStartRoute={handleStartRoute}
            onNavigateToStep={handleNavigateToStep}
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Começar sua Aventura?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Baixe o app, crie sua conta e comece a explorar Caçapava do Sul como nunca antes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Criar Conta Grátis
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Ver Mapa Interativo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
