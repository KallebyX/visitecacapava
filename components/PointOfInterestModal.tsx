import React, { useState, useEffect } from 'react';
import type { PointOfInterest, Badge } from '../types';
import { useGamification } from '../context/GamificationContext';
import { X, CheckCircle, Info, MessageSquare, Send, Bot, Star, Trophy, Navigation } from 'lucide-react';
import { askAIGuideStream } from '../services/geminiService';
import { formatNavigationButtons } from '../utils/navigationUtils';

interface PointOfInterestModalProps {
  poi: PointOfInterest;
  onClose: () => void;
}

const PointOfInterestModal: React.FC<PointOfInterestModalProps> = ({ poi, onClose }) => {
  const { checkIn, getVisitedIds } = useGamification();
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);

  const isVisited = getVisitedIds().has(poi.id);

  const handleNavigation = () => {
    const links = formatNavigationButtons(poi.lat, poi.lng, poi.name);
    
    if (navigator.userAgent.includes('Mobile')) {
      window.open(links.waze, '_blank');
    } else {
      const userChoice = confirm(`Navegar para ${poi.name}?\n\nOK = Waze | Cancelar = Google Maps`);
      if (userChoice) {
        window.open(links.waze, '_blank');
      } else {
        window.open(links.googleMaps, '_blank');
      }
    }
  };

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    const result = await checkIn(poi.id);
    setNotification({ type: result.success ? 'success' : 'info', message: result.message });
    if(result.success) {
      setNewBadges(result.newBadges);
    }
    setIsCheckingIn(false);
  };
  
  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || isAiLoading) return;
    
    setIsAiLoading(true);
    setAiResponse('');
    
    try {
      const stream = await askAIGuideStream(poi.name, aiQuestion);
      for await (const chunk of stream) {
        setAiResponse(prev => prev + chunk.text);
      }
    } catch (error) {
      setAiResponse("Desculpe, não consegui obter uma resposta. Tente novamente.");
    } finally {
      setIsAiLoading(false);
      setAiQuestion('');
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-brand-beige rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
        <div className="w-full md:w-1/2">
          <img src={poi.imageUrl} alt={poi.name} className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-brand-dark-green">
            <X size={24} />
          </button>
          
          <h2 className="text-3xl font-bold mb-2">{poi.name}</h2>
          <span className="font-semibold text-brand-green mb-4">{poi.points} pontos</span>
          
          <p className="text-gray-700 mb-4 flex-grow">{poi.longDescription}</p>

          {!showAiChat && (
            <>
              {notification && (
                <div className={`p-3 rounded-lg mb-4 flex items-center gap-3 text-white ${notification.type === 'success' ? 'bg-brand-green' : 'bg-yellow-500'}`}>
                  {notification.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
                  <span>{notification.message}</span>
                </div>
              )}
              {newBadges.length > 0 && (
                <div className="p-3 rounded-lg mb-4 bg-brand-light-green text-white">
                  <h4 className="font-bold flex items-center gap-2"><Trophy size={20}/>Novas Conquistas!</h4>
                  {newBadges.map(b => <p key={b.id} className="text-sm">- {b.name}</p>)}
                </div>
              )}

              <div className="mt-auto space-y-3">
                <button
                  onClick={handleNavigation}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Navigation size={20} />
                  Como Chegar
                </button>
                 <button 
                  onClick={handleCheckIn} 
                  disabled={isVisited || isCheckingIn}
                  className="w-full bg-brand-green text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-brand-dark-green transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                 >
                  {isCheckingIn ? 'Processando...' : (isVisited ? <><CheckCircle size={20} /> Já Visitado</> : <><Star size={20} /> Fazer Check-in (Simula QR Code)</>)}
                </button>
                <button onClick={() => setShowAiChat(true)} className="w-full bg-brand-dark-green text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-80 transition-colors">
                  <MessageSquare size={20}/> Perguntar ao Guia IA
                </button>
              </div>
            </>
          )}

          {showAiChat && (
            <div className="flex flex-col h-full bg-white/70 rounded-lg p-4 -m-2 mt-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg flex items-center gap-2"><Bot size={20} />Guia de IA</h3>
                <button onClick={() => setShowAiChat(false)} className="text-sm text-gray-600 hover:underline">Voltar</button>
              </div>
              <div className="flex-grow bg-gray-100 rounded-lg p-3 overflow-y-auto mb-2 min-h-[150px]">
                {aiResponse ? <p className="text-sm whitespace-pre-wrap">{aiResponse}</p> : <p className="text-sm text-gray-500">Faça uma pergunta sobre {poi.name}...</p>}
                {isAiLoading && <div className="animate-pulse text-sm text-gray-500">...pensando</div>}
              </div>
              <form onSubmit={handleAskAI} className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={e => setAiQuestion(e.target.value)}
                  placeholder="Qual a melhor hora para visitar?"
                  className="flex-grow p-2 border rounded-full text-sm focus:ring-brand-green focus:border-brand-green"
                />
                <button type="submit" disabled={isAiLoading} className="bg-brand-green text-white rounded-full p-2 hover:bg-brand-dark-green disabled:bg-gray-400">
                  <Send size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointOfInterestModal;
