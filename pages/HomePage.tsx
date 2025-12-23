import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Trophy, Users, Map, Calendar, Camera,
  Navigation, Coffee, Star, TrendingUp, Sparkles,
  ArrowRight, Play, ChevronRight, Heart, Brain,
  Route, MessageCircle, Clock, MapPin, Send, ChevronDown,
  Utensils, Award, CheckCircle, Target, Zap
} from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { useAuth } from '../context/AuthContext';
import { backendService } from '../services/backendService';

const HomePage: React.FC = () => {
    const { currentUser } = useGamification();
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalVisitors: 0,
        totalAttractions: 0,
        totalRoutes: 0,
        averageRating: 0
    });
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeGalleryTab, setActiveGalleryTab] = useState('all');
    const [aiMessage, setAiMessage] = useState('');

    // Real news data about Caçapava do Sul tourism 2025
    const newsData = [
        {
            id: '1',
            title: 'Geoparque Caçapava é destaque em ranking mundial da UNESCO',
            summary: 'Reconhecimento internacional impulsiona turismo geológico, com aumento de 40% nas visitações.',
            date: '2025-08-15',
            category: 'turismo' as const,
            imageUrl: '/img/pontos_turisticos/guaritas.png',
            location: 'Geossítios'
        },
        {
            id: '2',
            title: 'Fenazeite 2025 confirma data para novembro com 35 mil visitantes',
            summary: 'A 4ª Festa Nacional do Azeite de Oliva promete ser a maior edição.',
            date: '2025-08-12',
            category: 'evento' as const,
            imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
            location: 'Centro de Eventos'
        },
        {
            id: '3',
            title: 'Prosperato conquista 97 pontos no guia Flos Olei 2025',
            summary: 'Maior pontuação já alcançada por um produtor brasileiro no prestigioso guia italiano.',
            date: '2025-08-08',
            category: 'cultura' as const,
            imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
            location: 'Prosperato Olivais'
        },
        {
            id: '4',
            title: 'Nova rota do calcário integra indústria e turismo',
            summary: 'Circuito permite conhecer as principais indústrias da capital nacional do calcário.',
            date: '2025-08-05',
            category: 'turismo' as const,
            imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
            location: 'Distrito Industrial'
        }
    ];

    // Gallery mock data
    const galleryPhotos = [
        { id: '1', imageUrl: '/img/pontos_turisticos/guaritas.png', title: 'Guaritas do Camaquã', author: 'Maria Silva', likes: 234, category: 'paisagens' },
        { id: '2', imageUrl: '/img/pontos_turisticos/CascatadoSalso.JPG', title: 'Cascata do Salso', author: 'João Santos', likes: 189, category: 'paisagens' },
        { id: '3', imageUrl: '/img/pontos_turisticos/pedradosegredo.png', title: 'Pedra do Segredo', author: 'Ana Costa', likes: 156, category: 'paisagens' },
        { id: '4', imageUrl: '/img/pontos_turisticos/forte.jpeg', title: 'Forte Dom Pedro II', author: 'Carlos Lima', likes: 142, category: 'historico' },
        { id: '5', imageUrl: '/img/pontos_turisticos/MinasCamaqua.png', title: 'Minas do Camaquã', author: 'Pedro Souza', likes: 128, category: 'historico' },
        { id: '6', imageUrl: '/img/pontos_turisticos/IgrejaMatriz.jpg', title: 'Igreja Matriz', author: 'Lucia Oliveira', likes: 98, category: 'historico' },
    ];

    // Timeline data
    const timelineData = [
        { year: '1700s', title: 'Fundação', description: 'Estabelecimento das primeiras estâncias' },
        { year: '1800s', title: 'Desenvolvimento', description: 'Crescimento com a pecuária' },
        { year: '1900s', title: 'Modernização', description: 'Industrialização e consolidação' },
        { year: 'Hoje', title: 'Turismo', description: 'Valorização do patrimônio' },
    ];

    const filteredGalleryPhotos = activeGalleryTab === 'all'
        ? galleryPhotos
        : galleryPhotos.filter(photo => photo.category === activeGalleryTab);

    useEffect(() => {
        const loadData = async () => {
            try {
                const adminStats = await backendService.getAdminStats();
                setStats({
                    totalVisitors: adminStats.totalTourists || 0,
                    totalAttractions: 12,
                    totalRoutes: adminStats.totalRoutes || 0,
                    averageRating: 4.7
                });

                const leaderboardData = await backendService.getLeaderboard();
                const formattedLeaderboard = leaderboardData.slice(0, 3).map((user, index) => ({
                    id: user.id,
                    name: user.name,
                    points: user.points,
                    visited: user.visited.length,
                    avatarUrl: user.avatarUrl,
                    badges: user.badges.map(badgeId => {
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
                setLeaderboard(formattedLeaderboard);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const getCategoryStyle = (category: string) => {
        const styles: { [key: string]: string } = {
            evento: 'bg-purple-500',
            turismo: 'bg-blue-500',
            cultura: 'bg-green-500',
            gastronomia: 'bg-orange-500'
        };
        return styles[category] || 'bg-gray-500';
    };

    const getCategoryLabel = (category: string) => {
        const labels: { [key: string]: string } = {
            evento: 'Evento',
            turismo: 'Turismo',
            cultura: 'Cultura',
            gastronomia: 'Gastronomia'
        };
        return labels[category] || category;
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden -mx-2 sm:-mx-4 -mt-4 sm:-mt-6">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/img/pontos_turisticos/guaritas.png"
                        alt="Caçapava do Sul"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-green/70 via-brand-green/50 to-brand-dark-green/80"></div>
                </div>

                {/* Decorative geometric shapes */}
                <div className="absolute top-10 left-10 w-32 h-32 border-4 border-brand-light-green/30 rotate-45 hidden lg:block"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-brand-light-green/30 rotate-12 hidden lg:block"></div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-brand-light-green/20 rounded-full hidden lg:block"></div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-wider mb-2 leading-tight">
                        EXPLORE E CONQUISTE
                    </h1>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-brand-light-green tracking-wider mb-6">
                        CAÇAPAVA DO SUL
                    </h2>

                    <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed px-4">
                        Descubra rotas personalizadas por IA, complete desafios exclusivos e
                        conecte-se com a autêntica cultura gaúcha
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                        <Link
                            to="/routes"
                            className="w-full sm:w-auto bg-brand-light-green text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-brand-green transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                        >
                            <Navigation className="h-5 w-5" />
                            Explorar Rotas
                        </Link>
                        <Link
                            to="/attractions"
                            className="w-full sm:w-auto bg-white text-brand-green font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-beige transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                        >
                            <MapPin className="h-5 w-5" />
                            Ver Atrações
                        </Link>
                        <Link
                            to="/itinerary"
                            className="w-full sm:w-auto border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-brand-green transition-all duration-300 flex items-center gap-2"
                        >
                            <Brain className="h-5 w-5" />
                            Roteiro com IA
                        </Link>
                    </div>
                </div>
            </section>

            {/* Últimas Novidades Section */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        {/* Left: Title and News */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">📰</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Últimas Novidades</h2>
                            </div>
                            <p className="text-gray-600 mb-6">Fique por dentro do que acontece em Caçapava</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {newsData.map((news, index) => (
                                    <div
                                        key={news.id}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100"
                                    >
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={news.imageUrl}
                                                alt={news.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className={`absolute top-3 left-3 ${getCategoryStyle(news.category)} text-white px-2 py-1 rounded text-xs font-medium`}>
                                                {getCategoryLabel(news.category)}
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="text-xs text-gray-500 mb-2">
                                                {new Date(news.date).toLocaleDateString('pt-BR')}
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2 group-hover:text-brand-green transition-colors">
                                                {news.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs line-clamp-2">
                                                {news.summary}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Visite CAÇAPAVA Badge */}
                        <div className="lg:w-72 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
                                <img
                                    src="/img/logo/VisiteCacapavaSimbolo.png"
                                    alt="Visite Caçapava"
                                    className="w-24 h-24 mx-auto mb-4 object-contain"
                                />
                                <h3 className="font-display text-xl text-brand-dark-green tracking-wide">VISITE</h3>
                                <h4 className="font-display text-2xl text-brand-green tracking-wider">CAÇAPAVA</h4>
                                <p className="text-xs text-gray-500 mt-2">Turismo Sustentável</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Section */}
            <section className="py-12 md:py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <Brain className="h-6 w-6 text-brand-green" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Inteligência Artificial</h2>
                    </div>
                    <p className="text-gray-600 mb-8">Sua assistente AI é ativada por comando</p>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Left: Features */}
                            <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle className="h-4 w-4 text-brand-green" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Informações de cidade</h4>
                                            <p className="text-sm text-gray-500">Conheça a história e cultura local</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle className="h-4 w-4 text-brand-green" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">IA cria roteiros e itinerários baseados no seu perfil</h4>
                                            <p className="text-sm text-gray-500">Personalizado para você</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle className="h-4 w-4 text-brand-green" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Recomendações inteligentes</h4>
                                            <p className="text-sm text-gray-500">Sugestões baseadas nos seus interesses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Chat Preview */}
                            <div className="p-6 md:p-8 bg-gray-50">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                                            <Brain className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                                            <p className="text-sm text-gray-700">Olá! Como posso ajudar você a planejar sua visita a Caçapava do Sul?</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 justify-end">
                                        <div className="bg-brand-green text-white rounded-lg p-3 shadow-sm max-w-[80%]">
                                            <p className="text-sm">Quais são os melhores pontos turísticos?</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                                            <Brain className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                                            <p className="text-sm text-gray-700">Recomendo começar pela Pedra do Segredo e as Guaritas do Camaquã! 🏔️</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/itinerary"
                                    className="mt-6 w-full bg-brand-green text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-dark-green transition-colors flex items-center justify-center gap-2"
                                >
                                    <Zap className="h-4 w-4" />
                                    Experimentar
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/leaderboard" className="text-brand-green font-medium hover:text-brand-dark-green inline-flex items-center gap-1">
                            Ver ranking completo <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Leaderboard Section */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ranking de Exploradores</h2>
                        <p className="text-gray-600">Os turistas que mais exploraram nossa cidade</p>
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-600">Carregando ranking...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {leaderboard.map((userItem, index) => (
                                <div
                                    key={userItem.id}
                                    className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                                        index === 0
                                            ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50'
                                            : index === 1
                                            ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50'
                                            : 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">
                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                        </div>
                                        <div className="relative inline-block mb-3">
                                            <img
                                                src={userItem.avatarUrl}
                                                alt={userItem.name}
                                                className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                                            />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-1">{userItem.name}</h3>
                                        <div className={`text-2xl font-bold mb-2 ${
                                            index === 0 ? 'text-yellow-600' : index === 1 ? 'text-gray-600' : 'text-amber-600'
                                        }`}>
                                            {userItem.points}
                                        </div>
                                        <p className="text-sm text-gray-500">Pontos • {userItem.visited} visitas</p>
                                        <p className="text-xs text-gray-400 mt-2">Ativo {userItem.lastActivity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Main Attractions Section with Full-Width Image */}
            <section className="relative py-0 -mx-2 sm:-mx-4">
                {/* Background Image */}
                <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                    <img
                        src="/img/pontos_turisticos/CascatadoSalso.JPG"
                        alt="Cascata do Salso"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="text-white">
                                    <span className="inline-block bg-brand-green px-3 py-1 rounded text-sm font-medium mb-4">
                                        Principais Atrações
                                    </span>
                                    <p className="text-white/80 text-sm mb-6">
                                        Descubra os lugares mais incríveis de toda a região
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md ml-auto">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Cascata do Salso</h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Uma das mais belas cachoeiras do Rio Grande do Sul, localizada em meio a formações rochosas milenares. Com mais de 30 metros de altura, oferece uma experiência única de contato com a natureza.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">📸 Fotogênico</span>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">🥾 Trilha leve</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            to="/attractions"
                                            className="bg-brand-green text-white font-semibold py-2 px-6 rounded-lg hover:bg-brand-dark-green transition-colors"
                                        >
                                            Saiba Mais
                                        </Link>
                                        <span className="text-sm text-gray-500">Ver no mapa →</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Gallery Section */}
            <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-brand-dark-green to-brand-green relative overflow-hidden">
                {/* Decorative vertical text */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block">
                    <span className="text-white/10 font-display text-6xl tracking-widest writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        GALERIA DA COMUNIDADE
                    </span>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="text-center text-white mb-8">
                        <p className="text-brand-light-green text-sm mb-2">Buscar um local recente ou divertido...</p>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                            {[
                                { id: 'all', label: '🏷️ Todos', icon: null },
                                { id: 'paisagens', label: '🏔️ Paisagens', icon: null },
                                { id: 'gastronomia', label: '🍽️ Gastronomia', icon: null },
                                { id: 'historico', label: '🏛️ Histórico', icon: null },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveGalleryTab(tab.id)}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                        activeGalleryTab === tab.id
                                            ? 'bg-white text-brand-green'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {filteredGalleryPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={photo.imageUrl}
                                        alt={photo.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                        <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                                        <span className="text-xs font-medium">{photo.likes}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-semibold text-gray-900 mb-1">{photo.title}</h4>
                                    <p className="text-sm text-gray-500">Por {photo.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-2 bg-white text-brand-green font-semibold py-3 px-8 rounded-lg hover:bg-brand-beige transition-colors"
                        >
                            Ver galeria completa
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-12 md:py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <img
                            src="/img/logo/VisiteCacapavaSimbolo.png"
                            alt="Visite Caçapava"
                            className="h-16 mx-auto mb-4"
                        />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ações de Caçapava do Sul</h2>
                    </div>

                    <div className="bg-brand-beige rounded-2xl p-6 md:p-8 mb-8">
                        <h3 className="font-bold text-gray-900 mb-2">Atividades no Período</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Dados compilados sobre o turismo e visitação na região de Caçapava do Sul
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            {['Por Nenhum', '1º Lugar Mundial', 'Eco Turismo', 'Gera Mais de 95%'].map((tag, i) => (
                                <span key={i} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="text-5xl md:text-6xl font-bold text-brand-green mb-2">97</div>
                            <p className="text-gray-600">Pontos em premiação internacional</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="text-5xl md:text-6xl font-bold text-brand-green mb-2">5</div>
                            <p className="text-gray-600">Geossítios de nível mundial</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="text-5xl md:text-6xl font-bold text-brand-green mb-2">70%</div>
                            <p className="text-gray-600">Crescimento no turismo local</p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <button className="border-2 border-brand-green text-brand-green font-semibold py-3 px-8 rounded-lg hover:bg-brand-green hover:text-white transition-colors">
                            Confira nossas atividades
                        </button>
                    </div>
                </div>
            </section>

            {/* History and Culture Timeline */}
            <section className="py-12 md:py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <img
                            src="/img/logo/VisiteCacapavaSimbolo.png"
                            alt="Visite Caçapava"
                            className="h-12 mx-auto mb-4"
                        />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">História e Cultura</h2>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-center text-gray-900 mb-8">Linha do Tempo</h3>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-brand-green/30"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {timelineData.map((item, index) => (
                                    <div key={index} className="relative text-center">
                                        {/* Timeline dot */}
                                        <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-brand-green rounded-full border-4 border-white shadow-lg z-10"></div>

                                        <div className="md:pt-16">
                                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                                                <div className="inline-block bg-brand-green text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                                                    {item.year}
                                                </div>
                                                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cultural Highlights */}
                    <div className="bg-brand-beige/50 rounded-2xl p-6 md:p-8">
                        <h3 className="font-bold text-gray-900 mb-4">Importância Regional</h3>
                        <p className="text-gray-600 mb-6">
                            Caçapava do Sul é um dos principais destinos turísticos da região sul, reconhecida pela UNESCO como Geoparque Mundial.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 text-center">
                                <Users className="h-8 w-8 text-brand-green mx-auto mb-2" />
                                <h4 className="font-semibold text-gray-900">Tradição Gaúcha</h4>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <MapPin className="h-8 w-8 text-brand-green mx-auto mb-2" />
                                <h4 className="font-semibold text-gray-900">Patrimônio Histórico</h4>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <Calendar className="h-8 w-8 text-brand-green mx-auto mb-2" />
                                <h4 className="font-semibold text-gray-900">Festivais</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plan Your Visit Section */}
            <section className="py-12 md:py-16 px-4 bg-brand-dark-green text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Planeje sua visita</h2>
                        <p className="text-brand-beige">Tudo o que você precisa para uma experiência completa</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            to="/routes"
                            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-brand-light-green rounded-2xl flex items-center justify-center mb-4">
                                <Route className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Rotas Inteligentes</h3>
                            <p className="text-white/80 text-sm mb-4">
                                Deixe nossa IA criar o roteiro perfeito baseado no seu tempo, interesses e localização atual.
                            </p>
                            <span className="text-brand-light-green font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Planejar roteiro <ChevronRight className="h-4 w-4" />
                            </span>
                        </Link>

                        <Link
                            to="/restaurants"
                            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4">
                                <Utensils className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Gastronomia Local</h3>
                            <p className="text-white/80 text-sm mb-4">
                                Descubra sabores únicos, restaurantes tradicionais e produtos locais premiados internacionalmente.
                            </p>
                            <span className="text-orange-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Explorar sabores <ChevronRight className="h-4 w-4" />
                            </span>
                        </Link>

                        <Link
                            to="/about"
                            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Guias de Comunidade</h3>
                            <p className="text-white/80 text-sm mb-4">
                                Conecte-se com guias locais certificados que conhecem cada cantinho da região.
                            </p>
                            <span className="text-purple-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Conhecer guias <ChevronRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Interactive Resources Section */}
            <section className="py-12 md:py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Recursos Interativos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="bg-brand-green/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                                <Navigation className="h-10 w-10 text-brand-green group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">GPS Integrado</h3>
                            <p className="text-gray-600 text-sm">Navegação em tempo real para todos os pontos de interesse</p>
                        </div>

                        <div className="text-center group">
                            <div className="bg-brand-green/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                                <Trophy className="h-10 w-10 text-brand-green group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Sistema de Conquistas</h3>
                            <p className="text-gray-600 text-sm">Colete badges, acumule pontos e desbloqueie recompensas especiais</p>
                        </div>

                        <div className="text-center group">
                            <div className="bg-brand-green/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                                <Camera className="h-10 w-10 text-brand-green group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Check-in Visual</h3>
                            <p className="text-gray-600 text-sm">Registre sua visita com fotos e compartilhe suas experiências</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative py-16 md:py-24 px-4 -mx-2 sm:-mx-4 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-green to-brand-light-green">
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>
                    {/* Geometric shapes */}
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-light-green/20 rounded-tr-full"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-dark-green/20 rounded-bl-full"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider mb-2">
                        PRONTO PARA
                    </h2>
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider mb-6">
                        SUA AVENTURA?
                    </h3>

                    <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Junte-se a centenas de exploradores que já descobriram os segredos de Caçapava do Sul
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link
                                to="/routes"
                                className="bg-white text-brand-green font-bold py-4 px-8 rounded-lg text-lg hover:bg-brand-beige transition-colors flex items-center justify-center gap-2"
                            >
                                <Compass className="h-5 w-5" />
                                Continuar Explorando
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-white text-brand-green font-bold py-4 px-8 rounded-lg text-lg hover:bg-brand-beige transition-colors flex items-center justify-center gap-2"
                            >
                                <Users className="h-5 w-5" />
                                Criar Conta Gratuita
                            </Link>
                        )}

                        <Link
                            to="/about"
                            className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-brand-green transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Calendar className="h-5 w-5" />
                            Conhecer a Cidade
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
