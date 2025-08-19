import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Route, Zap, MessageCircle, Clock, Target } from 'lucide-react';

const AIFeatureCard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleExperimentar = () => {
    navigate('/itinerary');
  };

  const features = [
    {
      icon: <Route className="h-5 w-5" />,
      title: "Rotas Personalizadas",
      description: "IA cria roteiros únicos baseados no seu perfil"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Otimização de Tempo",
      description: "Maximiza sua experiência no tempo disponível"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Recomendações Inteligentes",
      description: "Sugere pontos baseados no seus interesses"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Assistente 24/7",
      description: "Tire dúvidas e receba dicas em tempo real"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white/20 rounded-xl p-3">
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Inteligência Artificial</h3>
            <p className="text-blue-100">Tecnologia que revoluciona sua experiência</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-blue-200">
                  {feature.icon}
                </div>
                <h4 className="font-semibold">{feature.title}</h4>
              </div>
              <p className="text-sm text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-100 mb-1">Experimente agora</p>
            <p className="text-lg font-semibold">Planeje sua viagem com IA</p>
          </div>
          <button 
            onClick={handleExperimentar}
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 group transform hover:scale-105 hover:shadow-lg"
          >
            <Zap className="h-4 w-4 group-hover:text-yellow-500 transition-colors" />
            Experimentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIFeatureCard;
