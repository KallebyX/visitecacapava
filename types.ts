export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  points: number;
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  name:string;
  description: string;
  pointsOfInterest: string[]; // array of PointOfInterest ids
  imageUrl?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: (visitedIds: Set<string>, allPoiIds?: Set<string>) => boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, this would be a hash
  role: 'tourist' | 'hotel' | 'secretaria';
  avatarUrl: string;
  points: number;
  visited: { pointId: string; date: string }[];
  badges: string[]; // array of Badge ids
  routeProgress: { routeId: string; status: 'completed'; completedDate: string }[];
}


export type TravelReason = 'Turismo' | 'Negócio' | 'Convenção' | 'Férias' | 'Outros';
export type TransportMean = 'Automóvel' | 'Ônibus' | 'Outros';
export type DiscoveryChannel = 'Site' | 'Jornal' | 'TV' | 'Indicação de amigos' | 'Rede Social' | 'Outros';
export type OpinionScale = 'Péssimo' | 'Ruim' | 'Boa' | 'Muito boa' | 'Ótima';

export interface HotelCheckIn {
  id: string;
  hotelId: string;
  // Personal Info
  touristName: string;
  phone: string;
  profession: string;
  nationality: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'Masculino' | 'Feminino';
  idDocument: string;
  originCity: string;
  // Survey Info
  travelReason: TravelReason;
  transportMean: TransportMean;
  discoveryChannel: DiscoveryChannel;
  poiOpinion: OpinionScale;
  cityOpinion: OpinionScale;
  // Original fields
  checkInDate: string;
  checkOutDate: string;
}


declare global {
  const google: any;
  interface Window {
    google: any;
  }
}