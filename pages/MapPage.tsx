import React, { useState } from 'react';
import { backendService } from '../services/backendService';
import type { PointOfInterest } from '../types';
import PointOfInterestModal from '../components/PointOfInterestModal';
import GoogleMapComponent from '../components/GoogleMapComponent';

const MapPage: React.FC = () => {
  const [points, setPoints] = useState<PointOfInterest[]>([]);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    backendService.getPointsOfInterest().then(data => {
      setPoints(data);
      setLoading(false);
    });
  }, []);

  const mapCenter = { lat: -30.5119, lng: -53.4908 }; // Caçapava do Sul center

  return (
    <div>
        <h1 className="text-4xl font-display text-center mb-2">Mapa Interativo</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Clique em um ponto no mapa para saber mais e fazer check-in.</p>
        
        <div className="relative w-full aspect-[4/3] bg-brand-light-green/20 rounded-2xl shadow-lg overflow-hidden border-4 border-white">
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <p>Carregando mapa...</p>
                </div>
            ) : (
                <GoogleMapComponent
                    center={mapCenter}
                    zoom={13}
                    pois={points}
                    onMarkerClick={setSelectedPoi}
                />
            )}
        </div>
        
         {selectedPoi && (
            <PointOfInterestModal 
                poi={selectedPoi}
                onClose={() => setSelectedPoi(null)}
            />
        )}
    </div>
  );
};

export default MapPage;