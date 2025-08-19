import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Sun, Feather, ChevronsRight, Loader, RotateCcw, MapPin, Clock, Star, Users, Calendar, Heart, Download, Share2, Wand2, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { generateItinerary } from '../services/geminiService';

const interestOptions = ["Natureza", "História", "Gastronomia", "Aventura", "Cultura Local"];
const loadingMessages = [
    "Consultando nosso especialista em Caçapava...",
    "Analisando as melhores paisagens...",
    "Montando seu dia perfeito...",
    "Adicionando um toque de magia...",
    "Quase pronto!"
];

const ItineraryPage: React.FC = () => {
    const [duration, setDuration] = useState('1');
    const [interests, setInterests] = useState<Set<string>>(new Set());
    const [pace, setPace] = useState('Moderado');
    const [notes, setNotes] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [itinerary, setItinerary] = useState('');
    const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);

    const handleInterestToggle = (interest: string) => {
        const newInterests = new Set(interests);
        if (newInterests.has(interest)) {
            newInterests.delete(interest);
        } else {
            newInterests.add(interest);
        }
        setInterests(newInterests);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (interests.size === 0) {
            setError('Por favor, selecione pelo menos um interesse.');
            return;
        }
        setError('');
        setLoading(true);
        setItinerary('');

        const messageInterval = setInterval(() => {
            setCurrentLoadingMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                return loadingMessages[(currentIndex + 1) % loadingMessages.length];
            });
        }, 2500);

        try {
            const preferences = {
                duration: `${duration} dia(s)`,
                interests: Array.from(interests),
                pace,
                notes,
            };
            const result = await generateItinerary(preferences);
            setItinerary(result);
        } catch (err) {
            setError('Ocorreu um erro ao gerar o roteiro. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
            clearInterval(messageInterval);
        }
    };

    const handleReset = () => {
        setItinerary('');
        setDuration('1');
        setInterests(new Set());
        setPace('Moderado');
        setNotes('');
        setError('');
    };
    
    const renderContent = () => {
        if (loading) {
            return (
                 <div className="text-center p-8 bg-white/50 rounded-2xl">
                    <Loader className="w-16 h-16 mx-auto text-brand-green animate-spin mb-6" />
                    <h2 className="text-2xl font-bold text-brand-dark-green mb-2">Criando seu Roteiro...</h2>
                    <p className="text-gray-600 transition-opacity duration-500">{currentLoadingMessage}</p>
                </div>
            )
        }
        
        if (itinerary) {
            return (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-dark-green">Seu Roteiro Personalizado</h2>
                            <p className="text-gray-600">Uma aventura única, criada especialmente para você!</p>
                        </div>
                        <button onClick={handleReset} className="flex items-center gap-2 bg-brand-beige text-brand-dark-green font-semibold py-2 px-4 rounded-full hover:bg-brand-light-green/20 transition-colors">
                            <RotateCcw size={18} />
                            Criar Novo
                        </button>
                    </div>
                    <div className="prose max-w-none text-gray-800 whitespace-pre-wrap font-sans">
                        {itinerary}
                    </div>
                </div>
            )
        }
        
        return (
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="text-lg font-semibold block mb-2">1. Duração da Viagem</label>
                    <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-lg">
                        <option value="1">1 Dia</option>
                        <option value="2">2 Dias</option>
                        <option value="3">3 Dias</option>
                    </select>
                </div>
                <div>
                    <label className="text-lg font-semibold block mb-3">2. Seus Interesses</label>
                    <div className="flex flex-wrap gap-3">
                        {interestOptions.map(interest => (
                            <button
                                key={interest}
                                type="button"
                                onClick={() => handleInterestToggle(interest)}
                                className={`py-2 px-4 rounded-full font-medium transition-all duration-200 border-2 ${interests.has(interest) ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700 border-gray-300 hover:border-brand-green'}`}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-lg font-semibold block mb-3">3. Ritmo da Viagem</label>
                    <div className="grid grid-cols-3 gap-4">
                        {['Relaxado', 'Moderado', 'Intenso'].map(p => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPace(p)}
                                className={`p-4 rounded-lg text-center border-2 transition-all duration-200 ${pace === p ? 'bg-brand-green text-white border-brand-green' : 'bg-white hover:border-brand-green'}`}
                            >
                                <span className="text-4xl mb-2 block">{p === 'Relaxado' ? <Feather className="mx-auto" /> : p === 'Moderado' ? <Sun className="mx-auto" /> : <ChevronsRight className="mx-auto" />}</span>
                                <span className="font-semibold">{p}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="notes" className="text-lg font-semibold block mb-2">4. Informações Adicionais (opcional)</label>
                    <textarea 
                        id="notes" 
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Ex: Viajando com crianças, prefiro caminhadas leves, tenho pouco tempo pela manhã..." 
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg h-24"
                    />
                </div>

                {error && <p className="text-brand-red text-center">{error}</p>}
                
                <button type="submit" disabled={loading} className="w-full bg-brand-dark-green text-white font-bold text-lg py-4 px-6 rounded-full flex items-center justify-center gap-3 hover:bg-brand-green transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100">
                    <Sparkles size={24} />
                    Gerar Roteiro Mágico
                </button>
            </form>
        )
    };

    return (
        <div>
            {!itinerary && (
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-display text-brand-dark-green mb-2 flex items-center justify-center gap-3"><Bot/>Crie seu Roteiro Personalizado com IA</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Diga-nos o que você gosta e nosso guia de IA montará o plano perfeito para sua visita a Caçapava do Sul.
                    </p>
                </div>
            )}
            <div className="max-w-3xl mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default ItineraryPage;
