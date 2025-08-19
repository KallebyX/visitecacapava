
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Trophy, Users } from 'lucide-react';
import MapOutlineIcon from '../components/MapOutlineIcon';
import { useGamification } from '../context/GamificationContext';
import RouteCard from '../components/RouteCard';
import type { Route } from '../types';
import { backendService } from '../services/backendService';

const HomePage: React.FC = () => {
    const { currentUser } = useGamification();
    const [featuredRoutes, setFeaturedRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backendService.getRoutes().then(data => {
            setFeaturedRoutes(data.slice(0, 2));
            setLoading(false);
        }).catch(err => {
            console.error("Failed to fetch featured routes:", err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative text-center bg-brand-dark-green text-white rounded-3xl overflow-hidden py-20 px-4">
                <div className="absolute inset-0 opacity-10 text-brand-green">
                    <MapOutlineIcon className="w-full h-full" />
                </div>
                <div className="relative z-10">
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider">Explore. Conquiste.</h1>
                    <h2 className="font-black text-4xl md:text-6xl lg:text-7xl -mt-2 text-brand-light-green">Caçapava do Sul</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-beige">
                        Transforme sua visita em uma aventura inesquecível. Descubra rotas, complete desafios e ganhe recompensas!
                    </p>
                    <Link
                        to="/routes"
                        className="mt-8 inline-block bg-brand-light-green text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-green transition-transform transform hover:scale-105"
                    >
                        Começar a Explorar
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-white/50 p-6 rounded-2xl shadow-sm">
                    <Compass className="w-12 h-12 mx-auto text-brand-green" />
                    <h3 className="font-bold text-xl mt-4">Rotas Temáticas</h3>
                    <p className="mt-2 text-gray-600">Siga roteiros criados para todos os gostos: natureza, história, gastronomia e mais.</p>
                </div>
                <div className="bg-white/50 p-6 rounded-2xl shadow-sm">
                    <Trophy className="w-12 h-12 mx-auto text-brand-green" />
                    <h3 className="font-bold text-xl mt-4">Ganhe Pontos e Badges</h3>
                    <p className="mt-2 text-gray-600">Faça check-in nos locais, complete desafios e colecione conquistas exclusivas.</p>
                </div>
                <div className="bg-white/50 p-6 rounded-2xl shadow-sm">
                    <Users className="w-12 h-12 mx-auto text-brand-green" />
                    <h3 className="font-bold text-xl mt-4">Compita no Ranking</h3>
                    <p className="mt-2 text-gray-600">Veja sua posição no ranking de exploradores e desafie seus amigos.</p>
                </div>
            </section>
            
            {/* Quick Access Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">O que você gostaria de fazer?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        to="/attractions"
                        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <div className="text-4xl mb-3">🏔️</div>
                        <h3 className="text-xl font-bold mb-2">Pontos Turísticos</h3>
                        <p className="text-blue-100">Descubra as belezas naturais e patrimônios históricos</p>
                    </Link>
                    
                    <Link
                        to="/restaurants"
                        className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <div className="text-4xl mb-3">🍽️</div>
                        <h3 className="text-xl font-bold mb-2">Restaurantes</h3>
                        <p className="text-orange-100">Saboreie a gastronomia local e avalie sua experiência</p>
                    </Link>
                    
                    <Link
                        to="/olive-oils"
                        className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <div className="text-4xl mb-3">🫒</div>
                        <h3 className="text-xl font-bold mb-2">Azeites Premiados</h3>
                        <p className="text-yellow-100">Conheça os azeites que conquistaram o mundo</p>
                    </Link>
                </div>
            </section>
            
            {/* Featured Routes Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Rotas em Destaque</h2>
                {loading ? (
                    <div className="text-center text-gray-600">Carregando rotas...</div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredRoutes.map(route => (
                            <RouteCard key={route.id} route={route} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default HomePage;