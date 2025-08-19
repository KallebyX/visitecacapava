import React, { useState, useEffect } from 'react';
import { Accessibility, Eye, EyeOff, Type, Palette, Volume2 } from 'lucide-react';

const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    // Aplicar alto contraste
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    // Aplicar tamanho da fonte
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
    if (!screenReader) {
      // Ativar leitor de tela (simulado)
      announceToScreenReader('Leitor de tela ativado');
    }
  };

  const announceToScreenReader = (text: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = text;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <>
      {/* CSS para alto contraste */}
      <style>{`
        .high-contrast {
          filter: contrast(150%) brightness(120%);
        }
        .high-contrast * {
          border-color: #000 !important;
        }
        .high-contrast button:focus,
        .high-contrast input:focus,
        .high-contrast select:focus,
        .high-contrast textarea:focus {
          outline: 3px solid #ffff00 !important;
          outline-offset: 2px !important;
        }
      `}</style>

      {/* Botão de Acessibilidade */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all z-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Abrir painel de acessibilidade"
        title="Acessibilidade"
      >
        <Accessibility size={24} />
      </button>

      {/* Painel de Acessibilidade */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 bg-white rounded-xl shadow-2xl p-6 z-50 w-80 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Acessibilidade</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
              aria-label="Fechar painel"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Palette size={20} className="text-gray-600" />
                <span className="text-sm font-medium">Alto Contraste</span>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  highContrast ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label={`${highContrast ? 'Desativar' : 'Ativar'} alto contraste`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Tamanho da Fonte */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Type size={20} className="text-gray-600" />
                <span className="text-sm font-medium">Tamanho da Fonte</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Diminuir fonte"
                >
                  A-
                </button>
                <span className="text-sm px-2">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Aumentar fonte"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize(16)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Tamanho padrão"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Navegação por Teclado */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1">Navegação por Teclado</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><kbd className="bg-white px-1 rounded">Tab</kbd> - Navegar entre elementos</p>
                <p><kbd className="bg-white px-1 rounded">Enter</kbd> - Ativar botões</p>
                <p><kbd className="bg-white px-1 rounded">Esc</kbd> - Fechar modais</p>
              </div>
            </div>

            {/* VLibras Info */}
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">VLibras Ativo</h4>
              <p className="text-xs text-green-700">
                Tradutor de Libras disponível no canto inferior direito
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;
