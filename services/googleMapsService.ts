// Google Maps Places API Integration
export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
}

class GoogleMapsService {
  private apiKey: string = '';

  constructor(apiKey?: string) {
    if (apiKey) {
      this.apiKey = apiKey;
    }
  }

  // Search for restaurants near a location
  async searchRestaurants(lat: number, lng: number, radius: number = 5000): Promise<GooglePlaceDetails[]> {
    if (!this.apiKey) {
      console.warn('Google Maps API key não configurada');
      return [];
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${lat},${lng}&radius=${radius}&type=restaurant&key=${this.apiKey}`
      );

      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.results;
      } else {
        console.error('Erro na busca do Google Places:', data.status);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
      return [];
    }
  }

  // Get detailed information about a specific place
  async getPlaceDetails(placeId: string): Promise<GooglePlaceDetails | null> {
    if (!this.apiKey) {
      console.warn('Google Maps API key não configurada');
      return null;
    }

    try {
      const fields = [
        'place_id',
        'name',
        'formatted_address',
        'formatted_phone_number',
        'website',
        'rating',
        'user_ratings_total',
        'price_level',
        'opening_hours',
        'photos',
        'geometry',
        'types',
        'reviews'
      ].join(',');

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${placeId}&fields=${fields}&key=${this.apiKey}`
      );

      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.result;
      } else {
        console.error('Erro ao buscar detalhes do local:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes:', error);
      return null;
    }
  }

  // Get photo URL from photo reference
  getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    if (!this.apiKey || !photoReference) {
      return '';
    }

    return `https://maps.googleapis.com/maps/api/place/photo?` +
           `maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`;
  }

  // Convert Google Place to our Restaurant format
  convertToRestaurant(place: GooglePlaceDetails, id: string): any {
    const cuisineTypes = this.extractCuisineFromTypes(place.types);
    const priceRange = place.price_level || 2;
    
    return {
      id,
      name: place.name,
      description: `Restaurante encontrado via Google Maps - ${place.formatted_address}`,
      cuisine: cuisineTypes,
      priceRange,
      rating: place.rating || 0,
      reviewCount: place.user_ratings_total || 0,
      address: place.formatted_address,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      phone: place.formatted_phone_number,
      website: place.website,
      hours: this.parseOpeningHours(place.opening_hours),
      features: this.extractFeatures(place),
      imageUrl: place.photos && place.photos.length > 0 
        ? this.getPhotoUrl(place.photos[0].photo_reference, 600)
        : 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      verified: true,
      googleMapsPlaceId: place.place_id,
      specialties: [],
      paymentMethods: ['Dinheiro', 'Cartão']
    };
  }

  private extractCuisineFromTypes(types: string[]): string {
    const cuisineMap: { [key: string]: string } = {
      'meal_takeaway': 'Delivery',
      'meal_delivery': 'Delivery',
      'restaurant': 'Geral',
      'food': 'Geral',
      'bakery': 'Padaria',
      'cafe': 'Café',
      'bar': 'Bar',
      'night_club': 'Bar'
    };

    for (const type of types) {
      if (cuisineMap[type]) {
        return cuisineMap[type];
      }
    }

    return 'Geral';
  }

  private parseOpeningHours(openingHours?: { weekday_text: string[] }): { open: string; close: string; days: string[] } {
    if (!openingHours || !openingHours.weekday_text) {
      return {
        open: '09:00',
        close: '22:00',
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      };
    }

    // Simplified parsing - you might want to improve this
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    
    return {
      open: '09:00',
      close: '22:00',
      days: days
    };
  }

  private extractFeatures(place: GooglePlaceDetails): string[] {
    const features: string[] = [];
    
    if (place.types.includes('meal_delivery')) features.push('Delivery');
    if (place.types.includes('meal_takeaway')) features.push('Retirada');
    if (place.website) features.push('Site');
    if (place.formatted_phone_number) features.push('Telefone');
    
    return features;
  }
}

// Singleton instance
export const googleMapsService = new GoogleMapsService();
