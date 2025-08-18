import React, { useState, useEffect } from 'react';
import { backendService } from '../../services/backendService';
import { Challenge } from '../../types';
import { Plus, Edit, Trash2, Calendar, Award } from 'lucide-react';

const ManageChallengesPage: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        loadChallenges();
    }, []);

    const loadChallenges = () => {
        setLoading(true);
        backendService.getChallenges().then(data => {
            setChallenges(data);
            setLoading(false);
        });
    };

    const handleOpenModal = (challenge: Challenge | null = null) => {
        setEditingChallenge(challenge);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingChallenge(null);
    };

    const handleSave = async (challengeData: Omit<Challenge, 'id'>) => {
        if (editingChallenge) {
            await backendService.updateChallenge(editingChallenge.id, challengeData);
        } else {
            await backendService.createChallenge(challengeData);
        }
        loadChallenges();
        handleCloseModal();
    };

    const handleDelete = async (challengeId: string) => {
        if (window.confirm('Tem certeza que deseja excluir este desafio?')) {
            await backendService.deleteChallenge(challengeId);
            loadChallenges();
        }
    };

    if (loading) return <p>Carregando desafios...</p>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">Gerenciar Desafios e Eventos</h1>
                <button onClick={() => handleOpenModal()} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Novo Desafio
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map(challenge => (
                    <div key={challenge.id} className="bg-white p-5 rounded-lg shadow-sm border flex flex-col justify-between">
                        <div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${challenge.type === 'event' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}`}>
                                {challenge.type === 'event' ? 'Evento' : 'Desafio'}
                            </span>
                            <h3 className="text-xl font-bold text-slate-800 mt-3">{challenge.title}</h3>
                            <p className="text-slate-600 text-sm my-2">{challenge.description}</p>
                            <div className="flex items-center text-amber-600 font-semibold">
                                <Award className="h-4 w-4 mr-1" /> {challenge.points} pontos
                            </div>
                            {challenge.type === 'event' && challenge.startDate && (
                                <div className="flex items-center text-slate-500 text-sm mt-2">
                                    <Calendar className="h-4 w-4 mr-1" /> 
                                    {new Date(challenge.startDate).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={() => handleOpenModal(challenge)} className="p-2 text-slate-500 hover:text-blue-600"><Edit className="h-5 w-5" /></button>
                            <button onClick={() => handleDelete(challenge.id)} className="p-2 text-slate-500 hover:text-red-600"><Trash2 className="h-5 w-5" /></button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <ChallengeModal challenge={editingChallenge} onSave={handleSave} onClose={handleCloseModal} />}
        </div>
    );
};

// Modal Component
interface ChallengeModalProps {
    challenge: Challenge | null;
    onSave: (challengeData: Omit<Challenge, 'id'>) => void;
    onClose: () => void;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ challenge, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        title: challenge?.title || '',
        description: challenge?.description || '',
        points: challenge?.points || 0,
        type: challenge?.type || 'challenge',
        startDate: challenge?.startDate ? challenge.startDate.split('T')[0] : '',
        endDate: challenge?.endDate ? challenge.endDate.split('T')[0] : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            points: Number(formData.points),
            startDate: formData.type === 'event' && formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
            endDate: formData.type === 'event' && formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        };
        onSave(dataToSave);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">{challenge ? 'Editar' : 'Novo'} Desafio/Evento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título" className="w-full p-2 border rounded" required />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descrição" className="w-full p-2 border rounded" required />
                    <input type="number" name="points" value={formData.points} onChange={handleChange} placeholder="Pontos" className="w-full p-2 border rounded" required />
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="challenge">Desafio</option>
                        <option value="event">Evento</option>
                    </select>
                    {formData.type === 'event' && (
                        <div className="flex space-x-4">
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" />
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                    )}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageChallengesPage;
