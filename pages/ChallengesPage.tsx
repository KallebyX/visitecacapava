import React, { useState, useEffect } from 'react';
import { backendService } from '../services/backendService';
import { Challenge } from '../types';
import { Award, Calendar, Flag, Target, Zap, Trophy, Star, Gift, MapPin, Camera, Clock, Users } from 'lucide-react';

const ChallengesPage: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backendService.getChallenges().then(data => {
            setChallenges(data);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando desafios...</p>
          </div>
        </div>
    );

    const upcomingEvents = challenges.filter(c => c.type === 'event' && c.startDate && new Date(c.startDate) > new Date());
    const activeChallenges = challenges.filter(c => c.type === 'challenge');

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl overflow-hidden py-16 px-8 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 opacity-20">
                    <Target className="w-32 h-32" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-20">
                    <Trophy className="w-24 h-24" />
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 rounded-full p-4">
                            <Flag className="w-12 h-12" />
                        </div>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">🎯 Centro de Desafios</h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Teste suas habilidades e ganhe recompensas exclusivas
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                            <Award className="w-8 h-8 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{activeChallenges.length}</div>
                            <div className="text-sm opacity-80">Desafios Ativos</div>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                            <Calendar className="w-8 h-8 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                            <div className="text-sm opacity-80">Eventos Futuros</div>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                            <Zap className="w-8 h-8 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{challenges.reduce((sum, c) => sum + c.points, 0)}</div>
                            <div className="text-sm opacity-80">Pontos Disponíveis</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Como Funcionam os Desafios */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Como Funcionam os Desafios</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Explore Locais</h3>
                        <p className="text-gray-600 text-sm">Visite pontos específicos para completar desafios de localização</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Capture Momentos</h3>
                        <p className="text-gray-600 text-sm">Tire fotos especiais para desafios de fotografia</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <Clock className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Desafios Temporais</h3>
                        <p className="text-gray-600 text-sm">Complete missões dentro do prazo para bônus extra</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <Gift className="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Ganhe Recompensas</h3>
                        <p className="text-gray-600 text-sm">Receba pontos, badges e prêmios especiais</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                    <h3 className="font-bold text-xl mb-4 text-center">💡 Dicas para Maximizar Pontos</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Complete desafios em sequência para combos de pontos</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Participe de eventos especiais para multiplicadores</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Convide amigos para desafios em equipe</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Complete desafios sazonais para recompensas únicas</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eventos Futuros */}
            {upcomingEvents.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <Calendar className="mr-3 text-indigo-500" /> 
                        🗓️ Próximos Eventos Especiais
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-indigo-800">{event.title}</h3>
                                    <div className="bg-indigo-100 rounded-full p-2">
                                        <Calendar className="w-5 h-5 text-indigo-600" />
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Award className="w-5 h-5 text-amber-500 mr-2" />
                                        <span className="font-bold text-amber-600">{event.points} Pontos</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Início em</div>
                                        <div className="font-medium text-indigo-600">
                                            {new Date(event.startDate!).toLocaleDateString('pt-BR')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Desafios Ativos */}
            <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Flag className="mr-3 text-green-500" /> 
                    ⚡ Desafios Ativos
                </h2>
                <div className="space-y-4">
                    {activeChallenges.map(challenge => (
                        <div key={challenge.id} className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-green-100 rounded-full p-2">
                                            <Target className="w-5 h-5 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-green-800">{challenge.title}</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
                                </div>
                                <div className="flex flex-col items-center md:items-end gap-2">
                                    <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full">
                                        <Award className="w-5 h-5 mr-2" />
                                        <span className="font-bold text-lg">{challenge.points}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">Pontos</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">🚀 Pronto para o Desafio?</h2>
                <p className="text-xl mb-6 opacity-90">
                    Comece sua jornada e desbloqueie todos os segredos de Caçapava do Sul!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-green-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <Users className="w-5 h-5" />
                        Ver Meu Progresso
                    </button>
                    <button className="border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Começar Exploração
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ChallengesPage;
