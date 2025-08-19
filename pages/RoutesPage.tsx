import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RouteCard from '../components/RouteCard';
import type { Route } from '../types';
import { backendService } from '../services/backendService';
import { Map, Navigation, Clock, MapPin, Compass, Route as RouteIcon, Star, Target, Zap } from 'lucide-react';

const RoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backendService.getRoutes().then(data => {
      setRoutes(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando rotas...</p>
        </div>
      </div>
    );
  }

  const totalDistance = routes.reduce((sum, route) => sum + (route.distance || 0), 0);
  const totalDuration = routes.reduce((sum, route) => sum + (route.estimatedTime || 0), 0);
  const totalPois = routes.reduce((sum, route) => sum + route.pointsOfInterest.length, 0);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl overflow-hidden py-16 px-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4 opacity-20">
          <Map className="w-32 h-32" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Compass className="w-24 h-24" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              <RouteIcon className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">🗺️ Rotas Inteligentes</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Descubra Caçapava do Sul através de roteiros personalizados
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <RouteIcon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{routes.length}</div>
              <div className="text-sm opacity-80">Rotas Disponíveis</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalPois}</div>
              <div className="text-sm opacity-80">Pontos de Interesse</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(totalDuration / 60)}h</div>
              <div className="text-sm opacity-80">Tempo Total</div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funcionam as Rotas */}
      <section className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Como Funcionam Nossas Rotas Inteligentes</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Escolha Seus Interesses</h3>
            <p className="text-gray-600 text-sm">Selecione categorias que mais te interessam: história, natureza, gastronomia</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">IA Personaliza</h3>
            <p className="text-gray-600 text-sm">Nossa inteligência artificial cria a rota perfeita para você</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Navigation className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Navegação GPS</h3>
            <p className="text-gray-600 text-sm">Siga as direções turn-by-turn diretamente no app</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Ganhe Pontos</h3>
            <p className="text-gray-600 text-sm">Complete rotas e ganhe badges especiais</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4 text-center">💡 Dicas para Aproveitar Melhor</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Baixe mapas offline para usar sem internet</span>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Verifique horários de funcionamento dos locais</span>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Leve água e protetor solar para rotas ao ar livre</span>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Tire fotos nos pontos para ganhar pontos extras</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Rotas */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🚀 Escolha Sua Aventura</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* Call to Action para IA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">🤖 Quer Uma Rota Personalizada?</h2>
        <p className="text-xl mb-6 opacity-90">
          Deixe nossa IA criar o roteiro perfeito baseado no seu tempo e interesses!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/itinerary"
            className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Criar Rota com IA
          </Link>
          <Link
            to="/map"
            className="border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Map className="w-5 h-5" />
            Ver Mapa Interativo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RoutesPage;
