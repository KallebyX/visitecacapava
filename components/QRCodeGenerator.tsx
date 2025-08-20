import React, { useState } from 'react';
import { Download, QrCode, MapPin, Clock, Shield } from 'lucide-react';
import { generateQRCode } from '../utils/qrCodeSystem';
import { AUTHENTIC_POI_CACAPAVA } from '../data/authentic-pois';

interface QRCodeGeneratorProps {
  isAdmin?: boolean;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ isAdmin = false }) => {
  const [selectedPoi, setSelectedPoi] = useState<string>('');
  const [generatedQR, setGeneratedQR] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const generateQR = () => {
    if (!selectedPoi) {
      alert('Selecione um ponto turístico');
      return;
    }

    try {
      const qrString = generateQRCode(selectedPoi);
      setGeneratedQR(qrString);
      
      // Gerar QR Code visual (usando uma biblioteca simples)
      generateQRImage(qrString);
    } catch (error) {
      alert('Erro ao gerar QR Code: ' + error);
    }
  };

  const generateQRImage = (data: string) => {
    // Função simples para gerar QR Code visual
    // Em produção, usar uma biblioteca como qrcode
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 300;
    canvas.height = 300;
    
    // Fundo branco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300, 300);
    
    // Simular QR Code com padrão de quadrados
    const size = 10;
    const qrSize = 20;
    
    // Criar padrão baseado no hash dos dados
    const hash = data.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    for (let x = 0; x < qrSize; x++) {
      for (let y = 0; y < qrSize; y++) {
        const shouldFill = (hash + x * y) % 3 === 0;
        if (shouldFill) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x * size + 50, y * size + 50, size, size);
        }
      }
    }
    
    // Adicionar bordas de posicionamento
    ctx.fillStyle = 'black';
    // Canto superior esquerdo
    ctx.fillRect(50, 50, 70, 70);
    ctx.fillStyle = 'white';
    ctx.fillRect(60, 60, 50, 50);
    ctx.fillStyle = 'black';
    ctx.fillRect(70, 70, 30, 30);
    
    // Canto superior direito
    ctx.fillStyle = 'black';
    ctx.fillRect(180, 50, 70, 70);
    ctx.fillStyle = 'white';
    ctx.fillRect(190, 60, 50, 50);
    ctx.fillStyle = 'black';
    ctx.fillRect(200, 70, 30, 30);
    
    // Canto inferior esquerdo
    ctx.fillStyle = 'black';
    ctx.fillRect(50, 180, 70, 70);
    ctx.fillStyle = 'white';
    ctx.fillRect(60, 190, 50, 50);
    ctx.fillStyle = 'black';
    ctx.fillRect(70, 200, 30, 30);
    
    setQrDataUrl(canvas.toDataURL());
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    
    const poi = AUTHENTIC_POI_CACAPAVA.find(p => p.id === selectedPoi);
    const link = document.createElement('a');
    link.download = `qr-${poi?.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const copyQRCode = () => {
    if (!generatedQR) return;
    
    navigator.clipboard.writeText(generatedQR).then(() => {
      alert('Código QR copiado para a área de transferência!');
    });
  };

  if (!isAdmin) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <Shield className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Acesso restrito. Apenas administradores podem gerar QR Codes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <QrCode className="w-6 h-6 mr-2" />
          Gerador de QR Codes
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Configuração */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecionar Ponto Turístico
              </label>
              <select
                value={selectedPoi}
                onChange={(e) => setSelectedPoi(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
              >
                <option value="">Escolha um ponto turístico...</option>
                {AUTHENTIC_POI_CACAPAVA.map(poi => (
                  <option key={poi.id} value={poi.id}>
                    {poi.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedPoi && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Informações do Local</h3>
                {(() => {
                  const poi = AUTHENTIC_POI_CACAPAVA.find(p => p.id === selectedPoi);
                  return poi ? (
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{poi.lat.toFixed(4)}, {poi.lng.toFixed(4)}</span>
                      </div>
                      <p>{poi.description}</p>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Pontos: {poi.points}</span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            <button
              onClick={generateQR}
              disabled={!selectedPoi}
              className="w-full py-3 px-4 bg-brand-green text-white rounded-lg hover:bg-brand-dark-green disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Gerar QR Code
            </button>
          </div>

          {/* Resultado */}
          <div className="space-y-4">
            {qrDataUrl && (
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-3">QR Code Gerado</h3>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
                  <img src={qrDataUrl} alt="QR Code" className="w-64 h-64" />
                </div>
                
                <div className="mt-4 space-y-2">
                  <button
                    onClick={downloadQR}
                    className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Imagem
                  </button>
                  
                  <button
                    onClick={copyQRCode}
                    className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Copiar Código
                  </button>
                </div>
              </div>
            )}

            {generatedQR && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Dados do QR Code</h4>
                <textarea
                  value={generatedQR}
                  readOnly
                  className="w-full h-32 text-xs font-mono bg-white border border-gray-300 rounded p-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Instruções de segurança */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Instruções de Segurança</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Cada QR Code é válido por 24 horas</li>
            <li>• Contém hash de segurança para evitar falsificação</li>
            <li>• Verificação de proximidade geográfica obrigatória</li>
            <li>• Imprima e coloque em local protegido no ponto turístico</li>
            <li>• Substitua periodicamente para manter segurança</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
