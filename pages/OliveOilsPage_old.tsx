import React, { useState } from 'react';
import { Award, Star, MapPin, ExternalLink, Trophy, Medal, Globe, Calendar } from 'lucide-react';

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
}

interface Award {
  id: string;
  name: string;
  year: number;
  category: string;
  position: string; // "1º Lugar", "Medalha de Ouro", etc.
  competition: string;
  country: string;
  international: boolean;
}

interface OliveOilProduct {
  id: string;
  name: string;
  type: string; // Extra Virgem, Azeite Aromatizado, etc.
  description: string;
  awards: string[];
  imageUrl: string;
  price?: number;
  availability: 'available' | 'limited' | 'sold-out';
}

const OliveOilsPage: React.FC = () => {
  const [selectedProducer, setSelectedProducer] = useState<OliveOilProducer | null>(null);
  const [activeTab, setActiveTab] = useState<'producers' | 'awards' | 'products'>('producers');

  // Mock data baseado em produtores reais da região
  const producers: OliveOilProducer[] = [
    {
      id: '1',
      name: 'Olivícola Família Oliveira',
      brand: 'Quinta do Vale',
      description: 'Pioneiros na olivicultura no Rio Grande do Sul, com mais de 20 anos de tradição e excelência na produção de azeites extra virgem premium.',
      location: 'Distrito de Ferreira, Caçapava do Sul',
      lat: -30.5200,
      lng: -53.5100,
      founded: 2003,
      website: 'https://quintadovale.com.br',
      imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="#6CBC3A"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Quinta do Vale</text></svg>'),
      certifications: ['Orgânico', 'Fair Trade', 'ISO 9001'],
      tourAvailable: true,
      awards: [
        {
          id: '1',
          name: 'Melhor Azeite Extra Virgem',
          year: 2023,
          category: 'Extra Virgem Frutado',
          position: '1º Lugar',
          competition: 'Concurso Internacional de Azeites',
          country: 'Argentina',
          international: true
        },
        {
          id: '2',
          name: 'Medalha de Ouro',
          year: 2023,
          category: 'Blend Premium',
          position: 'Medalha de Ouro',
          competition: 'NYIOOC World Olive Oil Competition',
          country: 'Estados Unidos',
          international: true
        },
        {
          id: '3',
          name: 'Grande Prêmio Nacional',
          year: 2022,
          category: 'Azeite Monovarietal',
          position: '1º Lugar',
          competition: 'Prêmio Brasileiro de Azeites',
          country: 'Brasil',
          international: false
        }
      ],
      products: [
        {
          id: '1',
          name: 'Quinta do Vale Premium',
          type: 'Extra Virgem',
          description: 'Azeite monovarietal Picual, com notas frutadas intensas e final amendoado.',
          awards: ['NYIOOC 2023 - Ouro', 'Concurso Argentina 2023 - 1º'],
          imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><rect width="200" height="300" fill="#FFD700"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="black" text-anchor="middle" dy=".3em">Premium</text></svg>'),
          price: 89.90,
          availability: 'available'
        },
        {
          id: '2',
          name: 'Quinta do Vale Blend',
          type: 'Extra Virgem Blend',
          description: 'Harmoniosa combinação de variedades, equilibrio perfeito entre frutado e picante.',
          awards: ['Prêmio Brasil 2022 - 1º'],
          imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><rect width="200" height="300" fill="#228B22"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Blend</text></svg>'),
          price: 65.90,
          availability: 'available'
        }
      ]
    },
    {
      id: '2',
      name: 'Olivícola Terra Gaúcha',
      brand: 'Olivas do Sul',
      description: 'Produção artesanal com técnicas tradicionais mediterrâneas adaptadas ao terroir gaúcho único.',
      location: 'Localidade de Minas do Camaquã',
      lat: -30.5300,
      lng: -53.5200,
      founded: 2008,
      imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="#8B4513"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Terra Gaúcha</text></svg>'),
      certifications: ['Rainforest Alliance', 'Produção Sustentável'],
      tourAvailable: true,
      awards: [
        {
          id: '4',
          name: 'Melhor Azeite Regional',
          year: 2023,
          category: 'Azeite Regional',
          position: '1º Lugar',
          competition: 'Concurso Sul Americano',
          country: 'Chile',
          international: true
        }
      ],
      products: [
        {
          id: '3',
          name: 'Olivas do Sul Reserva',
          type: 'Extra Virgem',
          description: 'Edição limitada com oliveiras centenárias, sabor intenso e complexo.',
          awards: ['Sul Americano 2023 - 1º'],
          imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><rect width="200" height="300" fill="#8B0000"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Reserva</text></svg>'),
          price: 125.00,
          availability: 'limited'
        }
      ]
    }
  ];

  const getAllAwards = () => {
    return producers.flatMap(producer => 
      producer.awards.map(award => ({ ...award, producer: producer.name, brand: producer.brand }))
    ).sort((a, b) => b.year - a.year);
  };

  const getAllProducts = () => {
    return producers.flatMap(producer => 
      producer.products.map(product => ({ ...product, producer: producer.name, brand: producer.brand }))
    );
  };

  const getAwardIcon = (position: string) => {
    if (position.includes('1º') || position.includes('Ouro')) return '🥇';
    if (position.includes('2º') || position.includes('Prata')) return '🥈';
    if (position.includes('3º') || position.includes('Bronze')) return '🥉';
    return '🏆';
  };

  const totalAwards = getAllAwards().length;
  const internationalAwards = getAllAwards().filter(award => award.international).length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative p-8 md:p-12 text-white text-center">
          <div className="text-6xl mb-4">🫒</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Azeites Premiados de Caçapava
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Descoberta a olivicultura gaúcha que conquista o mundo! 
            Mais de <strong>{totalAwards} prêmios</strong>, sendo <strong>{internationalAwards} internacionais</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              🏆 {totalAwards} Prêmios Totais
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              🌍 {internationalAwards} Internacionais
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              🏭 {producers.length} Produtores
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-1 flex">
          {[
            { id: 'producers', label: 'Produtores', icon: '🏭' },
            { id: 'awards', label: 'Prêmios', icon: '🏆' },
            { id: 'products', label: 'Produtos', icon: '🫒' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-brand-green text-white shadow-md'
                  : 'text-gray-600 hover:text-brand-green'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Producers Tab */}
      {activeTab === 'producers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {producers.map(producer => (
            <div key={producer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={producer.imageUrl} 
                  alt={producer.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {producer.awards.length} Prêmios
                </div>
                {producer.tourAvailable && (
                  <div className="absolute top-4 left-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Visitas
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark-green mb-1">
                      {producer.brand}
                    </h3>
                    <p className="text-gray-600 text-sm">{producer.name}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar size={14} />
                      Desde {producer.founded}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  {producer.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin size={14} />
                  {producer.location}
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {producer.certifications.map(cert => (
                    <span key={cert} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      ✓ {cert}
                    </span>
                  ))}
                </div>

                {/* Recent Awards Preview */}
                <div className="border-t pt-4 mb-4">
                  <h4 className="font-semibold text-brand-dark-green mb-2">Prêmios Recentes</h4>
                  {producer.awards.slice(0, 2).map(award => (
                    <div key={award.id} className="flex items-center justify-between mb-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span>{getAwardIcon(award.position)}</span>
                        <span className="font-medium">{award.name}</span>
                      </div>
                      <span className="text-gray-500">{award.year}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedProducer(producer)}
                    className="flex-1 bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark-green transition-colors duration-200"
                  >
                    Ver Detalhes
                  </button>
                  {producer.website && (
                    <button
                      onClick={() => window.open(producer.website, '_blank')}
                      className="px-4 py-2 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors duration-200"
                    >
                      <ExternalLink size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Awards Tab */}
      {activeTab === 'awards' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-dark-green mb-2">
              🏆 Galeria de Prêmios
            </h2>
            <p className="text-gray-600">
              Reconhecimento internacional da qualidade excepcional dos azeites de Caçapava
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllAwards().map(award => (
              <div key={`${award.id}-${award.producer}`} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{getAwardIcon(award.position)}</div>
                  <h3 className="font-bold text-brand-dark-green mb-1">{award.name}</h3>
                  <p className="text-sm text-gray-600">{award.brand}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Posição:</span>
                    <span className="font-semibold text-yellow-600">{award.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Categoria:</span>
                    <span className="font-medium">{award.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Competição:</span>
                    <span className="font-medium">{award.competition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">País:</span>
                    <span className="font-medium flex items-center gap-1">
                      {award.international && <Globe size={12} className="text-blue-500" />}
                      {award.country}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ano:</span>
                    <span className="font-bold text-brand-green">{award.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-dark-green mb-2">
              🫒 Produtos Premiados
            </h2>
            <p className="text-gray-600">
              Azeites extra virgem de qualidade internacional disponíveis para degustação e compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllProducts().map(product => (
              <div key={`${product.id}-${product.producer}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Product Image */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    product.availability === 'available' ? 'bg-green-500 text-white' :
                    product.availability === 'limited' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {product.availability === 'available' ? 'Disponível' :
                     product.availability === 'limited' ? 'Limitado' : 'Esgotado'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-brand-dark-green mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <span className="bg-brand-beige text-brand-dark-green px-2 py-1 rounded text-xs font-medium">
                      {product.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  {/* Awards */}
                  {product.awards.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-brand-dark-green text-sm mb-2">Prêmios:</h4>
                      {product.awards.map((award, index) => (
                        <span key={index} className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-2 mb-1">
                          🏆 {award}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  {product.price && (
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-brand-green">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <button 
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          product.availability === 'available' 
                            ? 'bg-brand-green text-white hover:bg-brand-dark-green'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={product.availability !== 'available'}
                      >
                        {product.availability === 'available' ? 'Contatar' : 'Indisponível'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Producer Detail Modal */}
      {selectedProducer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Header Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={selectedProducer.imageUrl} 
                  alt={selectedProducer.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProducer(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-3xl font-bold text-brand-dark-green mb-2">
                  {selectedProducer.brand}
                </h2>
                <p className="text-gray-600 mb-4">{selectedProducer.name}</p>
                
                <p className="text-gray-700 mb-6">{selectedProducer.description}</p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Awards */}
                  <div>
                    <h3 className="text-xl font-semibold text-brand-dark-green mb-3">🏆 Prêmios</h3>
                    <div className="space-y-3">
                      {selectedProducer.awards.map(award => (
                        <div key={award.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold">{award.name}</span>
                            <span className="text-2xl">{getAwardIcon(award.position)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{award.competition} • {award.year}</p>
                          <p className="text-xs text-gray-500">{award.category} • {award.country}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <h3 className="text-xl font-semibold text-brand-dark-green mb-3">🫒 Produtos</h3>
                    <div className="space-y-3">
                      {selectedProducer.products.map(product => (
                        <div key={product.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold">{product.name}</span>
                            {product.price && (
                              <span className="text-brand-green font-bold">R$ {product.price.toFixed(2)}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <span className="bg-brand-beige text-brand-dark-green px-2 py-1 rounded text-xs">
                            {product.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-brand-beige p-4 rounded-lg">
                  <h3 className="font-semibold text-brand-dark-green mb-2">📍 Informações para Visita</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    <MapPin className="inline mr-1" size={14} />
                    {selectedProducer.location}
                  </p>
                  {selectedProducer.tourAvailable && (
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Visitas guiadas disponíveis (agendar previamente)
                    </p>
                  )}
                  {selectedProducer.website && (
                    <button
                      onClick={() => window.open(selectedProducer.website, '_blank')}
                      className="mt-2 bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-dark-green transition-colors"
                    >
                      Visitar Site
                    </button>
                  )}
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
