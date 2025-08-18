import React, { useState, useEffect } from 'react';
import { backendService } from '../services/backendService';
import { Challenge } from '../types';
import { Award, Calendar, Flag } from 'lucide-react';

const ChallengesPage: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backendService.getChallenges().then(data => {
            setChallenges(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center mt-8">Carregando desafios...</p>;

    const upcomingEvents = challenges.filter(c => c.type === 'event' && c.startDate && new Date(c.startDate) > new Date());
    const activeChallenges = challenges.filter(c => c.type === 'challenge');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Desafios e Eventos</h1>
                <p className="text-slate-600 mt-1">Participe para ganhar pontos e novas conquistas!</p>
            </div>

            {/* Eventos Futuros */}
            {upcomingEvents.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center"><Calendar className="mr-3 text-indigo-500" /> Próximos Eventos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="bg-white p-5 rounded-lg shadow-sm border border-indigo-200">
                                <h3 className="text-xl font-bold text-indigo-800">{event.title}</h3>
                                <p className="text-slate-600 my-2">{event.description}</p>
                                <div className="flex justify-between items-center mt-4 text-sm">
                                    <span className="font-semibold text-amber-600 flex items-center"><Award className="mr-1 h-4 w-4" /> {event.points} Pontos</span>
                                    <span className="font-medium text-slate-500 flex items-center"><Calendar className="mr-1 h-4 w-4" /> {new Date(event.startDate!).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Desafios Ativos */}
            <section>
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center"><Flag className="mr-3 text-green-500" /> Desafios Ativos</h2>
                <div className="space-y-4">
                    {activeChallenges.map(challenge => (
                        <div key={challenge.id} className="bg-white p-5 rounded-lg shadow-sm border flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-green-800">{challenge.title}</h3>
                                <p className="text-slate-600">{challenge.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-2xl text-amber-600 flex items-center">
                                    <Award className="mr-2 h-6 w-6" /> {challenge.points}
                                </span>
                                <span className="text-sm text-slate-500">Pontos</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ChallengesPage;
