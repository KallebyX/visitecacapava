import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface NewsItemProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'evento' | 'turismo' | 'cultura' | 'gastronomia';
  imageUrl: string;
  location?: string;
}

const CategoryIcon = ({ category }: { category: NewsItemProps['category'] }) => {
  switch (category) {
    case 'evento': return <Calendar className="h-4 w-4" />;
    case 'turismo': return <MapPin className="h-4 w-4" />;
    case 'cultura': return <Users className="h-4 w-4" />;
    case 'gastronomia': return <Clock className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
};

const CategoryBadge = ({ category }: { category: NewsItemProps['category'] }) => {
  const categoryStyles = {
    evento: 'bg-purple-100 text-purple-800 border-purple-200',
    turismo: 'bg-blue-100 text-blue-800 border-blue-200',
    cultura: 'bg-green-100 text-green-800 border-green-200',
    gastronomia: 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const categoryLabels = {
    evento: 'Evento',
    turismo: 'Turismo',
    cultura: 'Cultura',
    gastronomia: 'Gastronomia'
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${categoryStyles[category]}`}>
      <CategoryIcon category={category} />
      {categoryLabels[category]}
    </span>
  );
};

const NewsCard: React.FC<{ news: NewsItemProps; featured?: boolean }> = ({ news, featured = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className={`relative ${featured ? 'h-72 md:h-96' : 'h-48 md:h-56'} overflow-hidden`}>
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={news.category} />
        </div>
        {news.location && (
          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {news.location}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Clock className="h-3 w-3" />
          {new Date(news.date).toLocaleDateString('pt-BR')}
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
          {news.title}
        </h3>
        
        <p className={`text-gray-600 ${featured ? 'text-base' : 'text-sm'}`}>
          {news.summary}
        </p>
        
        <button className="mt-3 text-brand-green font-medium text-sm hover:text-brand-dark-green transition-colors">
          Ler mais →
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
