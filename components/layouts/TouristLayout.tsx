import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import { getAIChatResponse } from '../../services/geminiService';
import type { ChatMessage } from '../../types';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Trophy, Star, User, Image, BookHeart, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MapOutlineIcon from '../MapOutlineIcon';

// Defined the AI Chat component directly in the layout file for simplicity
const GlobalAIChat: React.FC = () => {
    const { currentUser } = useGamification();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initialMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: `Olá, ${currentUser?.name || 'explorador'}! 👋 Sou Cacá, seu assistente virtual. Como posso ajudar você a descobrir Caçapava do Sul hoje?` }]
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([initialMessage]);
        }
    }, [isOpen, currentUser]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (prompt?: string) => {
        const textToSend = prompt || userInput;
        if (!textToSend.trim() || isLoading || !currentUser) return;
        
        const userMessage: ChatMessage = { role: 'user', parts: [{ text: textToSend }] };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const aiResponseText = await getAIChatResponse(newMessages, currentUser);
            const aiMessage: ChatMessage = { role: 'model', parts: [{ text: aiResponseText }] };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Desculpe, estou com problemas para me conectar. Tente novamente." }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const suggestedPrompts = [
        "Onde posso almoçar?",
        "Qual o lugar mais legal para fotos?",
        "Como ganho mais pontos?",
    ];

    if (!currentUser) return null;

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-brand-green text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform z-40"
                aria-label="Abrir assistente virtual"
            >
                <Bot size={28} className="sm:w-8 sm:h-8" />
            </button>

            {/* Chat Modal */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)}></div>
                
                <div className={`absolute bottom-0 right-0 mb-2 mr-2 sm:mb-6 sm:mr-6 w-full max-w-[calc(100%-1rem)] sm:max-w-md bg-brand-beige rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-brand-light-green/20">
                        <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-brand-green" /> Assistente Virtual Cacá</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-brand-dark-green">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto h-96 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-brand-green text-white rounded-br-none' : 'bg-white text-brand-dark-green rounded-bl-none'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="max-w-xs md:max-w-sm rounded-2xl px-4 py-2 bg-white text-brand-dark-green rounded-bl-none">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Prompts */}
                    {messages.length <= 1 && (
                         <div className="px-4 pb-2 flex flex-wrap gap-2">
                             {suggestedPrompts.map(p => (
                                 <button key={p} onClick={() => handleSend(p)} className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-brand-light-green/20">
                                     {p}
                                 </button>
                             ))}
                         </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-brand-light-green/20">
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                             <input
                                type="text"
                                value={userInput}
                                onChange={e => setUserInput(e.target.value)}
                                placeholder="Pergunte algo..."
                                className="flex-grow p-2 border rounded-full text-sm focus:ring-brand-green focus:border-brand-green"
                            />
                            <button type="submit" disabled={isLoading} className="bg-brand-green text-white rounded-full p-2.5 hover:bg-brand-dark-green disabled:bg-gray-400">
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => {
    const location = useLocation();
    const getLinkClass = (path: string) => {
        const isActive = location.pathname === path;
        if (mobile) {
            return `block px-4 py-3 text-lg rounded-md transition-colors ${
                isActive ? 'bg-green-100 text-green-600 font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`;
        }
        return `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-green-100 text-green-600' : 'text-slate-600 hover:bg-slate-100'
        }`;
    };

    return (
        <>
            <NavLink to="/" className={getLinkClass('/')} end>Início</NavLink>
            <NavLink to="/routes" className={getLinkClass('/routes')}>Rotas</NavLink>
            <NavLink to="/attractions" className={getLinkClass('/attractions')}>Atrações</NavLink>
            <NavLink to="/restaurants" className={getLinkClass('/restaurants')}>Restaurantes</NavLink>
            <NavLink to="/olive-oils" className={getLinkClass('/olive-oils')}>Azeites</NavLink>
            <NavLink to="/itinerary" className={getLinkClass('/itinerary')}>Roteiro IA</NavLink>
            <NavLink to="/challenges" className={getLinkClass('/challenges')}>Desafios</NavLink>

            <NavLink to="/gallery" className={getLinkClass('/gallery')}>Galeria</NavLink>
            <NavLink to="/about" className={getLinkClass('/about')}>A Cidade</NavLink>
            <NavLink to="/leaderboard" className={getLinkClass('/leaderboard')}>Ranking</NavLink>
        </>
    );
};

const TouristHeader: React.FC = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50 border-b border-slate-200/80">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2 text-brand-dark-green">
                        <div className="w-10 h-10">
                            <MapOutlineIcon />
                        </div>
                        <div>
                            <div className="font-display tracking-wider text-xl leading-none">VISITE</div>
                            <div className="font-black text-2xl leading-none -mt-1">CAÇAPAVA</div>
                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-2">
                        <NavLinks />
                    </nav>

                    {/* Profile & Hamburger Menu */}
                    <div className="flex items-center space-x-4">
                         <NavLink to="/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100">
                            <img src={user?.avatarUrl} alt="Avatar" className="h-10 w-10 rounded-full border-2 border-green-500" />
                            <div className="hidden sm:block text-right">
                                <p className="font-semibold text-slate-800 text-sm">{user?.name}</p>
                                <p className="text-xs text-amber-600 font-bold">{user?.points} Pontos</p>
                            </div>
                        </NavLink>

                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-slate-200">
                    <nav className="flex flex-col space-y-2 p-4">
                        <NavLinks mobile />
                    </nav>
                </div>
            )}
        </header>
    );
};


const TouristLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-brand-beige min-h-screen">
            <TouristHeader />
            <main className="container mx-auto px-2 sm:px-4 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12">
                {children}
            </main>
            <GlobalAIChat />
        </div>
    );
};

export default TouristLayout;
