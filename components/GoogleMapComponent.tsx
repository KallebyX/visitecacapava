import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsScript } from '../services/googleMapsLoader';
import { mapStyles } from '../mapStyles';
import type { PointOfInterest } from '../types';
import { AlertTriangle } from 'lucide-react';

interface GoogleMapComponentProps {
    center: { lat: number; lng: number };
    zoom?: number;
    pois: PointOfInterest[];
    onMarkerClick: (poi: PointOfInterest) => void;
    bounds?: any;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ center, zoom = 14, pois, onMarkerClick, bounds }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any | null>(null);
    const [markers, setMarkers] = useState<{ [key: string]: any }>({});
    const [mapError, setMapError] = useState<string | null>(null);

    // Load Maps Script and Initialize Map
    useEffect(() => {
        loadGoogleMapsScript().then(() => {
            if (mapRef.current && !map) {
                const newMap = new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                    styles: mapStyles,
                    disableDefaultUI: true,
                    zoomControl: true,
                });
                setMap(newMap);
            }
        }).catch(error => {
            console.error("Failed to load Google Maps:", error);
            setMapError("Não foi possível carregar o mapa. Verifique se a chave da API do Google Maps está configurada corretamente no ambiente.");
        });
    }, []); // Runs only once to initialize map

    // Update map center, bounds and zoom when props change
    useEffect(() => {
        if (map) {
            if (bounds) {
                map.fitBounds(bounds, 100); // 100px padding
            } else {
                map.setCenter(center);
                map.setZoom(zoom);
            }
        }
    }, [map, center, zoom, bounds]);
    
    // Manage Markers
    useEffect(() => {
        if (map) {
            // Clear old markers that are no longer in the pois list
            Object.keys(markers).forEach(poiId => {
                if (!pois.find(p => p.id === poiId)) {
                    markers[poiId].setMap(null);
                    delete markers[poiId];
                }
            });

            const newMarkers = { ...markers };
            pois.forEach(poi => {
                if (!newMarkers[poi.id]) {
                    const marker = new window.google.maps.Marker({
                        position: { lat: poi.lat, lng: poi.lng },
                        map,
                        title: poi.name,
                    });
                    
                    marker.addListener('click', () => {
                        onMarkerClick(poi);
                    });
                    
                    newMarkers[poi.id] = marker;
                }
            });
            setMarkers(newMarkers);
        }
    }, [map, pois, onMarkerClick]);

    if (mapError) {
        return (
            <div className="w-full h-full bg-red-100 flex flex-col p-4 text-center">
                <div className="flex-shrink-0">
                    <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                    <h3 className="font-bold text-red-700">Erro ao Carregar Mapa</h3>
                    <p className="text-xs text-red-600 mb-4">{mapError}</p>
                </div>
                <div className="flex-grow overflow-y-auto w-full text-left">
                    <h4 className="font-semibold text-gray-800 mb-2">Pontos de Interesse (visualização alternativa):</h4>
                    <div className="space-y-2">
                        {pois.map(poi => (
                            <button
                                key={poi.id}
                                onClick={() => onMarkerClick(poi)}
                                className="w-full flex items-center gap-4 p-2 bg-white/80 rounded-lg shadow-sm hover:bg-white transition-colors text-left"
                            >
                                <img src={poi.imageUrl} alt={poi.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-sm text-brand-dark-green">{poi.name}</p>
                                    <p className="text-xs text-gray-600">{poi.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMapComponent;