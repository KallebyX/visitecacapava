import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { backendService } from '../services/backendService';
import { Crown, Medal, Award, Trophy, Star, TrendingUp, Users, Target, Zap } from 'lucide-react';
import type { User } from '../types';

const RankIcon: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
  if (rank === 1) return <Medal className="w-6 h-6 text-gray-400" />;
  if (rank === 2) return <Award className="w-6 h-6 text-yellow-600" />;
  return <span className="font-bold text-gray-500 w-6 text-center">{rank + 1}</span>;
};

const LeaderboardPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backendService.getLeaderboard().then(users => {
      setSortedUsers(users);
      setLoading(false);
    });
  }, []);

  if(loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando ranking...</p>
          </div>
        </div>
      );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl overflow-hidden py-16 px-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4 opacity-20">
          <Trophy className="w-32 h-32" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Crown className="w-24 h-24" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              <TrendingUp className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">🏆 Hall da Fama</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Os maiores exploradores de Caçapava do Sul
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{sortedUsers.length}</div>
              <div className="text-sm opacity-80">Exploradores Ativos</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{sortedUsers.reduce((sum, user) => sum + user.visited.length, 0)}</div>
              <div className="text-sm opacity-80">Locais Visitados</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{sortedUsers.reduce((sum, user) => sum + user.points, 0)}</div>
              <div className="text-sm opacity-80">Pontos Totais</div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Como Funciona o Sistema de Pontuação</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Visite Pontos Turísticos</h3>
            <p className="text-gray-600 text-sm">Ganhe 10-50 pontos por check-in em cada atração</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Complete Desafios</h3>
            <p className="text-gray-600 text-sm">Desafios especiais rendem 100-500 pontos</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Conquiste Badges</h3>
            <p className="text-gray-600 text-sm">Badges especiais dão bônus de pontuação</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Suba no Ranking</h3>
            <p className="text-gray-600 text-sm">Dispute o topo com outros exploradores</p>
          </div>
        </div>
      </section>

      {/* Ranking */}
      <section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🥇 Ranking dos Exploradores</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Pódio dos Top 3 */}
            {sortedUsers.length >= 3 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 border-b">
                <div className="flex justify-center items-end gap-8">
                  {/* 2º Lugar */}
                  <div className="text-center">
                    <div className="relative">
                      <img 
                        src={sortedUsers[1]?.avatarUrl} 
                        alt={sortedUsers[1]?.name} 
                        className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-gray-300 object-cover" 
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-300 rounded-full p-2">
                        <Medal className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">{sortedUsers[1]?.name}</h3>
                    <p className="text-2xl font-black text-gray-600">{sortedUsers[1]?.points} pts</p>
                    <div className="bg-gray-200 h-20 w-20 mx-auto mt-4 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-2xl font-bold text-gray-600">2</span>
                    </div>
                  </div>

                  {/* 1º Lugar */}
                  <div className="text-center">
                    <div className="relative">
                      <img 
                        src={sortedUsers[0]?.avatarUrl} 
                        alt={sortedUsers[0]?.name} 
                        className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-yellow-400 object-cover" 
                      />
                      <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl">{sortedUsers[0]?.name}</h3>
                    <p className="text-3xl font-black text-yellow-600">{sortedUsers[0]?.points} pts</p>
                    <div className="bg-yellow-400 h-28 w-24 mx-auto mt-4 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-3xl font-bold text-white">1</span>
                    </div>
                  </div>

                  {/* 3º Lugar */}
                  <div className="text-center">
                    <div className="relative">
                      <img 
                        src={sortedUsers[2]?.avatarUrl} 
                        alt={sortedUsers[2]?.name} 
                        className="w-18 h-18 rounded-full mx-auto mb-3 border-4 border-yellow-600 object-cover" 
                      />
                      <div className="absolute -top-2 -right-2 bg-yellow-600 rounded-full p-1">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">{sortedUsers[2]?.name}</h3>
                    <p className="text-2xl font-black text-yellow-700">{sortedUsers[2]?.points} pts</p>
                    <div className="bg-yellow-600 h-16 w-18 mx-auto mt-4 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-xl font-bold text-white">3</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lista Completa */}
            <div className="p-6 space-y-3">
              {sortedUsers.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center p-4 rounded-xl transition-all ${
                    user.id === currentUser?.id
                      ? 'bg-brand-light-green/20 border-2 border-brand-light-green shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    <RankIcon rank={index} />
                  </div>
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full mx-4 object-cover border-2 border-gray-200" 
                  />
                  <div className="flex-grow">
                    <p className="font-bold text-lg">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.visited.length} locais visitados</p>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-xl text-brand-green">{user.points}</div>
                    <div className="text-sm text-gray-500">pontos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaderboardPage;