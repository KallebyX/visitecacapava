
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Trophy, Users, Map, Calendar, Camera, 
  Navigation, Coffee, Star, TrendingUp, Sparkles,
  ArrowRight, Play, ChevronRight, Heart
} from 'lucide-react';
import MapOutlineIcon from '../components/MapOutlineIcon';
import { useGamification } from '../context/GamificationContext';
import { useAuth } from '../context/AuthContext';
import { backendService } from '../services/backendService';

// Import new components
import NewsCard from '../components/NewsCard';
import LeaderboardCard from '../components/LeaderboardCard';
import AIFeatureCard from '../components/AIFeatureCard';
import OliveOilShowcase from '../components/OliveOilShowcase';
import HistoryCultureSection from '../components/HistoryCultureSection';
import AttractionsCarousel from '../components/AttractionsCarousel';

const HomePage: React.FC = () => {
    const { currentUser } = useGamification();
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalVisitors: 0,
        totalAttractions: 0,
        totalRoutes: 0,
        averageRating: 0
    });
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    // Real news data about Caçapava do Sul tourism 2025
    const newsData = [
        {
            id: '1',
            title: 'Fenazeite 2025 confirma data para novembro com expectativa de 35 mil visitantes',
            summary: 'A 4ª Festa Nacional do Azeite de Oliva promete ser a maior edição, com degustações dos azeites premiados da Prosperato e outros produtores locais.',
            date: '2025-08-15',
            category: 'evento' as const,
            imageUrl: 'https://images.unsplash.com/photo-1596040033229-a65c0cd87c14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Centro de Eventos'
        },
        {
            id: '2',
            title: 'Geoparque Caçapava é destaque em ranking mundial da UNESCO',
            summary: 'Reconhecimento internacional impulsiona turismo geológico, com aumento de 40% nas visitações às Guaritas do Camaquã e Pedra do Segredo.',
            date: '2025-08-12',
            category: 'turismo' as const,
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Geossítios'
        },
        {
            id: '3',
            title: 'Prosperato conquista 97 pontos no guia Flos Olei 2025',
            summary: 'Azeite de Caçapava do Sul recebe a maior pontuação já alcançada por um produtor brasileiro no prestigioso guia italiano.',
            date: '2025-08-08',
            category: 'cultura' as const,
            imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Prosperato Olivais'
        },
        {
            id: '4',
            title: 'Nova rota do calcário integra indústria e turismo',
            summary: 'Circuito permite conhecer as principais indústrias da capital nacional do calcário, com visitas técnicas e mirantes panorâmicos.',
            date: '2025-08-05',
            category: 'turismo' as const,
            imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Distrito Industrial'
        }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load statistics
                const adminStats = await backendService.getAdminStats();
                setStats({
                    totalVisitors: adminStats.totalTourists || 0,
                    totalAttractions: 12, // From POIs count
                    totalRoutes: adminStats.totalRoutes || 0,
                    averageRating: 4.7
                });

                // Load leaderboard
                const leaderboardData = await backendService.getLeaderboard();
                const formattedLeaderboard = leaderboardData.slice(0, 5).map((user, index) => ({
                    id: user.id,
                    name: user.name,
                    points: user.points,
                    visited: user.visited.length,
                    avatarUrl: user.avatarUrl,
                    badges: user.badges.map(badgeId => {
                        // Convert badge IDs to names
                        const badgeNames: { [key: string]: string } = {
                            'badge-1': 'Explorador',
                            'badge-2': 'Aventureiro',
                            'badge-3': 'Descobridor',
                            'badge-4': 'Pioneiro'
                        };
                        return badgeNames[badgeId] || badgeId;
                    }),
                    lastActivity: 'há 2 dias',
                    rank: index + 1
                }));
                setLeaderboard(formattedLeaderboard as any);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="space-y-12">
            {/* Hero Section - Enhanced */}
            <section className="relative text-center bg-gradient-to-br from-brand-dark-green via-brand-green to-emerald-700 text-white rounded-3xl overflow-hidden py-24 px-4">
                <div className="absolute inset-0 opacity-5">
                    <MapOutlineIcon className="w-full h-full" />
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-8 left-8 bg-white/10 rounded-full p-3 animate-pulse">
                    <Sparkles className="h-6 w-6" />
                </div>
                <div className="absolute top-16 right-12 bg-white/10 rounded-full p-2 animate-bounce">
                    <Star className="h-4 w-4" />
                </div>
                <div className="absolute bottom-12 left-16 bg-white/10 rounded-full p-2 animate-pulse">
                    <Heart className="h-4 w-4" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="mb-6">
                        <span className="inline-block bg-white/20 text-brand-beige px-4 py-2 rounded-full text-sm font-medium">
                            ✨ Powered by AI • Gamificação • Sustentabilidade
                        </span>
                    </div>
                    
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4">
                        Explore. Conquiste.
                    </h1>
                    <h2 className="font-black text-4xl md:text-6xl lg:text-7xl text-brand-light-green mb-6">
                        Caçapava do Sul
                    </h2>
                    
                    <p className="text-xl text-brand-beige mb-8 max-w-3xl mx-auto leading-relaxed">
                        Transforme sua visita em uma aventura inesquecível. Descubra rotas personalizadas por IA, 
                        complete desafios exclusivos e conecte-se com a autêntica cultura gaúcha.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/routes"
                            className="bg-brand-light-green text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-brand-green transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                        >
                            <Play className="h-5 w-5" />
                            Começar Aventura
                        </Link>
                        <Link
                            to="/attractions"
                            className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-brand-green transition-all duration-300 flex items-center gap-2"
                        >
                            <Map className="h-5 w-5" />
                            Explorar Pontos
                        </Link>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{stats.totalVisitors}+</div>
                            <div className="text-sm text-brand-beige">Visitantes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{stats.totalAttractions}</div>
                            <div className="text-sm text-brand-beige">Atrações</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{stats.totalRoutes}</div>
                            <div className="text-sm text-brand-beige">Rotas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{stats.averageRating}</div>
                            <div className="text-sm text-brand-beige">Avaliação</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Últimas Novidades</h2>
                        <p className="text-gray-600 mt-1">Fique por dentro do que acontece em Caçapava</p>
                    </div>
                    <Link 
                        to="/news" 
                        className="text-brand-green font-semibold hover:text-brand-dark-green flex items-center gap-1"
                    >
                        Ver todas <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newsData.map((news, index) => (
                        <NewsCard 
                            key={news.id} 
                            news={news} 
                            featured={index === 0} 
                        />
                    ))}
                </div>
            </section>

            {/* AI Technology Section */}
            <section>
                <AIFeatureCard />
            </section>

            {/* Leaderboard Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Ranking de Exploradores</h2>
                        <p className="text-gray-600 mt-1">Os turistas que mais exploraram nossa cidade</p>
                    </div>
                    <Link 
                        to="/leaderboard" 
                        className="text-brand-green font-semibold hover:text-brand-dark-green flex items-center gap-1"
                    >
                        Ver ranking completo <TrendingUp className="h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center text-gray-600">Carregando ranking...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {leaderboard.map((user: any, index) => (
                            <LeaderboardCard 
                                key={user.id} 
                                user={user} 
                                position={index + 1} 
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Attractions Carousel */}
            <section>
                <AttractionsCarousel />
            </section>

            {/* Olive Oil Showcase */}
            <section>
                <OliveOilShowcase />
            </section>

            {/* History and Culture */}
            <section>
                <HistoryCultureSection />
            </section>

            {/* Enhanced Quick Access */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-2">Planeje sua Visita</h2>
                <p className="text-center text-gray-600 mb-12">Tudo o que você precisa para uma experiência completa</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link
                        to="/routes"
                        className="group bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                        <div className="relative z-10">
                            <div className="text-5xl mb-4">🗺️</div>
                            <h3 className="text-2xl font-bold mb-3">Rotas Inteligentes</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Deixe nossa IA criar o roteiro perfeito baseado no seu tempo, 
                                interesses e localização atual.
                            </p>
                            <div className="flex items-center text-blue-200 font-medium group-hover:text-white transition-colors">
                                Planejar roteiro <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                    
                    <Link
                        to="/restaurants"
                        className="group bg-gradient-to-br from-orange-500 to-red-500 text-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                        <div className="relative z-10">
                            <div className="text-5xl mb-4">🍽️</div>
                            <h3 className="text-2xl font-bold mb-3">Gastronomia Local</h3>
                            <p className="text-orange-100 mb-6 leading-relaxed">
                                Descubra sabores únicos, restaurantes tradicionais e 
                                produtos locais premiados internacionalmente.
                            </p>
                            <div className="flex items-center text-orange-200 font-medium group-hover:text-white transition-colors">
                                Explorar sabores <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                    
                    <Link
                        to="/photo-gallery"
                        className="group bg-gradient-to-br from-pink-500 to-purple-600 text-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                        <div className="relative z-10">
                            <div className="text-5xl mb-4">📸</div>
                            <h3 className="text-2xl font-bold mb-3">Galeria da Comunidade</h3>
                            <p className="text-pink-100 mb-6 leading-relaxed">
                                Compartilhe suas melhores fotos, descubra ângulos únicos 
                                e inspire outros visitantes.
                            </p>
                            <div className="flex items-center text-pink-200 font-medium group-hover:text-white transition-colors">
                                Ver galeria <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Interactive Features */}
            <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-center mb-12">Recursos Interativos</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center group">
                        <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <Navigation className="h-10 w-10 text-brand-green" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">GPS Integrado</h3>
                        <p className="text-gray-600">Navegação turn-by-turn para todos os pontos de interesse</p>
                    </div>
                    
                    <div className="text-center group">
                        <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <Trophy className="h-10 w-10 text-brand-green" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Sistema de Conquistas</h3>
                        <p className="text-gray-600">Ganhe badges, pontos e desbloqueie recompensas exclusivas</p>
                    </div>
                    
                    <div className="text-center group">
                        <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <Camera className="h-10 w-10 text-brand-green" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Check-in Visual</h3>
                        <p className="text-gray-600">Registre sua presença com fotos e compartilhe momentos</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center bg-brand-green rounded-3xl p-12 text-white">
                <h2 className="text-4xl font-bold mb-4">Pronto para sua aventura?</h2>
                <p className="text-xl text-brand-beige mb-8 max-w-2xl mx-auto">
                    Junte-se a centenas de exploradores que já descobriram os segredos de Caçapava do Sul
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {user ? (
                        <Link
                            to="/routes"
                            className="bg-white text-brand-green font-bold py-4 px-8 rounded-full text-lg hover:bg-brand-beige transition-colors flex items-center justify-center gap-2"
                        >
                            <Compass className="h-5 w-5" />
                            Continuar Explorando
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-brand-green font-bold py-4 px-8 rounded-full text-lg hover:bg-brand-beige transition-colors flex items-center justify-center gap-2"
                        >
                            <Users className="h-5 w-5" />
                            Criar Conta Gratuita
                        </Link>
                    )}
                    
                    <Link
                        to="/about"
                        className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-brand-green transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Calendar className="h-5 w-5" />
                        Saiba Mais Sobre a Cidade
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;