import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, MapPin, Camera, Star } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

interface AttractionHighlight {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  visitCount: number;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  duration: string;
  highlights: string[];
}

const attractionsData: AttractionHighlight[] = [
  {
    id: 'poi-1',
    name: 'Pedra do Segredo',
    description: 'Formação rochosa icônica com vista panorâmica de 360° da região. Uma das experiências mais marcantes de Caçapava do Sul.',
    imageUrl: 'https://i.ytimg.com/vi/bYf2-T20W0g/maxresdefault.jpg',
    category: 'Natureza',
    rating: 4.8,
    visitCount: 1247,
    difficulty: 'Moderado',
    duration: '2-3 horas',
    highlights: ['Vista panorâmica', 'Trilha moderada', 'Pôr do sol espetacular']
  },
  {
    id: 'poi-2',
    name: 'Minas do Camaquã',
    description: 'Complexo mineiro histórico com paisagens únicas e rica história da mineração de cobre no Brasil.',
    imageUrl: 'https://www.minasdocamaqua.com.br/wp-content/uploads/2019/08/Pr%C3%A9dio-do-escrit%C3%B3rio-da-CBC-1.jpg',
    category: 'História',
    rating: 4.6,
    visitCount: 892,
    difficulty: 'Fácil',
    duration: '1-2 horas',
    highlights: ['História da mineração', 'Arquitetura industrial', 'Paisagens únicas']
  },
  {
    id: 'poi-3',
    name: 'Cascata do Salso',
    description: 'Queda d\'água refrescante em meio à natureza exuberante. Perfeita para relaxar e se conectar com a natureza.',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/18/0a/73/cascata-do-salso.jpg',
    category: 'Natureza',
    rating: 4.5,
    visitCount: 756,
    difficulty: 'Fácil',
    duration: '1 hora',
    highlights: ['Banho refrescante', 'Trilha curta', 'Ideal para famílias']
  },
  {
    id: 'poi-4',
    name: 'Centro Histórico',
    description: 'Arquitetura colonial preservada que conta a história e tradições de Caçapava do Sul.',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Cultura',
    rating: 4.3,
    visitCount: 634,
    difficulty: 'Fácil',
    duration: '2 horas',
    highlights: ['Arquitetura histórica', 'Museus locais', 'Gastronomia típica']
  }
];

const AttractionsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % attractionsData.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + attractionsData.length) % attractionsData.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderado': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difícil': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Natureza': return 'bg-green-500';
      case 'História': return 'bg-amber-500';
      case 'Cultura': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-green to-brand-dark-green text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Principais Atrações</h3>
            <p className="text-brand-beige">Descubra os pontos mais visitados e bem avaliados</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-80 md:h-96">
            <img
              src={attractionsData[currentIndex].imageUrl}
              alt={attractionsData[currentIndex].name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(attractionsData[currentIndex].category)}`}>
                {attractionsData[currentIndex].category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(attractionsData[currentIndex].difficulty)}`}>
                {attractionsData[currentIndex].difficulty}
              </span>
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3 text-white">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{attractionsData[currentIndex].rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Camera className="h-4 w-4" />
                  <span>{attractionsData[currentIndex].visitCount}</span>
                </div>
              </div>
            </div>

            {/* Favorite button */}
            <div className="absolute top-4 right-4">
              <FavoriteButton 
                entityType="poi" 
                entityId={attractionsData[currentIndex].id}
                variant="overlay"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                {attractionsData[currentIndex].name}
              </h4>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {attractionsData[currentIndex].description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-2">Destaques:</h5>
                <div className="flex flex-wrap gap-2">
                  {attractionsData[currentIndex].highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-green/10 text-brand-green border border-brand-green/20"
                    >
                      ✨ {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Duração: {attractionsData[currentIndex].duration}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-brand-green text-white font-semibold py-3 px-4 rounded-lg hover:bg-brand-dark-green transition-colors">
                Saiba Mais
              </button>
              <button className="bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Ver no Mapa
              </button>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-4 right-4 bg-black/70 rounded-full px-3 py-1">
          <div className="flex gap-1">
            {attractionsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionsCarousel;
