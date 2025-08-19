import React, { useState, useEffect } from 'react';
import { 
  Bot, Sparkles, Sun, Feather, ChevronsRight, Loader, RotateCcw, 
  MapPin, Clock, Star, Users, Calendar, Heart, Download, Share2, 
  Wand2, CheckCircle, ArrowRight, RefreshCw, Zap, Target, Coffee,
  Mountain, Camera, Utensils, TreePine, Compass, AlertCircle,
  ChevronDown, ChevronUp, Play, Pause
} from 'lucide-react';
import { generateItinerary } from '../services/geminiService';

const interestOptions = [
  { id: "natureza", label: "Natureza", icon: TreePine, color: "bg-green-100 text-green-700 border-green-200" },
  { id: "historia", label: "História", icon: Mountain, color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "gastronomia", label: "Gastronomia", icon: Utensils, color: "bg-red-100 text-red-700 border-red-200" },
  { id: "aventura", label: "Aventura", icon: Compass, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "cultura", label: "Cultura Local", icon: Camera, color: "bg-purple-100 text-purple-700 border-purple-200" }
];

const paceOptions = [
  { 
    id: 'relaxado', 
    label: 'Relaxado', 
    icon: Feather, 
    description: 'Poucas atividades, muito tempo para descansar',
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  { 
    id: 'moderado', 
    label: 'Moderado', 
    icon: Sun, 
    description: 'Equilibrio entre atividades e descanso',
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  { 
    id: 'intenso', 
    label: 'Intenso', 
    icon: Zap, 
    description: 'Muitas atividades, aproveitar ao máximo',
    color: 'bg-orange-50 border-orange-200 text-orange-700'
  }
];

const loadingMessages = [
  { text: "Analisando suas preferências...", icon: Target },
  { text: "Explorando os tesouros de Caçapava...", icon: Compass },
  { text: "Consultando especialistas locais...", icon: Users },
  { text: "Criando experiências únicas...", icon: Sparkles },
  { text: "Finalizando seu roteiro personalizado...", icon: CheckCircle }
];

const ItineraryPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [duration, setDuration] = useState('1');
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [pace, setPace] = useState('moderado');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('medio');
  const [groupSize, setGroupSize] = useState('2');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [animatedText, setAnimatedText] = useState('');

  // Animação de typing para o resultado
  useEffect(() => {
    if (itinerary && !loading) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < itinerary.length) {
          setAnimatedText(itinerary.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [itinerary, loading]);

  const handleInterestToggle = (interestId: string) => {
    const newInterests = new Set(interests);
    if (newInterests.has(interestId)) {
      newInterests.delete(interestId);
    } else {
      newInterests.add(interestId);
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
    setAnimatedText('');
    setCurrentLoadingIndex(0);

    const messageInterval = setInterval(() => {
      setCurrentLoadingIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    try {
      const preferences = {
        duration: `${duration} dia(s)`,
        interests: Array.from(interests),
        pace,
        notes,
        budget,
        groupSize
      };
      const result = await generateItinerary(preferences as any);
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
    setAnimatedText('');
    setDuration('1');
    setInterests(new Set());
    setPace('moderado');
    setNotes('');
    setBudget('medio');
    setGroupSize('2');
    setError('');
    setCurrentStep(1);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return duration !== '';
      case 2: return interests.size > 0;
      case 3: return pace !== '';
      default: return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 4 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    const currentMessage = loadingMessages[currentLoadingIndex];
    const CurrentIcon = currentMessage.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center max-w-lg w-full shadow-2xl border border-white/20">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
              <CurrentIcon className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Criando Magia ✨
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 transition-all duration-500">
            {currentMessage.text}
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-pulse transition-all duration-1000"></div>
          </div>
          
          <div className="flex justify-center space-x-2">
            {loadingMessages.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentLoadingIndex ? 'bg-blue-400 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-6 shadow-xl border border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  🎯 Seu Roteiro Personalizado
                </h1>
                <p className="text-gray-600 text-lg">
                  Uma aventura única, criada especialmente para você!
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => navigator.share && navigator.share({title: 'Meu Roteiro em Caçapava', text: itinerary})}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
                
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4" />
                  Novo Roteiro
                </button>
              </div>
            </div>
          </div>

          {/* Itinerary Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                {animatedText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
            <Bot className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              IA Guia Turístico
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Crie seu Roteiro dos Sonhos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa inteligência artificial criará um roteiro único e personalizado 
            baseado em suas preferências para explorar Caçapava do Sul
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                  ${currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg scale-110' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 rounded transition-all duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Duration */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Calendar className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Quanto tempo você tem?</h2>
                  <p className="text-gray-600">Vamos planejar cada momento da sua visita</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {['1', '2', '3'].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setDuration(days)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        duration === days
                          ? 'bg-gradient-to-br from-blue-500 to-green-500 text-white border-transparent shadow-xl'
                          : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <Clock className="w-8 h-8 mx-auto mb-3" />
                      <div className="text-2xl font-bold mb-1">{days}</div>
                      <div className="text-sm opacity-80">{days === '1' ? 'Dia' : 'Dias'}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Heart className="w-16 h-16 mx-auto text-red-500 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">O que te emociona?</h2>
                  <p className="text-gray-600">Selecione tudo que desperta seu interesse</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {interestOptions.map((interest) => {
                    const IconComponent = interest.icon;
                    const isSelected = interests.has(interest.id);
                    
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-500 to-green-500 text-white border-transparent shadow-xl scale-105'
                            : `bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-300 ${interest.color}`
                        }`}
                      >
                        <IconComponent className={`w-8 h-8 mx-auto mb-3 ${isSelected ? 'text-white' : ''}`} />
                        <div className="font-bold text-lg">{interest.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Pace */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Zap className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Qual seu ritmo ideal?</h2>
                  <p className="text-gray-600">Como você gosta de viajar?</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {paceOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = pace === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setPace(option.id)}
                        className={`p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-center ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-500 to-green-500 text-white border-transparent shadow-xl scale-105'
                            : `bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-300 ${option.color}`
                        }`}
                      >
                        <IconComponent className={`w-12 h-12 mx-auto mb-4 ${isSelected ? 'text-white' : ''}`} />
                        <div className="font-bold text-xl mb-2">{option.label}</div>
                        <div className={`text-sm ${isSelected ? 'text-white/80' : 'opacity-70'}`}>
                          {option.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Final Details */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <Wand2 className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Últimos toques mágicos</h2>
                  <p className="text-gray-600">Ajude-nos a personalizar ainda mais seu roteiro</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Budget */}
                  <div>
                    <label className="text-lg font-semibold text-gray-800 mb-4 block">💰 Orçamento</label>
                    <select 
                      value={budget} 
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all"
                    >
                      <option value="baixo">Econômico (R$ 50-100/dia)</option>
                      <option value="medio">Moderado (R$ 100-200/dia)</option>
                      <option value="alto">Confortável (R$ 200+/dia)</option>
                    </select>
                  </div>

                  {/* Group Size */}
                  <div>
                    <label className="text-lg font-semibold text-gray-800 mb-4 block">👥 Tamanho do Grupo</label>
                    <select 
                      value={groupSize} 
                      onChange={(e) => setGroupSize(e.target.value)}
                      className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all"
                    >
                      <option value="1">Solo</option>
                      <option value="2">Casal</option>
                      <option value="3-4">Família pequena</option>
                      <option value="5+">Grupo grande</option>
                    </select>
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
                  >
                    {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    Opções Avançadas
                  </button>
                  
                  {showAdvanced && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <label htmlFor="notes" className="text-lg font-semibold text-gray-800 mb-4 block">
                        📝 Informações Especiais
                      </label>
                      <textarea 
                        id="notes" 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Ex: Viajando com crianças, mobilidade reduzida, interesses específicos, restrições alimentares..."
                        className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all h-32 resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Anterior
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    isStepValid(currentStep)
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || interests.size === 0}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 hover:shadow-xl disabled:bg-gray-400 disabled:scale-100 flex items-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  Criar Roteiro Mágico
                  <Wand2 className="w-6 h-6" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
