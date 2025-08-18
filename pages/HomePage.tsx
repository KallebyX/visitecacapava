
import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Trophy, Users } from 'lucide-react';
import MapOutlineIcon from '../components/MapOutlineIcon';
import { useGamification } from '../context/GamificationContext';
import { ROUTES } from '../constants';
import RouteCard from '../components/RouteCard';

const HomePage: React.FC = () => {
    const { currentUser } = useGamification();

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
            
            {/* Featured Routes Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Rotas em Destaque</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {ROUTES.slice(0, 2).map(route => (
                        <RouteCard key={route.id} route={route} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
