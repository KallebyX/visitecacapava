// services/googleMapsLoader.ts
// Para desenvolvimento, vamos usar o modo sem API key
const GOOGLE_MAPS_API_KEY = ''; // Deixar vazio para desenvolvimento

let googleMapsPromise: Promise<void> | null = null;

export const loadGoogleMapsScript = (): Promise<void> => {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }
  
  // URL básica sem API key para desenvolvimento local
  let scriptUrl = `https://maps.googleapis.com/maps/api/js?v=weekly&loading=async`;

  googleMapsPromise = new Promise((resolve, reject) => {
    // Check if script is already present
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      googleMapsPromise = null; // Allow retrying
      reject(new Error('Failed to load Google Maps script.'));
    };
    
    document.head.appendChild(script);
  });

  return googleMapsPromise;
};