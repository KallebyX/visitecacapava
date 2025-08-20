import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsScript } from '../services/googleMapsLoader';
import { mapStyles } from '../mapStyles';
import type { PointOfInterest } from '../types';
import { ThematicRoute } from '../data/thematicRoutes';
import { AlertTriangle } from 'lucide-react';
import LeafletMap from './LeafletMap';

interface GoogleMapComponentProps {
    center: { lat: number; lng: number };
    zoom?: number;
    pois: PointOfInterest[];
    onMarkerClick: (poi: PointOfInterest) => void;
    bounds?: any;
    activeRoute?: ThematicRoute | null;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ 
    center, 
    zoom = 14, 
    pois, 
    onMarkerClick, 
    bounds, 
    activeRoute 
}) => {
    const [useLeaflet, setUseLeaflet] = useState(true); // Usar Leaflet por padrão
    
    // Usar sempre o Leaflet para evitar problemas de API
    return (
        <div className="w-full h-96">
            <LeafletMap
                center={center}
                zoom={zoom}
                pois={pois}
                onMarkerClick={onMarkerClick}
                className="w-full h-full"
                activeRoute={activeRoute}
            />
        </div>
    );
};

export default GoogleMapComponent;
