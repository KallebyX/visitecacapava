import React, { useState } from 'react';
import { Plus, Minus, History, AlertCircle } from 'lucide-react';
import { backendService } from '../../services/backendService';

interface PointsAdjustmentModalProps {
  userId: string;
  userName: string;
  currentPoints: number;
  isOpen: boolean;
  onClose: () => void;
  onPointsUpdated: (newPoints: number) => void;
}

const PointsAdjustmentModal: React.FC<PointsAdjustmentModalProps> = ({
  userId,
  userName,
  currentPoints,
  isOpen,
  onClose,
  onPointsUpdated
}) => {
  const [pointsChange, setPointsChange] = useState<string>('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadAuditHistory = async () => {
    try {
      const logs = await backendService.getPointsAuditLog(userId);
      setAuditLogs(logs);
      setShowHistory(true);
    } catch (err) {
      console.error('Error loading audit history:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointsChange || !reason.trim()) {
      setError('Informe o valor e motivo do ajuste');
      return;
    }

    const changeValue = parseInt(pointsChange);
    if (isNaN(changeValue) || changeValue === 0) {
      setError('Valor deve ser um número diferente de zero');
      return;
    }

    if (Math.abs(changeValue) > 500) {
      setError('Ajuste não pode exceder ±500 pontos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await backendService.adjustUserPoints(userId, changeValue, reason);
      const newPoints = Math.max(0, currentPoints + changeValue);
      onPointsUpdated(newPoints);
      setPointsChange('');
      setReason('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao ajustar pontos');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Ajustar Pontos</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Usuário: <span className="font-medium">{userName}</span></p>
          <p className="text-sm text-gray-600">Pontos atuais: <span className="font-medium text-amber-600">{currentPoints}</span></p>
        </div>

        {!showHistory ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ajuste de Pontos (máximo ±500)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={pointsChange}
                  onChange={(e) => setPointsChange(e.target.value)}
                  placeholder="Ex: +50 ou -25"
                  min="-500"
                  max="500"
                  className="w-full p-2 border rounded-md pr-16"
                  required
                />
                <div className="absolute right-2 top-2 flex space-x-1">
                  <button
                    type="button"
                    onClick={() => setPointsChange(pointsChange.startsWith('-') ? pointsChange.slice(1) : `+${pointsChange || '10'}`)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPointsChange(pointsChange.startsWith('-') ? pointsChange : `-${pointsChange || '10'}`)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Resultado: {Math.max(0, currentPoints + (parseInt(pointsChange) || 0))} pontos
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo do Ajuste
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Descreva o motivo do ajuste..."
                rows={3}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={loadAuditHistory}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <History className="h-4 w-4 mr-1" />
                Ver Histórico
              </button>

              <div className="space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-dark-green disabled:bg-gray-400"
                >
                  {loading ? 'Ajustando...' : 'Confirmar Ajuste'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Histórico de Ajustes</h4>
              <button
                onClick={() => setShowHistory(false)}
                className="text-sm text-brand-green hover:text-brand-dark-green"
              >
                ← Voltar
              </button>
            </div>

            {auditLogs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhum ajuste encontrado</p>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {auditLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-3 text-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {log.action === 'ADD_POINTS' ? (
                          <Plus className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <Minus className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={`font-medium ${log.action === 'ADD_POINTS' ? 'text-green-600' : 'text-red-600'}`}>
                          {log.pointsChange > 0 ? '+' : ''}{log.pointsChange} pontos
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(log.timestamp)}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{log.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {log.previousPoints} → {log.newPoints} pontos
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsAdjustmentModal;
