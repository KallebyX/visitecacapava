import React from 'react';
import { Award, Leaf, Globe, Crown, Star, ExternalLink } from 'lucide-react';

const OliveOilShowcase: React.FC = () => {
  const achievements = [
    {
      icon: <Award className="h-5 w-5" />,
      title: "Prêmio Internacional",
      description: "Medalha de Ouro no Concurso Mundial de Azeites",
      year: "2024"
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Denominação de Origem",
      description: "Primeiro azeite gaúcho com D.O. reconhecida",
      year: "2023"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Exportação",
      description: "Presente em 15 países ao redor do mundo",
      year: "2024"
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "Sustentabilidade",
      description: "Certificação orgânica e sustentável",
      year: "2022"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-green-50 to-olive-100 rounded-2xl p-8 border-2 border-green-200">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3 shadow-sm mb-4">
          <div className="text-4xl">🫒</div>
          <div>
            <h3 className="text-2xl font-bold text-green-800">Azeite de Oliva Caçapavano</h3>
            <p className="text-green-600">Tradição que conquistou o mundo</p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-xl font-bold text-green-800 mb-4">Nossa História</h4>
          <p className="text-green-700 mb-4">
            Desde 1950, Caçapava do Sul cultiva oliveiras nas encostas da Serra do Sudeste, 
            aproveitando o clima privilegiado e solos únicos da região.
          </p>
          <p className="text-green-700">
            Hoje, nossos azeites extra virgens são reconhecidos internacionalmente 
            por sua qualidade excepcional e sabor inconfundível.
          </p>
        </div>
        
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Oliveiras em Caçapava do Sul"
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />
          <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-green-800">
            100% Natural
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white/70 rounded-lg p-4 text-center border border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-3">
              {achievement.icon}
            </div>
            <h5 className="font-bold text-green-800 mb-1">{achievement.title}</h5>
            <p className="text-sm text-green-700 mb-2">{achievement.description}</p>
            <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {achievement.year}
            </span>
          </div>
        ))}
      </div>

      {/* Quality Indicators */}
      <div className="bg-white/70 rounded-xl p-6 border border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-800">95+</div>
            <div className="text-sm text-green-600">Score Internacional</div>
            <div className="flex justify-center mt-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
              ))}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-800">15</div>
            <div className="text-sm text-green-600">Países de Exportação</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-800">1ª</div>
            <div className="text-sm text-green-600">D.O. do Rio Grande do Sul</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-6">
        <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Conheça os Produtores
        </button>
      </div>
    </div>
  );
};

export default OliveOilShowcase;
