import React from 'react';
import { Calendar, Book, Users, Landmark, ChevronRight } from 'lucide-react';

const HistoryCultureSection: React.FC = () => {
  const historicalPeriods = [
    {
      period: "1700s",
      title: "Fundação",
      description: "Estabelecimento das primeiras estâncias pelos colonizadores portugueses"
    },
    {
      period: "1800s",
      title: "Desenvolvimento",
      description: "Crescimento com a pecuária e agricultura, formação da identidade gaúcha"
    },
    {
      period: "1900s",
      title: "Modernização",
      description: "Industrialização e consolidação como centro regional importante"
    },
    {
      period: "Hoje",
      title: "Turismo",
      description: "Valorização do patrimônio histórico e natural para o turismo sustentável"
    }
  ];

  const culturalHighlights = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Tradição Gaúcha",
      description: "Berço de importantes figuras da cultura sul-rio-grandense"
    },
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Patrimônio Histórico",
      description: "Arquitetura colonial preservada e museus regionais"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Festivais",
      description: "Eventos tradicionais que celebram a cultura local"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl p-8 border-2 border-amber-200">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3 shadow-sm mb-4">
          <Book className="h-8 w-8 text-amber-600" />
          <div>
            <h3 className="text-2xl font-bold text-amber-800">História e Cultura</h3>
            <p className="text-amber-600">Raízes profundas do Rio Grande do Sul</p>
          </div>
        </div>
      </div>

      {/* Historical Timeline */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-amber-800 mb-6 text-center">Linha do Tempo</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {historicalPeriods.map((period, index) => (
            <div key={index} className="relative">
              {/* Timeline connector */}
              {index < historicalPeriods.length - 1 && (
                <div className="hidden md:block absolute top-6 right-0 w-full h-0.5 bg-amber-300 z-0"></div>
              )}
              
              <div className="bg-white/70 rounded-lg p-4 border border-amber-200 relative z-10">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full text-amber-600 font-bold mb-3 border-2 border-amber-300">
                    {period.period}
                  </div>
                  <h5 className="font-bold text-amber-800 mb-2">{period.title}</h5>
                  <p className="text-sm text-amber-700">{period.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Highlights */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {culturalHighlights.map((highlight, index) => (
          <div key={index} className="bg-white/70 rounded-lg p-6 border border-amber-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full text-amber-600 mb-4">
              {highlight.icon}
            </div>
            <h5 className="font-bold text-amber-800 mb-2">{highlight.title}</h5>
            <p className="text-sm text-amber-700">{highlight.description}</p>
          </div>
        ))}
      </div>

      {/* Key Facts */}
      <div className="bg-white/70 rounded-xl p-6 border border-amber-200 mb-6">
        <h4 className="text-lg font-bold text-amber-800 mb-4">Importância Regional</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-amber-800 mb-2">Centro Econômico</h5>
            <p className="text-sm text-amber-700">
              Importante hub de agronegócios na região da Campanha, 
              com destaque na pecuária, agricultura e olivicultura.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-amber-800 mb-2">Patrimônio Natural</h5>
            <p className="text-sm text-amber-700">
              Localizada na Serra do Sudeste, preserva ecossistemas únicos 
              e paisagens que contam a história geológica do RS.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <button className="bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors inline-flex items-center gap-2">
          <Book className="h-4 w-4" />
          Explorar História Completa
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default HistoryCultureSection;
