import React, { useState, useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { backendService } from '../services/backendService';
import { Award, Star, MapPin, Edit } from 'lucide-react';
import BadgeIcon from '../components/BadgeIcon';
import type { Badge, PointOfInterest } from '../types';
import ProfileEditModal from '../components/ProfileEditModal';

const ProfilePage: React.FC = () => {
  const { currentUser } = useGamification();
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [visitedPois, setVisitedPois] = useState<(PointOfInterest & { visitDate: string })[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      backendService.getBadgesForUser(currentUser.id).then(setEarnedBadges);
      
      const fetchVisitedPois = async () => {
        const pois = await Promise.all(
          currentUser.visited.map(async (visit) => {
            const poi = await backendService.getPointOfInterestById(visit.pointId);
            return poi ? { ...poi, visitDate: visit.date } : null;
          })
        );
        setVisitedPois(pois.filter((p): p is PointOfInterest & { visitDate: string } => !!p).sort((a,b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()));
      };
      fetchVisitedPois();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 relative">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-32 h-32 rounded-full border-4 border-brand-light-green object-cover" />
        <div>
          <h1 className="text-4xl font-bold">{currentUser.name}</h1>
          <div className="flex items-center gap-6 mt-4 text-gray-600">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green">{currentUser.points}</div>
              <div className="text-sm">Pontos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green">{currentUser.visited.length}</div>
              <div className="text-sm">Locais Visitados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green">{earnedBadges.length}</div>
              <div className="text-sm">Conquistas</div>
            </div>
          </div>
        </div>
        <button onClick={() => setIsEditModalOpen(true)} className="absolute top-4 right-4 bg-brand-beige p-2 rounded-full hover:bg-brand-light-green/20 transition-colors">
            <Edit className="w-5 h-5 text-brand-dark-green" />
        </button>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Award className="text-brand-green" />Minhas Conquistas</h2>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {earnedBadges.map(badge => (
                <BadgeIcon key={badge.id} badge={badge} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Continue explorando para ganhar conquistas!</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><MapPin className="text-brand-green" />Histórico de Visitas</h2>
          <ul className="space-y-4">
            {visitedPois.map(poi => (
              <li key={poi.visitDate} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{poi.name}</p>
                  <p className="text-sm text-gray-500">Visitado em: {new Date(poi.visitDate).toLocaleDateString()}</p>
                </div>
                <span className="font-bold text-brand-green flex items-center gap-1">
                  +{poi.points} <Star size={16} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {isEditModalOpen && (
          <ProfileEditModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
