// services/googleMapsLoader.ts
const GOOGLE_MAPS_API_KEY = process.env.API_KEY;

const GOOGLE_MAPS_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=stable`;

let googleMapsPromise: Promise<void> | null = null;

export const loadGoogleMapsScript = (): Promise<void> => {
  if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key is not configured.");
      return Promise.reject(new Error("Missing Google Maps API Key"));
  }
    
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    // Check if script is already present
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = GOOGLE_MAPS_SCRIPT_URL;
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