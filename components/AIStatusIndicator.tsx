import React from 'react';

interface AIStatusIndicatorProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  className?: string;
}

const AIStatusIndicator: React.FC<AIStatusIndicatorProps> = ({ status, message, className }) => {
  const getStatusIndicator = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex items-center space-x-2 text-blue-500">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{message || 'Gerando roteiro...'}</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center space-x-2 text-green-500">
            <span>✅</span>
            <span>{message || 'Roteiro gerado com sucesso!'}</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center space-x-2 text-red-500">
            <span>❌</span>
            <span>{message || 'Ocorreu um erro.'}</span>
          </div>
        );
      case 'idle':
      default:
        return null;
    }
  };

  return <div className={`my-4 ${className || ''}`}>{getStatusIndicator()}</div>;
};

export { AIStatusIndicator };
