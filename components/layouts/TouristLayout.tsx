import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import { getAIChatResponse } from '../../services/geminiService';
import type { ChatMessage } from '../../types';

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
                className="fixed bottom-6 right-6 bg-brand-green text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform z-40"
                aria-label="Abrir assistente virtual"
            >
                <Bot size={32} />
            </button>

            {/* Chat Modal */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)}></div>
                
                <div className={`absolute bottom-0 right-0 mb-6 mr-6 w-full max-w-md bg-brand-beige rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}>
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


const TouristLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-brand-beige min-h-screen flex flex-col font-sans text-brand-dark-green">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <GlobalAIChat />
    </div>
  );
};

export default TouristLayout;
