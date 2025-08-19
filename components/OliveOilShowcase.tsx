import React from 'react';
import { Award, Leaf, Globe, Crown, Star, ExternalLink, Trophy, Target } from 'lucide-react';

const OliveOilShowcase: React.FC = () => {
  const achievements = [
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Melhor do Hemisfério Sul",
      description: "Prosperato eleita #1 do Hemisfério Sul em 2024",
      year: "2024"
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "4º Lugar Mundial",
      description: "Ranking EVOO World 2024 - Prosperato",
      year: "2024"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Flos Olei 97/100",
      description: "1ª marca brasileira com 97 pontos",
      year: "2025"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "300+ Prêmios",
      description: "Produtores locais acumulam mais de 300 prêmios",
      year: "2024"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-green-50 to-olive-100 rounded-2xl p-8 border-2 border-green-200">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3 shadow-sm mb-4">
          <div className="text-4xl">🫒</div>
          <div>
            <h3 className="text-2xl font-bold text-green-800">Azeites de Caçapava do Sul</h3>
            <p className="text-green-600">Berço da olivicultura gaúcha</p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-xl font-bold text-green-800 mb-4">Excelência Mundial</h4>
          <p className="text-green-700 mb-4">
            Caçapava do Sul é responsável por 70% da produção brasileira de azeite de oliva, 
            com produtores que conquistaram reconhecimento internacional.
          </p>
          <p className="text-green-700">
            <strong>Prosperato</strong> lidera mundialmente como 4ª melhor do ranking global e 
            melhor do Hemisfério Sul. <strong>Don José</strong> e <strong>Alma do Segredo</strong> 
            completam o trio de excelência local.
          </p>
        </div>
        
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Oliveiras em Caçapava do Sul"
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />
          <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-green-800">
            70% Nacional
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
            <div className="text-3xl font-bold text-green-800">97</div>
            <div className="text-sm text-green-600">Flos Olei Score (Prosperato)</div>
            <div className="flex justify-center mt-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
              ))}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-800">3</div>
            <div className="text-sm text-green-600">Produtores Premium</div>
            <div className="text-xs text-green-500 mt-1">Prosperato • Don José • Alma do Segredo</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-800">70%</div>
            <div className="text-sm text-green-600">Produção Nacional</div>
            <div className="text-xs text-green-500 mt-1">Caçapava do Sul</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg">
            <Leaf className="h-4 w-4" />
            Conheça Nossos Azeites
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OliveOilShowcase;
