import React, { useState } from 'react';
import { 
  Award, Star, MapPin, ExternalLink, Trophy, Medal, Globe, Calendar, 
  Target, Crown, Sparkles, Coffee, ShoppingBag, Eye, Users,
  ChevronRight, Info, CheckCircle, Zap
} from 'lucide-react';

interface OliveOilProducer {
  id: string;
  name: string;
  brand: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  founded: number;
  website?: string;
  awards: Award[];
  products: OliveOilProduct[];
  imageUrl: string;
  certifications: string[];
  tourAvailable: boolean;
  globalRanking?: string;
  flosoleiScore?: number;
  specialFeatures: string[];
  profileDescription: string;
}

interface Award {
  id: string;
  name: string;
  year: number;
  category: string;
  position: string;
  competition: string;
  country: string;
  international: boolean;
}

interface OliveOilProduct {
  id: string;
  name: string;
  type: string;
  varieties: string[];
  description: string;
  sensorProfile: string;
  acidity: string;
  awards: string[];
  imageUrl: string;
  price?: number;
  availability: 'available' | 'limited' | 'sold-out';
}

const OliveOilsPage: React.FC = () => {
  const [selectedProducer, setSelectedProducer] = useState<OliveOilProducer | null>(null);
  const [activeTab, setActiveTab] = useState<'producers' | 'awards' | 'fenazeite'>('producers');

  // Dados autênticos dos produtores de Caçapava do Sul
  const producers: OliveOilProducer[] = [
    {
      id: 'prosperato',
      name: 'Prosperato',
      brand: 'Prosperato',
      description: 'Líder mundial em qualidade de azeite extra virgem, eleita melhor produtora do Hemisfério Sul e 4ª no ranking global.',
      location: 'Caçapava do Sul, RS',
      lat: -30.5140,
      lng: -53.4890,
      founded: 2010,
      website: 'https://prosperato.com.br',
      imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2D5016;stop-opacity:1" /><stop offset="100%" style="stop-color:#6CBC3A;stop-opacity:1" /></linearGradient></defs><rect width="600" height="300" fill="url(#grad1)"/><circle cx="150" cy="150" r="80" fill="#FFD700" opacity="0.3"/><text x="350" y="130" font-family="serif" font-size="36" font-weight="bold" fill="#FFD700" text-anchor="middle">PROSPERATO</text><text x="350" y="170" font-family="serif" font-size="16" fill="white" text-anchor="middle">Azeite Premium</text><text x="350" y="200" font-family="serif" font-size="14" fill="#FFD700" text-anchor="middle">Melhor do Hemisfério Sul 2024</text></svg>'),
      certifications: ['Extra Virgem Premium', 'Exportação Internacional', 'Processo Italiano'],
      tourAvailable: true,
      globalRanking: '4º lugar mundial EVOO World 2024',
      flosoleiScore: 97,
      specialFeatures: [
        'Colheita manual e rápida',
        'Extração em maquinário italiano de ponta',
        'Envase em menos de 1 hora após colheita',
        'Exportado para os EUA',
        'Mais de 9 anos consecutivos no Flos Olei'
      ],
      profileDescription: 'Processo de produção com colheita manual e rápida, extração em maquinário italiano de ponta, envase em menos de uma hora após a colheita para preservar frescor e propriedades nutricionais.',
      awards: [
        {
          id: '1',
          name: 'EVO IOOC 2024',
          year: 2024,
          category: 'Azeite Extra Virgem',
          position: 'Medalha de Ouro',
          competition: 'EVO IOOC',
          country: 'Itália',
          international: true
        },
        {
          id: '2',
          name: 'Athena IOOC 2024',
          year: 2024,
          category: 'Azeite Premium',
          position: 'Medalha de Prata',
          competition: 'Athena IOOC',
          country: 'Grécia',
          international: true
        },
        {
          id: '3',
          name: 'NYIOOC 2020',
          year: 2020,
          category: 'Extra Virgem',
          position: 'Medalha de Prata',
          competition: 'NYIOOC',
          country: 'Estados Unidos',
          international: true
        },
        {
          id: '4',
          name: 'Japan IOOC 2019',
          year: 2019,
          category: 'Premium',
          position: 'Medalha de Ouro',
          competition: 'Japan IOOC',
          country: 'Japão',
          international: true
        },
        {
          id: '5',
          name: 'Best in Class NYIOOC 2019',
          year: 2019,
          category: 'Best in Class',
          position: 'Medalha de Ouro',
          competition: 'NYIOOC',
          country: 'Estados Unidos',
          international: true
        },
        {
          id: '6',
          name: 'Gran Prestigio Oro Olivinus 2017',
          year: 2017,
          category: 'Premium',
          position: 'Gran Prestigio Oro',
          competition: 'Olivinus',
          country: 'Argentina',
          international: true
        }
      ],
      products: [
        {
          id: '1',
          name: 'Prosperato Koroneiki',
          type: 'Extra Virgem Monovarietal',
          varieties: ['Koroneiki'],
          description: 'Azeite premium da variedade Koroneiki, considerado um dos melhores do mundo.',
          sensorProfile: 'Aroma frutado verde, herbáceo, sabor complexo com amargor e picância intensos, notas de amêndoas e nozes.',
          acidity: '0,1% (acidez máxima)',
          awards: ['EVO IOOC 2024 - Ouro', 'Athena IOOC 2024 - Prata', 'Flos Olei 97/100'],
          imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="#2D5016"/><rect x="50" y="50" width="200" height="300" rx="20" fill="#6CBC3A"/><text x="150" y="120" font-family="serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">PROSPERATO</text><text x="150" y="160" font-family="serif" font-size="14" fill="#FFD700" text-anchor="middle">Koroneiki</text><text x="150" y="190" font-family="serif" font-size="12" fill="white" text-anchor="middle">Extra Virgem</text><circle cx="150" cy="250" r="30" fill="#FFD700" opacity="0.8"/><text x="150" y="320" font-family="serif" font-size="10" fill="white" text-anchor="middle">Acidez: 0,1%</text></svg>'),
          price: 187,
          availability: 'available'
        },
        {
          id: '2',
          name: 'Prosperato Blend Premium',
          type: 'Extra Virgem Blend',
          varieties: ['Coratina', 'Picual', 'Frantoio', 'Galega'],
          description: 'Blend harmonioso das melhores variedades cultivadas na propriedade.',
          sensorProfile: 'Equilíbrio perfeito entre frutado, amargo e picante, com notas complexas.',
          acidity: '0,2%',
          awards: ['Múltiplos prêmios internacionais', 'Flos Olei 95/100'],
          imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="#2D5016"/><rect x="50" y="50" width="200" height="300" rx="20" fill="#8FBC8F"/><text x="150" y="120" font-family="serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">PROSPERATO</text><text x="150" y="160" font-family="serif" font-size="14" fill="#FFD700" text-anchor="middle">Blend Premium</text><text x="150" y="190" font-family="serif" font-size="12" fill="white" text-anchor="middle">Extra Virgem</text><circle cx="150" cy="250" r="30" fill="#FFD700" opacity="0.8"/></svg>'),
          price: 150,
          availability: 'available'
        }
      ]
    },
    {
      id: 'don-jose',
      name: 'Don José',
      brand: 'Don José',
      description: 'Azeite artesanal produzido em regime de mutirão por famílias locais, premiado com Selo Ibraoliva Premium.',
      location: 'Fazenda Pitangueira, Caçapava do Sul',
      lat: -30.5200,
      lng: -53.5100,
      founded: 2018,
      imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="#8B4513"/><rect x="100" y="100" width="400" height="100" fill="#D2B48C"/><text x="300" y="140" font-family="serif" font-size="28" font-weight="bold" fill="#2D5016" text-anchor="middle">DON JOSÉ</text><text x="300" y="170" font-family="serif" font-size="14" fill="#8B4513" text-anchor="middle">Tradição Familiar</text><text x="300" y="250" font-family="serif" font-size="12" fill="white" text-anchor="middle">Selo Ibraoliva Premium</text></svg>'),
      certifications: ['Selo Ibraoliva Premium', 'Produção Artesanal', 'Agricultura Familiar'],
      tourAvailable: true,
      specialFeatures: [
        'Produção manual familiar',
        'Regime de mutirão tradicional',
        'Fazenda Pitangueira',
        'Selo Ibraoliva Premium',
        'Autenticidade regional'
      ],
      profileDescription: 'Destaca-se pela produção manual, feita por famílias locais na Fazenda Pitangueira, em regime de mutirão, reforçando tradição, cuidado e autenticidade.',
      awards: [
        {
          id: '1',
          name: 'Selo Ibraoliva Produtos Premium',
          year: 2023,
          category: 'Produtos Premium',
          position: 'Certificação Premium',
          competition: 'Olivas no Cais',
          country: 'Brasil',
          international: false
        }
      ],
      products: [
        {
          id: '1',
          name: 'Don José Tradicional',
          type: 'Extra Virgem Artesanal',
          varieties: ['Blend Tradicional'],
          description: 'Azeite artesanal produzido em mutirão familiar, com sabor autêntico da tradição local.',
          sensorProfile: 'Sabor equilibrado com notas terrosas e frutadas, reflexo do terroir local.',
          acidity: '0,3%',
          awards: ['Selo Ibraoliva Premium 2023'],
          imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="#8B4513"/><rect x="50" y="50" width="200" height="300" rx="20" fill="#D2B48C"/><text x="150" y="120" font-family="serif" font-size="16" font-weight="bold" fill="#2D5016" text-anchor="middle">DON JOSÉ</text><text x="150" y="160" font-family="serif" font-size="12" fill="#8B4513" text-anchor="middle">Tradicional</text><text x="150" y="190" font-family="serif" font-size="10" fill="#2D5016" text-anchor="middle">Extra Virgem</text><circle cx="150" cy="250" r="25" fill="#CD853F"/><text x="150" y="320" font-family="serif" font-size="8" fill="#2D5016" text-anchor="middle">Produção Familiar</text></svg>'),
          price: 85,
          availability: 'limited'
        }
      ]
    },
    {
      id: 'alma-segredo',
      name: 'Alma do Segredo',
      brand: 'Alma do Segredo',
      description: 'Produção no Vale da Pedra do Segredo, azeite com personalidade equilibrada e notas sensoriais únicas.',
      location: 'Vale da Pedra do Segredo, Caçapava do Sul',
      lat: -30.5300,
      lng: -53.4800,
      founded: 2020,
      imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" /><stop offset="100%" style="stop-color:#6CBC3A;stop-opacity:1" /></linearGradient></defs><rect width="600" height="300" fill="url(#grad2)"/><polygon points="100,250 200,50 300,250" fill="white" opacity="0.3"/><text x="350" y="130" font-family="serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">ALMA DO SEGREDO</text><text x="350" y="170" font-family="serif" font-size="14" fill="#FFD700" text-anchor="middle">Vale da Pedra do Segredo</text><text x="350" y="200" font-family="serif" font-size="12" fill="white" text-anchor="middle">Terroir Único</text></svg>'),
      certifications: ['Extra Virgem', 'Processo Mecânico a Frio', 'Terroir Único'],
      tourAvailable: true,
      specialFeatures: [
        'Localização no Vale da Pedra do Segredo',
        'Personalidade equilibrada única',
        'Variação sensorial conforme maturação',
        'Processo mecânico a frio',
        'Notas de alcachofra e tomate'
      ],
      profileDescription: 'Azeite extra virgem com personalidade equilibrada — mais picante quando azeitonas colhidas verdes, mais doce em maturidade. Notas sensoriais variam entre alcachofra e tomate, com frutas frescas.',
      awards: [
        {
          id: '1',
          name: 'Reconhecimento Regional',
          year: 2023,
          category: 'Qualidade Regional',
          position: 'Destaque',
          competition: 'Avaliação Regional',
          country: 'Brasil',
          international: false
        }
      ],
      products: [
        {
          id: '1',
          name: 'Alma do Segredo Premium',
          type: 'Extra Virgem',
          varieties: ['Blend do Vale'],
          description: 'Azeite único do Vale da Pedra do Segredo, com personalidade que varia conforme a maturação.',
          sensorProfile: 'Personalidade equilibrada, notas de alcachofra e tomate quando verde, mais doce na maturidade, com frutas frescas.',
          acidity: '0,4%',
          awards: ['Reconhecimento Regional 2023'],
          imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="#4A90E2"/><rect x="50" y="50" width="200" height="300" rx="20" fill="#6CBC3A"/><text x="150" y="110" font-family="serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">ALMA DO</text><text x="150" y="130" font-family="serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SEGREDO</text><text x="150" y="170" font-family="serif" font-size="12" fill="#FFD700" text-anchor="middle">Premium</text><polygon points="130,220 150,190 170,220" fill="white" opacity="0.8"/><text x="150" y="320" font-family="serif" font-size="10" fill="white" text-anchor="middle">Vale da Pedra</text></svg>'),
          price: 95,
          availability: 'available'
        }
      ]
    }
  ];

  const fenazeiteInfo = {
    name: 'Festa Nacional do Azeite de Oliva (Fenazeite)',
    edition: '4ª Edição 2025',
    lastEvent: {
      year: 2024,
      edition: '3ª',
      dates: '29 de novembro a 1º de dezembro',
      location: 'Largo Farroupilha, Caçapava do Sul',
      attendance: '20.000+ pessoas',
      sales: 'R$ 30.000+ em vendas de expositores',
      highlights: [
        'Mais de 20 mil pessoas em 3 dias',
        'Expositores com selo Geoparque',
        'Carreteiro tradicional do IRGA para 500 pessoas',
        'Shows com artistas renomados',
        'Palestras e oficinas educativas',
        'Passeios em caminhão militar aos olivais'
      ]
    },
    producers: [
      'Alma do Segredo', 'Cerro das Oliveiras', 'Costi Olivos', 'Don José',
      'Guaritas', 'Nuance', 'Olivas da Coxilha', 'Olivas São Pedro',
      'Prosperato', 'Vila do Segredo'
    ],
    achievements: '300+ prêmios internacionais acumulados',
    significance: 'Caçapava do Sul é responsável por cerca de 70% da produção brasileira de azeite de oliva',
    partners: ['ACIC', 'Prefeitura', 'Câmara de Vereadores', 'Ibraoliva', 'UNIPAMPA', 'Geoparque Mundial UNESCO', 'Sebrae'],
    nextEdition: 'Novembro de 2025'
  };

  const totalAwards = producers.reduce((sum, producer) => sum + producer.awards.length, 0);
  const internationalAwards = producers.reduce((sum, producer) => 
    sum + producer.awards.filter(award => award.international).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-yellow-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <span className="text-xl font-bold">Azeites Premiados Mundialmente</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            🫒 Azeites de Caçapava do Sul
          </h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-8">
            Berço da olivicultura gaúcha, responsável por 70% da produção brasileira. 
            Nossos azeites extra virgens conquistaram mais de <strong>300 prêmios internacionais</strong>, 
            colocando Caçapava do Sul no mapa mundial da olivicultura de excelência.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Produtores Premium', value: producers.length, icon: Users },
              { label: 'Prêmios Conquistados', value: '300+', icon: Award },
              { label: 'Países Reconhecedores', value: '15+', icon: Globe },
              { label: 'Ranking Mundial', value: '#4', icon: Crown }
            ].map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'producers', label: 'Produtores', icon: Coffee },
              { id: 'awards', label: 'Prêmios', icon: Trophy },
              { id: 'fenazeite', label: 'Fenazeite', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Producers Tab */}
        {activeTab === 'producers' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Produtores de Excelência</h2>
              <p className="text-lg text-gray-600">
                Conheça os mestres olivicultores que colocaram Caçapava do Sul no cenário mundial
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {producers.map((producer) => (
                <div
                  key={producer.id}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Producer Image */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={producer.imageUrl} 
                      alt={producer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{producer.brand}</h3>
                        <p className="text-green-600 font-medium">{producer.name}</p>
                      </div>
                      
                      {producer.globalRanking && (
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          <Crown className="w-3 h-3 inline mr-1" />
                          {producer.globalRanking.includes('4º') ? '#4 Mundial' : 'Top Global'}
                        </div>
                      )}
                    </div>

                    {/* Flos Olei Score */}
                    {producer.flosoleiScore && (
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm opacity-90">Flos Olei 2025</div>
                            <div className="text-2xl font-bold">{producer.flosoleiScore}/100</div>
                          </div>
                          <div className="text-right">
                            <Sparkles className="w-6 h-6 mb-1" />
                            <div className="text-xs">1º Brasil</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{producer.description}</p>

                    {/* Special Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">Diferenciais:</h4>
                      <div className="flex flex-wrap gap-1">
                        {producer.specialFeatures.slice(0, 3).map((feature, index) => (
                          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                        {producer.specialFeatures.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            +{producer.specialFeatures.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Awards Summary */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-yellow-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Medal className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">{producer.awards.length} Prêmios</span>
                      </div>
                      <div className="text-sm text-yellow-700">
                        {producer.awards.filter(a => a.international).length} Internacionais
                      </div>
                    </div>

                    {/* Products Count */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <ShoppingBag className="w-4 h-4" />
                        <span className="text-sm">{producer.products.length} produtos</span>
                      </div>
                      
                      {producer.tourAvailable && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">Tour disponível</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedProducer(producer)}
                      className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Info className="w-5 h-5" />
                      Ver Detalhes Completos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === 'awards' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Reconhecimento Mundial</h2>
              <p className="text-lg text-gray-600">
                Mais de 300 prêmios internacionais conquistados pelos produtores de Caçapava do Sul
              </p>
            </div>

            {/* Awards Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-2xl p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">300+</div>
                <div>Prêmios Totais</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl p-6 text-center">
                <Globe className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">15+</div>
                <div>Países</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl p-6 text-center">
                <Crown className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">#4</div>
                <div>Ranking Mundial</div>
              </div>
            </div>

            {/* Recent Awards by Producer */}
            <div className="space-y-6">
              {producers.map((producer) => (
                <div key={producer.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={producer.imageUrl} alt={producer.brand} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{producer.brand}</h3>
                      <p className="text-gray-600">{producer.awards.length} prêmios conquistados</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {producer.awards.map((award) => (
                      <div key={award.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2 rounded-lg ${award.international ? 'bg-blue-100' : 'bg-green-100'}`}>
                            {award.international ? <Globe className="w-5 h-5 text-blue-600" /> : <Award className="w-5 h-5 text-green-600" />}
                          </div>
                          <span className="text-sm font-semibold text-gray-500">{award.year}</span>
                        </div>
                        
                        <h4 className="font-bold text-gray-800 mb-1">{award.position}</h4>
                        <p className="text-sm text-gray-600 mb-2">{award.competition}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {award.country}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fenazeite Tab */}
        {activeTab === 'fenazeite' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Festa Nacional do Azeite de Oliva</h2>
              <p className="text-lg text-gray-600">
                O maior evento da olivicultura brasileira acontece em Caçapava do Sul
              </p>
            </div>

            {/* Event Hero */}
            <div className="bg-gradient-to-br from-green-600 to-yellow-500 text-white rounded-3xl p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-4xl font-bold mb-4">Fenazeite 2024</h3>
                  <p className="text-xl mb-6 opacity-90">
                    A 3ª edição reuniu mais de 20 mil pessoas em celebração à excelência da olivicultura gaúcha
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold">20.000+</div>
                      <div className="text-sm opacity-90">Visitantes</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold">R$ 30k+</div>
                      <div className="text-sm opacity-90">Em vendas</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">Próxima Edição</h4>
                  <div className="text-3xl font-bold mb-2">Novembro 2025</div>
                  <p className="opacity-90">4ª Festa Nacional do Azeite de Oliva</p>
                  
                  <div className="mt-6 p-4 bg-white/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Entrada Gratuita</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>Largo Farroupilha</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {fenazeiteInfo.lastEvent.highlights.map((highlight, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-800 font-medium">{highlight}</p>
                </div>
              ))}
            </div>

            {/* Participating Producers */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Produtores Participantes</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {fenazeiteInfo.producers.map((producer, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-sm font-semibold text-green-800">{producer}</div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-xl px-6 py-3">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-800">{fenazeiteInfo.achievements}</span>
                </div>
              </div>
            </div>

            {/* Partners */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Parceiros e Apoiadores</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {fenazeiteInfo.partners.map((partner, index) => (
                  <span key={index} className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Producer Detail Modal */}
      {selectedProducer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-y-auto">
            <div className="relative">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-yellow-500 text-white p-8 rounded-t-3xl">
                <button
                  onClick={() => setSelectedProducer(null)}
                  className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 transform rotate-45" />
                </button>
                
                <div className="flex items-start gap-6">
                  <img 
                    src={selectedProducer.imageUrl} 
                    alt={selectedProducer.brand}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{selectedProducer.brand}</h2>
                    <p className="text-xl opacity-90 mb-4">{selectedProducer.name}</p>
                    
                    {selectedProducer.globalRanking && (
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <Crown className="w-5 h-5 text-yellow-300" />
                        <span className="font-bold">{selectedProducer.globalRanking}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Sobre o Produtor</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProducer.profileDescription}</p>
                </div>

                {/* Special Features */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Diferenciais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProducer.specialFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Produtos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProducer.products.map((product) => (
                      <div key={product.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-start gap-4 mb-4">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-16 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-1">{product.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{product.type}</p>
                            <div className="flex flex-wrap gap-1">
                              {product.varieties.map((variety, index) => (
                                <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                  {variety}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        
                        <div className="mb-3">
                          <h5 className="font-semibold text-gray-800 mb-1">Perfil Sensorial:</h5>
                          <p className="text-sm text-gray-600">{product.sensorProfile}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-800">Acidez: {product.acidity}</span>
                          {product.price && (
                            <span className="text-lg font-bold text-green-600">R$ {product.price}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Prêmios e Reconhecimentos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProducer.awards.map((award) => (
                      <div key={award.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {award.international ? (
                              <Globe className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Award className="w-5 h-5 text-green-600" />
                            )}
                            <span className="font-bold text-gray-800">{award.position}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-500">{award.year}</span>
                        </div>
                        
                        <h4 className="font-semibold text-gray-800 mb-1">{award.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{award.competition}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {award.country}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OliveOilsPage;
