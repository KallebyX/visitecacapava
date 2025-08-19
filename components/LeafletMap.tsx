import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { PointOfInterest } from '../types';

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
}

const LeafletMap: React.FC<LeafletMapProps> = ({ 
    center, 
    zoom = 14, 
    pois, 
    onMarkerClick,
    className = "w-full h-96"
}) => {
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
                {pois.map((poi) => (
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
