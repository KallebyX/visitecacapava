// services/googleMapsLoader.ts
const GOOGLE_MAPS_API_KEY = process.env.API_KEY;

// A more robust check for a valid key. A typical Google API key is ~39 characters.
const isApiKeyValid = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY.length > 30;

let googleMapsPromise: Promise<void> | null = null;

export const loadGoogleMapsScript = (): Promise<void> => {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }
  
  const scriptUrl = `https://maps.googleapis.com/maps/api/js?v=stable${isApiKeyValid ? `&key=${GOOGLE_MAPS_API_KEY}` : ''}`;
  
  if (!isApiKeyValid) {
      console.warn("Google Maps API key is not configured or is likely invalid. Map will be loaded in development mode.");
  }

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
