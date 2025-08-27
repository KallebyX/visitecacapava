export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  website?: string;
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
  distance?: number; // distância em km
  estimatedTime?: number; // tempo estimado em minutos
  difficulty?: 'Fácil' | 'Moderado' | 'Difícil';
  category?: string;
  mapUrl?: string;
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
  role: 'tourist' | 'hotel' | 'secretaria' | 'restaurant';
  avatarUrl: string;
  points: number;
  visited: { pointId: string; date: string }[];
  badges: string[]; // array of Badge ids
  routeProgress: { routeId: string; status: 'completed'; completedDate: string }[];
  // New social features
  bio?: string;
  phone?: string;
  birthDate?: string;
  gender?: 'Masculino' | 'Feminino' | 'Outro';
  hometown?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  followers?: string[]; // array of User ids
  following?: string[]; // array of User ids
  joinDate?: string;
  verified?: boolean;
  privacySettings?: {
    profilePublic: boolean;
    showStats: boolean;
    showVisits: boolean;
    allowMessages: boolean;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'event' | 'challenge'; // Events can have a date, challenges are ongoing
  startDate?: string;
  endDate?: string;
  relatedPoiIds?: string[]; // Link challenges to specific points of interest
}

export interface Photo {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string;
  imageUrl: string;
  caption: string;
  location?: string; // Location where photo was taken
  poiId?: string; // Optional: link photo to a POI
  timestamp: string;
  likes: string[]; // Array of userIds who liked the photo
  tags?: string[]; // Optional: array of tags
  category?: string; // Optional: photo category (landscape, food, etc.)
}

export interface Favorite {
  id: string;
  userId: string;
  entityType: 'restaurant' | 'poi' | 'hotel';
  entityId: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  entityType: 'restaurant' | 'poi' | 'hotel';
  entityId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  helpful: number;
  notHelpful: number;
  response?: string;
  verified: boolean;
  user?: {
    name: string;
    avatarUrl: string;
  };
}

export interface GalleryLike {
  userId: string;
  photoId: string;
  createdAt: string;
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

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

declare global {
  const google: any;
  interface Window {
    google: any;
    gm_authFailure?: () => void;
  }
}
