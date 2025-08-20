import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { X, Camera, Mail, Phone, Globe, Instagram, Facebook, Twitter, MapPin, Calendar, User } from 'lucide-react';

interface ProfileEditModalProps {
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ onClose }) => {
  const { currentUser, updateUserProfile } = useGamification();
  const [activeTab, setActiveTab] = useState('basic');
  
  // Basic Info
  const [name, setName] = useState(currentUser?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  
  // Personal Info
  const [birthDate, setBirthDate] = useState(currentUser?.birthDate || '');
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [hometown, setHometown] = useState(currentUser?.hometown || '');
  
  // Social Media
  const [instagram, setInstagram] = useState(currentUser?.socialMedia?.instagram || '');
  const [facebook, setFacebook] = useState(currentUser?.socialMedia?.facebook || '');
  const [twitter, setTwitter] = useState(currentUser?.socialMedia?.twitter || '');
  
  // Privacy Settings
  const [profilePublic, setProfilePublic] = useState(currentUser?.privacySettings?.profilePublic ?? true);
  const [showStats, setShowStats] = useState(currentUser?.privacySettings?.showStats ?? true);
  const [showVisits, setShowVisits] = useState(currentUser?.privacySettings?.showVisits ?? true);
  const [allowMessages, setAllowMessages] = useState(currentUser?.privacySettings?.allowMessages ?? true);
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateUserProfile(name, avatarUrl);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 relative">
            <h2 className="text-2xl font-bold text-center">Editar Perfil</h2>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-brand-dark-green">
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'basic', label: 'Informações Básicas', icon: User },
                { id: 'personal', label: 'Dados Pessoais', icon: Calendar },
                { id: 'social', label: 'Redes Sociais', icon: Globe },
                { id: 'privacy', label: 'Privacidade', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-brand-green text-brand-green'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  {/* Profile Photo */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img 
                        src={avatarUrl || 'https://picsum.photos/seed/you/200'} 
                        alt="Avatar Preview" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-brand-light-green" 
                      />
                      <button 
                        type="button"
                        className="absolute bottom-2 right-2 bg-brand-green text-white rounded-full p-2 hover:bg-brand-dark-green transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Telefone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(51) 99999-9999"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        URL da Foto de Perfil
                      </label>
                      <input
                        id="avatarUrl"
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://exemplo.com/foto.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      Biografia
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      placeholder="Conte um pouco sobre você e sua paixão por Caçapava do Sul..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                    />
                    <p className="text-xs text-gray-500 mt-1">{bio.length}/500 caracteres</p>
                  </div>
                </div>
              )}

              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Data de Nascimento
                      </label>
                      <input
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                        Gênero
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      >
                        <option value="">Selecionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="hometown" className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Cidade Natal
                      </label>
                      <input
                        id="hometown"
                        type="text"
                        value={hometown}
                        onChange={(e) => setHometown(e.target.value)}
                        placeholder="Ex: Porto Alegre, RS"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Redes Sociais</h3>
                  <p className="text-sm text-gray-600">Conecte suas redes sociais para que outros turistas possam te encontrar!</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                        <Instagram className="w-4 h-4 inline mr-1 text-pink-500" />
                        Instagram
                      </label>
                      <input
                        id="instagram"
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@seuperfil"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                        <Facebook className="w-4 h-4 inline mr-1 text-blue-600" />
                        Facebook
                      </label>
                      <input
                        id="facebook"
                        type="text"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        placeholder="facebook.com/seuperfil"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                        <Twitter className="w-4 h-4 inline mr-1 text-blue-400" />
                        Twitter/X
                      </label>
                      <input
                        id="twitter"
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="@seuperfil"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Configurações de Privacidade</h3>
                  <p className="text-sm text-gray-600">Controle quem pode ver suas informações e interagir com você.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Perfil Público</h4>
                        <p className="text-sm text-gray-600">Permitir que outros usuários vejam seu perfil</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profilePublic}
                          onChange={(e) => setProfilePublic(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Mostrar Estatísticas</h4>
                        <p className="text-sm text-gray-600">Exibir pontos, conquistas e rankings</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={showStats}
                          onChange={(e) => setShowStats(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Mostrar Visitas</h4>
                        <p className="text-sm text-gray-600">Permitir que outros vejam os locais que você visitou</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={showVisits}
                          onChange={(e) => setShowVisits(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Permitir Mensagens</h4>
                        <p className="text-sm text-gray-600">Receber mensagens de outros turistas</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={allowMessages}
                          onChange={(e) => setAllowMessages(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
