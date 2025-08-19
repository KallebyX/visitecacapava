import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Navigation, ExternalLink } from 'lucide-react';
import { backendService } from '../services/backendService';
import { formatNavigationButtons } from '../utils/navigationUtils';
import type { PointOfInterest } from '../types';

const AttractionsPage: React.FC = () => {
  const [attractions, setAttractions] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const pois = await backendService.getPointsOfInterest();
        setAttractions(pois);
      } catch (error) {
        console.error('Error fetching attractions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  const categories = [
    { id: 'all', name: 'Todas as Atrações', icon: '🌟' },
    { id: 'nature', name: 'Natureza', icon: '🏔️' },
    { id: 'history', name: 'História', icon: '🏛️' },
    { id: 'gastronomy', name: 'Gastronomia', icon: '🍽️' }
  ];

  const categorizeAttraction = (attraction: PointOfInterest): string[] => {
    const name = attraction.name.toLowerCase();
    const description = attraction.description.toLowerCase();
    
    const cats: string[] = [];
    
    if (name.includes('pedra') || name.includes('cascata') || name.includes('guaritas') || name.includes('minas')) {
      cats.push('nature');
    }
    if (name.includes('forte') || name.includes('casa') || name.includes('igreja') || name.includes('matriz')) {
      cats.push('history');
    }
    if (name.includes('churrascaria') || name.includes('doçaria') || description.includes('churrasco') || description.includes('doces')) {
      cats.push('gastronomy');
    }
    
    return cats.length > 0 ? cats : ['nature']; // default
  };

  const filteredAttractions = selectedCategory === 'all' 
    ? attractions 
    : attractions.filter(attraction => 
        categorizeAttraction(attraction).includes(selectedCategory)
      );

  const handleNavigation = (attraction: PointOfInterest) => {
    const links = formatNavigationButtons(attraction.lat, attraction.lng, attraction.name);
    
    if (navigator.userAgent.includes('Mobile')) {
      window.open(links.waze, '_blank');
    } else {
      const userChoice = confirm(`Navegar para ${attraction.name}?\n\nOK = Waze | Cancelar = Google Maps`);
      if (userChoice) {
        window.open(links.waze, '_blank');
      } else {
        window.open(links.googleMaps, '_blank');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-brand-dark-green mb-4">
          O que fazer em Caçapava do Sul
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Descubra as belezas naturais, a rica história e a gastronomia única da nossa cidade. 
          Cada atração conta uma história especial que torna Caçapava do Sul um destino inesquecível.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-brand-green text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-brand-green hover:text-brand-green'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAttractions.map(attraction => (
          <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image */}
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src={attraction.imageUrl} 
                alt={attraction.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x200/6CBC3A/FFFFFF?text=Caçapava+do+Sul';
                }}
              />
              <div className="absolute top-4 right-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                {attraction.points} pontos
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-dark-green mb-2">
                {attraction.name}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {attraction.longDescription || attraction.description}
              </p>

              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categorizeAttraction(attraction).map(cat => {
                  const category = categories.find(c => c.id === cat);
                  return category ? (
                    <span 
                      key={cat}
                      className="bg-brand-beige text-brand-dark-green px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category.icon} {category.name}
                    </span>
                  ) : null;
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleNavigation(attraction)}
                  className="flex-1 bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark-green transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Navigation size={18} />
                  Como Chegar
                </button>
                <button className="px-4 py-2 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors duration-200">
                  <Star size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAttractions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhuma atração encontrada
          </h3>
          <p className="text-gray-500">
            Tente selecionar uma categoria diferente
          </p>
        </div>
      )}

      {/* Highlights Section */}
      <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">✨ Destaques Especiais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-semibold mb-1">Azeites Premiados</h3>
            <p className="text-sm opacity-90">Mais de 300 prêmios internacionais</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🗿</div>
            <h3 className="font-semibold mb-1">Patrimônio Geológico</h3>
            <p className="text-sm opacity-90">Formações rochosas únicas no mundo</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Sistema de Pontos</h3>
            <p className="text-sm opacity-90">Ganhe pontos visitando as atrações</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionsPage;
