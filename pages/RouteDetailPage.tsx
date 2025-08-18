import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { backendService } from '../services/backendService';
import PointOfInterestModal from '../components/PointOfInterestModal';
import GoogleMapComponent from '../components/GoogleMapComponent';
import type { PointOfInterest, Route } from '../types';
import { MapPin, Star } from 'lucide-react';

const RouteDetailPage: React.FC = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const [points, setPoints] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);

  useEffect(() => {
    if (!routeId) return;

    const fetchData = async () => {
      setLoading(true);
      const routeData = await backendService.getRouteById(routeId);
      if (routeData) {
        setRoute(routeData);
        const poisData = await Promise.all(
          routeData.pointsOfInterest.map(id => backendService.getPointOfInterestById(id))
        );
        setPoints(poisData.filter((p): p is PointOfInterest => !!p));
      }
      setLoading(false);
    };

    fetchData();
  }, [routeId]);

  const mapCenter = useMemo(() => {
    if (points.length === 0) return { lat: -30.5119, lng: -53.4908 }; // Default to Caçapava
    const avgLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
    const avgLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;
    return { lat: avgLat, lng: avgLng };
  }, [points]);
  
  const mapBounds = useMemo(() => {
    if (points.length < 2) return undefined;
    
    const lats = points.map(p => p.lat);
    const lngs = points.map(p => p.lng);
    
    return {
      north: Math.max(...lats),
      south: Math.min(...lats),
      east: Math.max(...lngs),
      west: Math.min(...lngs),
    };

  }, [points]);

  if (loading) {
    return <div className="text-center">Carregando detalhes da rota...</div>;
  }

  if (!route) {
    return <div className="text-center">Rota não encontrada.</div>;
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display mb-2">{route.name}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{route.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:h-[600px] flex flex-col space-y-4">
           <h2 className="text-2xl font-bold flex items-center gap-2"><MapPin className="text-brand-green"/> Pontos de Interesse</h2>
           <div className="flex-grow overflow-y-auto pr-2 space-y-4">
            {points.map(point => (
              <div key={point.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex">
                <img src={point.imageUrl} alt={point.name} className="w-24 h-24 object-cover" />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-bold">{point.name}</h3>
                    <p className="text-sm text-brand-green font-semibold flex items-center gap-1">{point.points} <Star size={14} /></p>
                  </div>
                  <button 
                      onClick={() => setSelectedPoi(point)}
                      className="text-sm self-start mt-2 font-bold text-brand-dark-green hover:text-brand-light-green transition-colors"
                  >
                      Ver Detalhes &rarr;
                  </button>
                </div>
              </div>
            ))}
           </div>
        </div>

        <div className="h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <GoogleMapComponent 
                center={mapCenter}
                pois={points}
                onMarkerClick={setSelectedPoi}
                bounds={mapBounds}
            />
        </div>
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

export default RouteDetailPage;