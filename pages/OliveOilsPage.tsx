import React, { useState } from 'react';
import { Award, Leaf, MapPin, Star, Users, Calendar, Building2, Home, ChevronRight, ExternalLink, Globe, Trophy, Droplets, Eye, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const oliveOilProducers = [
  {
    name: 'Prosperato',
    image: '/api/placeholder/400/300',
    highlights: [
      'Marca mais premiada do Brasil (~300 prêmios)',
      'Reconhecida pelo guia Flos Olei (Itália) com 95/100 pontos em 2024 e 97/100 em 2025',
      'Líder do EVOO World Ranking 2024 como melhor produtora do hemisfério sul',
      'Selo Ouro de Azeite Extravirgem Premium RS',
      'Premiada em concursos na Itália, Grécia, EUA, Japão, Argentina e Israel',
      'Empório com degustação na BR-290 (Vila Progresso)',
      'Exporta para EUA e outros países',
      'Produção: ~200 ha, 35 mil litros/ano',
      'Experiência turística: degustação, loja, visitação',
    ],
    description: 'Líder nacional em prêmios e inovação, referência em qualidade e exportação. Destaque no Flos Olei e EVOO World Ranking. Empório aberto ao público com degustações.',
    awards: [
      'EVO IOOC 2024 – Ouro (Itália)',
      'Athena IOOC 2024 – Prata (Grécia)',
      'NYIOOC 2020 – Prata (EUA)',
      'Japan IOOC 2019 – Ouro',
      'Best in Class – NYIOOC 2019 – Ouro',
      'Gran Prestigio Oro – Olivinus 2017 (Argentina)',
      'Ouro – Terraolivo 2017 (Israel)',
      'Menção Honrosa – Leone d\'oro dei Mastri Oleari 2017 (Itália)'
    ],
    website: 'https://prosperato.com.br',
    location: 'BR-290, Vila Progresso, Caçapava do Sul',
    tastingNotes: ['Frutado intenso', 'Notas de ervas aromáticas', 'Amargor equilibrado', 'Picância suave'],
    category: 'Premium International'
  },
  {
    name: 'Don José',
    image: '/api/placeholder/400/300',
    highlights: [
      'Produção manual e comunitária na Fazenda Pitangueira',
      'Premiado com Selo Ibraoliva — Produtos Premium RS',
      'Tradição, autenticidade e turismo rural',
    ],
    description: 'Marca criada em Caçapava do Sul, símbolo de produção familiar e comunitária, premiada e com forte ligação ao turismo rural.',
    awards: ['Selo Ibraoliva – Produtos Premium RS'],
    website: '',
    location: 'Fazenda Pitangueira, Caçapava do Sul',
    tastingNotes: ['Sabor frutado', 'Aroma delicado', 'Textura sedosa'],
    category: 'Familiar Tradicional'
  },
  {
    name: 'Alma do Segredo',
    image: '/api/placeholder/400/300',
    highlights: [
      'Produção no Vale da Pedra do Segredo',
      'Azeite extra virgem, perfil sensorial equilibrado',
      'Notas de alcachofra, tomate, frutas frescas',
      'Processo mecânico a frio',
      'Premiado em concursos nacionais',
    ],
    description: 'Azeite de edição limitada, com perfil sensorial delicado e foco em certificações orgânicas. Premiado e referência gourmet local.',
    awards: ['Medalha de ouro em concurso nacional (2023)'],
    website: '',
    location: 'Vale da Pedra do Segredo, Caçapava do Sul',
    tastingNotes: ['Alcachofra', 'Tomate verde', 'Frutas frescas', 'Final persistente'],
    category: 'Gourmet Orgânico'
  },
];

const otherProducers = [
  'Vila do Segredo',
  'Costi Olivos', 
  'Nuance',
  'Guaritas',
  'Cerro dos Olivais',
  'Olivas São Pedro',
  'Olivas da Coxilha',
];

const OliveOilsPage: React.FC = () => {
  const [selectedProducer, setSelectedProducer] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'producers' | 'quality'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 to-yellow-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Droplets className="w-12 h-12 text-green-600 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-800 to-yellow-600 bg-clip-text text-transparent">
              Azeites Premium
            </h1>
            <Leaf className="w-12 h-12 text-yellow-600 ml-4" />
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            Caçapava do Sul: Capital Nacional do Azeite Extravirgem
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              300+ Prêmios Internacionais
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Exportado Mundialmente
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Star className="w-4 h-4" />
              Qualidade UNESCO
            </span>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
            {[
              { id: 'overview', label: 'Visão Geral', icon: Eye },
              { id: 'producers', label: 'Produtores', icon: Users },
              { id: 'quality', label: 'Qualidade', icon: Award }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Statistics */}
            <section className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-green-100">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800">300+</div>
                <div className="text-gray-600 font-medium">Prêmios Internacionais</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-green-100">
                <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800">10+</div>
                <div className="text-gray-600 font-medium">Países de Exportação</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-green-100">
                <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800">10+</div>
                <div className="text-gray-600 font-medium">Produtores Locais</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-green-100">
                <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800">1ª</div>
                <div className="text-gray-600 font-medium">D.O. do Rio Grande do Sul</div>
              </div>
            </section>

            {/* Fenazeite */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-green-600" />
                Festa Nacional do Azeite de Oliva (Fenazeite)
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    A Fenazeite é o maior evento anual de Caçapava do Sul, celebrando a cultura olivícola local. Em 2024, a 3ª edição reuniu cerca de 30 mil visitantes, com degustações, feira da agricultura familiar, shows, palestras, oficinas e passeios turísticos aos olivais.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-600" />
                      Mais de 20 mil pessoas em 2024
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Passeios turísticos a olivais e geossítios
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      Próxima edição: novembro de 2025
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Identidade local</span>
                  <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">Turismo & Gastronomia</span>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Reconhecimento internacional</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Producers Tab */}
        {activeTab === 'producers' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-green-800 text-center mb-8">Produtores de Azeite Premium</h2>
            
            {/* Main Producers */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {oliveOilProducers.map((producer, index) => (
                <div 
                  key={producer.name} 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    selectedProducer === index ? 'border-green-500 scale-105' : 'border-gray-100 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedProducer(selectedProducer === index ? null : index)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-green-800">{producer.name}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        {producer.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{producer.description}</p>
                    
                    {/* Tasting Notes */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Notas de Degustação
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {producer.tastingNotes.map((note, i) => (
                          <span key={i} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      {producer.location}
                    </div>

                    {/* Awards Preview */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-gray-700">Principais Prêmios</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {producer.awards.slice(0, 2).map((award, i) => (
                          <div key={i} className="truncate">• {award}</div>
                        ))}
                        {producer.awards.length > 2 && (
                          <div className="text-green-600 font-medium">+ {producer.awards.length - 2} outros prêmios</div>
                        )}
                      </div>
                    </div>

                    {/* Website Link */}
                    {producer.website && (
                      <a 
                        href={producer.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visitar Site
                      </a>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {selectedProducer === index && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                      <h4 className="font-bold text-gray-800 mb-3">Destaques Completos</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {producer.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Star className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="font-bold text-gray-800 mb-3 mt-6">Todos os Prêmios</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {producer.awards.map((award, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Trophy className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Other Producers */}
            <section className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-4">Outros Produtores Locais</h3>
              <div className="flex flex-wrap gap-3">
                {otherProducers.map((name) => (
                  <span key={name} className="bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Quality Tab */}
        {activeTab === 'quality' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-green-800 text-center mb-8">Qualidade e Certificações</h2>
            
            {/* Quality Standards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6" />
                  Reconhecimento Internacional
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Guia Flos Olei (Itália) - 95-97/100 pontos
                  </li>
                  <li className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    EVOO World Ranking - Melhor do Hemisfério Sul
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-green-500" />
                    Certificações: Itália, Grécia, EUA, Japão
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Building2 className="w-6 h-6" />
                  Selos e Certificações Nacionais
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Selo Ouro de Azeite Extravirgem Premium RS
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-green-500" />
                    Selo Ibraoliva - Produtos Premium RS
                  </li>
                  <li className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-green-500" />
                    Primeira D.O. (Denominação de Origem) do RS
                  </li>
                </ul>
              </div>
            </div>

            {/* Production Process */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Processo de Produção Premium</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Colheita</h4>
                  <p className="text-sm text-gray-600">Colheita manual no ponto ideal de maturação</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Extração</h4>
                  <p className="text-sm text-gray-600">Processo mecânico a frio, preservando qualidade</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Análise</h4>
                  <p className="text-sm text-gray-600">Controle rigoroso de qualidade e pureza</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Certificação</h4>
                  <p className="text-sm text-gray-600">Testes sensoriais e químicos internacionais</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Experimente Nossos Azeites Premium</h2>
          <p className="text-xl mb-6 opacity-90">
            Descubra os sabores únicos de Caçapava do Sul e faça parte da tradição olivícola brasileira
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Visitar Produtores
            </button>
            <button className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próxima Fenazeite
            </button>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="text-center text-gray-500 text-sm">
          <div className="mb-2 font-semibold">Fontes:</div>
          <p>Secretaria de Turismo/Geoparque Caçapava • Ibraoliva • Forbes Brasil • Sites oficiais dos produtores</p>
          <div className="mt-2">Atualizado em agosto de 2025</div>
        </div>
      </section>
    </div>
  );
};

export default OliveOilsPage;
