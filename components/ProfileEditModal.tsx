import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { X } from 'lucide-react';

interface ProfileEditModalProps {
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ onClose }) => {
  const { currentUser, updateUserProfile } = useGamification();
  const [name, setName] = useState(currentUser?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6">Editar Perfil</h2>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-brand-dark-green">
            <X size={24} />
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
                <img src={avatarUrl || 'https://picsum.photos/seed/you/200'} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover border-4 border-brand-light-green" />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">URL da Foto de Perfil</label>
              <input
                id="avatarUrl"
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-dark-green disabled:bg-gray-400"
              >
                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
