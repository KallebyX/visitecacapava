// Utility functions for navigation and location services

export const generateWazeLink = (lat: number, lng: number, placeName?: string): string => {
  const baseUrl = 'https://waze.com/ul';
  const params = new URLSearchParams({
    ll: `${lat},${lng}`,
    navigate: 'yes'
  });
  
  if (placeName) {
    params.append('q', placeName);
  }
  
  return `${baseUrl}?${params.toString()}`;
};

export const generateGoogleMapsLink = (lat: number, lng: number, placeName?: string): string => {
  const baseUrl = 'https://www.google.com/maps/dir/';
  if (placeName) {
    return `${baseUrl}/${encodeURIComponent(placeName)}/@${lat},${lng}`;
  }
  return `${baseUrl}/@${lat},${lng}`;
};

export const openNavigation = (lat: number, lng: number, placeName?: string) => {
  const wazeLink = generateWazeLink(lat, lng, placeName);
  const googleMapsLink = generateGoogleMapsLink(lat, lng, placeName);
  
  // Try to open Waze first (mobile preference)
  if (navigator.userAgent.includes('Mobile')) {
    window.open(wazeLink, '_blank');
  } else {
    // Desktop: give user choice
    const userChoice = confirm('Deseja abrir no Waze? (OK) ou Google Maps? (Cancelar)');
    if (userChoice) {
      window.open(wazeLink, '_blank');
    } else {
      window.open(googleMapsLink, '_blank');
    }
  }
};

export const formatNavigationButtons = (lat: number, lng: number, placeName?: string) => {
  const wazeLink = generateWazeLink(lat, lng, placeName);
  const googleMapsLink = generateGoogleMapsLink(lat, lng, placeName);
  
  return {
    waze: wazeLink,
    googleMaps: googleMapsLink
  };
};
