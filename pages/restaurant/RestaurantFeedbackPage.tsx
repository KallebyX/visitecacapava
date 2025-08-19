import React, { useState } from 'react';
import { FaComment, FaUser, FaCalendar, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaTimes, FaReply } from 'react-icons/fa';

interface Feedback {
  id: string;
  customerName: string;
  type: 'suggestion' | 'complaint' | 'compliment';
  title: string;
  message: string;
  date: string;
  status: 'pending' | 'resolved' | 'investigating';
  priority: 'low' | 'medium' | 'high';
  response?: string;
  category: string;
}

const RestaurantFeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      customerName: 'Maria Silva',
      type: 'compliment',
      title: 'Excelente atendimento',
      message: 'Gostaria de elogiar o garçom Pedro pelo atendimento excepcional. Muito atencioso e simpático!',
      date: '2024-12-15',
      status: 'resolved',
      priority: 'low',
      response: 'Muito obrigado pelo feedback! Repassamos o elogio para o Pedro.',
      category: 'Atendimento'
    },
    {
      id: '2',
      customerName: 'João Santos',
      type: 'suggestion',
      title: 'Cardápio vegetariano',
      message: 'Seria interessante ter mais opções vegetarianas no cardápio. Atualmente as opções são limitadas.',
      date: '2024-12-14',
      status: 'investigating',
      priority: 'medium',
      category: 'Cardápio'
    },
    {
      id: '3',
      customerName: 'Ana Costa',
      type: 'complaint',
      title: 'Tempo de espera longo',
      message: 'Esperamos mais de 45 minutos pelo prato principal em um dia não tão movimentado.',
      date: '2024-12-13',
      status: 'pending',
      priority: 'high',
      category: 'Cozinha'
    },
    {
      id: '4',
      customerName: 'Pedro Oliveira',
      type: 'suggestion',
      title: 'Música ambiente',
      message: 'A música estava muito alta durante o almoço. Seria bom diminuir o volume.',
      date: '2024-12-12',
      status: 'resolved',
      priority: 'low',
      response: 'Obrigado pela sugestão! Ajustamos o volume da música.',
      category: 'Ambiente'
    }
  ]);

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [newResponse, setNewResponse] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'suggestion' | 'complaint' | 'compliment'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'investigating' | 'resolved'>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <FaLightbulb color="#3b82f6" />;
      case 'complaint': return <FaExclamationTriangle color="#dc2626" />;
      case 'compliment': return <FaCheckCircle color="#16a34a" />;
      default: return <FaComment />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'suggestion': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'complaint': return 'bg-red-50 text-red-700 border-red-200';
      case 'compliment': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResponse = () => {
    if (selectedFeedback && newResponse.trim()) {
      setFeedbacks(prev => prev.map(feedback => 
        feedback.id === selectedFeedback.id 
          ? { ...feedback, response: newResponse, status: 'resolved' as const }
          : feedback
      ));
      setNewResponse('');
      setSelectedFeedback(null);
    }
  };

  const updateStatus = (feedbackId: string, newStatus: 'pending' | 'investigating' | 'resolved') => {
    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, status: newStatus }
        : feedback
    ));
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesType = filterType === 'all' || feedback.type === filterType;
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const totalFeedbacks = feedbacks.length;
  const pendingFeedbacks = feedbacks.filter(f => f.status === 'pending').length;
  const complaintsFeedbacks = feedbacks.filter(f => f.type === 'complaint').length;
  const suggestionsFeedbacks = feedbacks.filter(f => f.type === 'suggestion').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-brand-dark-green mb-4">
          Feedback dos Clientes
        </h1>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaComment size={24} color="#3b82f6" />
              <div>
                <p className="text-2xl font-bold text-blue-700">{totalFeedbacks}</p>
                <p className="text-sm text-blue-600">Total de Feedbacks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle size={24} color="#eab308" />
              <div>
                <p className="text-2xl font-bold text-yellow-700">{pendingFeedbacks}</p>
                <p className="text-sm text-yellow-600">Pendentes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle size={24} color="#dc2626" />
              <div>
                <p className="text-2xl font-bold text-red-700">{complaintsFeedbacks}</p>
                <p className="text-sm text-red-600">Reclamações</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaLightbulb size={24} color="#16a34a" />
              <div>
                <p className="text-2xl font-bold text-green-700">{suggestionsFeedbacks}</p>
                <p className="text-sm text-green-600">Sugestões</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Tipo:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Todos</option>
              <option value="compliment">Elogios</option>
              <option value="suggestion">Sugestões</option>
              <option value="complaint">Reclamações</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendente</option>
              <option value="investigating">Investigando</option>
              <option value="resolved">Resolvido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="space-y-4">
        {filteredFeedbacks.map(feedback => (
          <div key={feedback.id} className="bg-white rounded-xl shadow-lg p-6">
            {/* Feedback Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getTypeIcon(feedback.type)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{feedback.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(feedback.type)}`}>
                      {feedback.type === 'suggestion' && 'Sugestão'}
                      {feedback.type === 'complaint' && 'Reclamação'}
                      {feedback.type === 'compliment' && 'Elogio'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaUser size={12} />
                      {feedback.customerName}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendar size={12} />
                      {new Date(feedback.date).toLocaleDateString('pt-BR')}
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {feedback.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(feedback.priority)}`}>
                  {feedback.priority === 'high' && 'Alta'}
                  {feedback.priority === 'medium' && 'Média'}
                  {feedback.priority === 'low' && 'Baixa'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(feedback.status)}`}>
                  {feedback.status === 'pending' && 'Pendente'}
                  {feedback.status === 'investigating' && 'Investigando'}
                  {feedback.status === 'resolved' && 'Resolvido'}
                </span>
              </div>
            </div>

            {/* Feedback Content */}
            <p className="text-gray-700 mb-4">{feedback.message}</p>

            {/* Response */}
            {feedback.response && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaReply size={14} color="#3b82f6" />
                  <span className="text-sm font-semibold text-blue-700">
                    Resposta do Restaurante
                  </span>
                </div>
                <p className="text-blue-700 text-sm">{feedback.response}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!feedback.response && (
                <button
                  onClick={() => setSelectedFeedback(feedback)}
                  className="bg-brand-green text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-dark-green transition-colors flex items-center gap-2"
                >
                  <FaReply size={14} />
                  Responder
                </button>
              )}
              
              {feedback.status !== 'resolved' && (
                <button
                  onClick={() => updateStatus(feedback.id, 'investigating')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Investigar
                </button>
              )}
              
              {feedback.status !== 'resolved' && (
                <button
                  onClick={() => updateStatus(feedback.id, 'resolved')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  Marcar como Resolvido
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredFeedbacks.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <FaComment size={48} color="#d1d5db" className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum feedback encontrado
          </h3>
          <p className="text-gray-500">
            Não há feedbacks que correspondam aos filtros selecionados.
          </p>
        </div>
      )}

      {/* Response Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-brand-dark-green">
                Responder Feedback
              </h3>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-1">
                {selectedFeedback.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {selectedFeedback.message}
              </p>
            </div>
            
            <textarea
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              placeholder="Digite sua resposta..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleResponse}
                disabled={!newResponse.trim()}
                className="flex-1 bg-brand-green text-white py-2 px-4 rounded-lg hover:bg-brand-dark-green transition-colors disabled:opacity-50"
              >
                Enviar Resposta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantFeedbackPage;
