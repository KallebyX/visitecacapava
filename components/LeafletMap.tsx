import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { PointOfInterest } from '../types';
import { ThematicRoute } from '../data/thematicRoutes';

// Configure default icon with a more basic approach
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
    center: { lat: number; lng: number };
    zoom?: number;
    pois: PointOfInterest[];
    onMarkerClick: (poi: PointOfInterest) => void;
    className?: string;
    activeRoute?: ThematicRoute | null;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ 
    center, 
    zoom = 14, 
    pois, 
    onMarkerClick,
    className = "w-full h-96",
    activeRoute
}) => {
    // Criar ícones especiais para rota ativa
    const createRouteIcon = (color: string, step: number) => {
        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px;">${step}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
    };

    // Obter coordenadas da rota para desenhar linha
    const getRouteCoordinates = () => {
        if (!activeRoute) return [];
        return activeRoute.steps.map(step => [step.poi.lat, step.poi.lng] as [number, number]);
    };

    return (
        <div className={className}>
            <MapContainer 
                center={[center.lat, center.lng]} 
                zoom={zoom} 
                className="w-full h-full rounded-lg"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Linha da rota ativa */}
                {activeRoute && (
                    <Polyline
                        positions={getRouteCoordinates()}
                        color={activeRoute.color}
                        weight={4}
                        opacity={0.8}
                        dashArray="10, 5"
                    />
                )}
                
                {/* Marcadores da rota ativa */}
                {activeRoute && activeRoute.steps.map((step, index) => (
                    <Marker
                        key={`route-${step.poi.id}`}
                        position={[step.poi.lat, step.poi.lng]}
                        icon={createRouteIcon(activeRoute.color, step.order)}
                        eventHandlers={{
                            click: () => onMarkerClick(step.poi),
                        }}
                    >
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-bold text-sm">{step.poi.name}</h3>
                                <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                                <div className="flex items-center justify-center mt-2 space-x-2 text-xs">
                                    <span>⏱️ {step.estimatedTime}min</span>
                                    <span>🏆 {step.poi.points}pts</span>
                                </div>
                                {step.hint && (
                                    <p className="text-xs text-blue-600 italic mt-1">💡 {step.hint}</p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                
                {/* Marcadores normais (apenas se não houver rota ativa) */}
                {!activeRoute && pois.map((poi) => (
                    <Marker
                        key={poi.id}
                        position={[poi.lat, poi.lng]}
                        eventHandlers={{
                            click: () => onMarkerClick(poi),
                        }}
                    >
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-semibold">{poi.name}</h3>
                                <p className="text-sm text-gray-600">{poi.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default LeafletMap;
