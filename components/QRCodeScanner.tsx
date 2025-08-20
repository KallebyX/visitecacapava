import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, CheckCircle, AlertCircle, MapPin, Trophy, Star } from 'lucide-react';
import { validateQRCode, CheckInResult, getCheckInAnalytics } from '../utils/qrCodeSystem';

interface QRCodeScannerProps {
  userId: string;
  onClose: () => void;
  onCheckInSuccess: (result: CheckInResult) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ 
  userId, 
  onClose, 
  onCheckInSuccess 
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Solicitar localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLocationError('Localização necessária para check-in. Por favor, permita o acesso.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationError('Seu dispositivo não suporta geolocalização.');
    }

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setIsScanning(true);
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Tente usar o código manual.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualCheckIn = () => {
    if (!manualCode.trim()) {
      alert('Por favor, digite o código do QR.');
      return;
    }

    if (!userLocation) {
      alert('Aguarde a obtenção da sua localização ou permita o acesso.');
      return;
    }

    const checkInResult = validateQRCode(manualCode, userLocation, userId);
    setResult(checkInResult);

    if (checkInResult.success) {
      onCheckInSuccess(checkInResult);
    }
  };

  const handleScanResult = (qrCode: string) => {
    if (!userLocation) {
      alert('Aguarde a obtenção da sua localização.');
      return;
    }

    const checkInResult = validateQRCode(qrCode, userLocation, userId);
    setResult(checkInResult);
    stopCamera();

    if (checkInResult.success) {
      onCheckInSuccess(checkInResult);
    }
  };

  // Simulação de captura de QR Code (em produção, usar uma biblioteca como react-qr-scanner)
  const captureQRCode = () => {
    // Por enquanto, vamos simular com um QR Code de exemplo
    const exampleQR = JSON.stringify({
      poiId: 'poi-authentic-1',
      timestamp: Date.now(),
      location: { lat: -30.5144, lng: -53.4883 },
      hash: 'exemplo-hash'
    });
    
    handleScanResult(exampleQR);
  };

  const analytics = getCheckInAnalytics(userId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Check-in QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Estatísticas do usuário */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-green">{analytics.totalCheckIns}</div>
              <div className="text-xs text-gray-600">Check-ins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">{analytics.totalPoints}</div>
              <div className="text-xs text-gray-600">Pontos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{analytics.badges}</div>
              <div className="text-xs text-gray-600">Medalhas</div>
            </div>
          </div>
        </div>

        {/* Status da localização */}
        {locationError && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{locationError}</p>
              </div>
            </div>
          </div>
        )}

        {userLocation && (
          <div className="p-4 bg-green-50 border-l-4 border-green-400">
            <div className="flex">
              <MapPin className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Localização obtida: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-4">
          {/* Scanner de câmera */}
          <div className="space-y-3">
            <h3 className="font-semibold">Escanear QR Code</h3>
            
            {!isScanning ? (
              <button
                onClick={startCamera}
                disabled={!userLocation}
                className="w-full flex items-center justify-center py-3 px-4 bg-brand-green text-white rounded-lg hover:bg-brand-dark-green disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Camera className="w-5 h-5 mr-2" />
                Abrir Câmera
              </button>
            ) : (
              <div className="space-y-3">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-48 bg-black rounded-lg"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={captureQRCode}
                    className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Capturar QR
                  </button>
                  <button
                    onClick={stopCamera}
                    className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Parar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Código manual */}
          <div className="space-y-3 border-t pt-4">
            <h3 className="font-semibold">Código Manual</h3>
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Digite o código do QR aqui..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
            <button
              onClick={handleManualCheckIn}
              disabled={!userLocation || !manualCode.trim()}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Fazer Check-in
            </button>
          </div>

          {/* Resultado do check-in */}
          {result && (
            <div className={`p-4 rounded-lg border-l-4 ${
              result.success ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
            }`}>
              <div className="flex">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
                <div className="ml-3">
                  <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                    {result.message}
                  </p>
                  {result.success && result.points && (
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold">+{result.points} pontos</span>
                      </div>
                      {result.badge && (
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 text-blue-400 mr-1" />
                          <span className="text-sm font-semibold">Nova medalha: {result.badge}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instruções */}
        <div className="p-4 bg-gray-50 border-t">
          <h4 className="font-semibold text-sm mb-2">Como funciona:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Aproxime-se do ponto turístico (até 100m)</li>
            <li>• Escaneie o QR Code no local ou digite o código</li>
            <li>• Ganhe pontos e medalhas por suas visitas</li>
            <li>• Sistema anti-fraude com verificação de localização</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
