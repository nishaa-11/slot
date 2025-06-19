import { useState, useEffect, useCallback } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary, AdvancedMarker } from '@vis.gl/react-google-maps';
import { env, validateEnv } from '@/config/env';
import { useTheme } from '@/contexts/ThemeContext';

// Validate environment variables and get API key
const getGoogleMapsApiKey = () => {
  try {
    // First try to access the API key directly from import.meta.env
    const directApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (directApiKey && directApiKey.startsWith('AIza')) {
      console.log('Google Maps API key found');
      return directApiKey;
    }

    // Fall back to the env object if direct access fails
    validateEnv(); // This will throw an error if required env vars are missing
    const apiKey = env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured');
    }
    return apiKey;
  } catch (error) {
    console.error('Error initializing Google Maps:', error);
    // Log more detailed information about the error
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null; // Return null instead of throwing to handle error gracefully
  }
};

const apiKey = getGoogleMapsApiKey();
if (!apiKey) {
  console.error('Google Maps initialization failed. Please check your API key configuration.');
}

type LatLng = {
  lat: number;
  lng: number;
};

type GoogleMapProps = {
  selectedArea?: {
    area_id: string;
    area_name: string;
    latitude: number | null;
    longitude: number | null;
  } | null;
  className?: string;
};

// DirectionsRenderer component to handle route display
const DirectionsRenderer = ({
  origin,
  destination
}: {
  origin: LatLng;
  destination: LatLng;
}) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const { theme } = useTheme();
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService());
    const renderer = new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: true, // We'll use our own markers
      polylineOptions: {
        strokeColor: theme === 'dark' ? '#60a5fa' : '#3b82f6', // Brighter blue in dark mode
        strokeWeight: 6, // Thicker line
        strokeOpacity: 0.9, // More opaque
        zIndex: 10, // Ensure route appears above other map elements
        strokePattern: {
          repeat: '10px',
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0.5,
          fillOpacity: 1,
          strokeWeight: 1,
          fillColor: theme === 'dark' ? '#93c5fd' : '#60a5fa'
        }
      }
    });
    setDirectionsRenderer(renderer);

    return () => {
      if (renderer) renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  // Calculate and display route when origin or destination changes
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination) return;

    const calculateRoute = async () => {
      try {
        const result = await directionsService.route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING
        });

        directionsRenderer.setDirections(result);

        // Extract route information
        if (result.routes.length > 0) {
          const route = result.routes[0];
          if (route.legs.length > 0) {
            const leg = route.legs[0];
            setRouteInfo({
              distance: leg.distance?.text || 'Unknown distance',
              duration: leg.duration?.text || 'Unknown duration'
            });
          }
        }
      } catch (error) {
        console.error('Error calculating route:', error);
      }
    };

    calculateRoute();
  }, [directionsService, directionsRenderer, origin, destination]);

  // Return route information to be displayed outside the map
  return (
    <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 p-4 rounded-lg shadow-lg z-10 border-2 border-primary backdrop-blur-sm">
      {routeInfo ? (
        <div className="text-sm space-y-2">
          <div className="font-bold text-base flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Distance: <span className="text-primary font-semibold">{routeInfo.distance}</span></span>
          </div>
          <div className="font-bold text-base flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>ETA: <span className="text-primary font-semibold">{routeInfo.duration}</span></span>
          </div>
        </div>
      ) : (
        <div className="text-sm flex items-center">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
          Calculating route...
        </div>
      )}
    </div>
  );
};

const GoogleMap = ({ selectedArea, className = '' }: GoogleMapProps) => {
  // Show error message if API key is not available
  if (!apiKey) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4 ${className}`}>
        <div className="text-center">
          <p className="text-red-500 mb-2">Unable to load Google Maps</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Please check your Google Maps API configuration</p>
        </div>
      </div>
    );
  }

  // Wrap the map with APIProvider to properly initialize Google Maps
  return (
    <APIProvider apiKey={apiKey}>
      <MapContent selectedArea={selectedArea} className={className} />
    </APIProvider>
  );
};

// Separate component for map content
const MapContent = ({ selectedArea, className = '' }: GoogleMapProps) => {
  const { theme } = useTheme();
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  const getUserLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to retrieve your location. Please enable location services.');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // Get user location on component mount
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // Prepare destination coordinates from selected area
  const destination = selectedArea && selectedArea.latitude && selectedArea.longitude
    ? { lat: selectedArea.latitude, lng: selectedArea.longitude }
    : null;

  // Calculate map center based on available locations
  const getMapCenter = () => {
    if (userLocation && destination) {
      // Center between user location and destination
      return {
        lat: (userLocation.lat + destination.lat) / 2,
        lng: (userLocation.lng + destination.lng) / 2
      };
    }
    if (userLocation) return userLocation;
    if (destination) return destination;
    
    // Default center (India)
    return { lat: 20.5937, lng: 78.9629 };
  };

  // Calculate appropriate zoom level
  const getZoomLevel = () => {
    if (userLocation && destination) {
      // Calculate distance between points to determine zoom
      const R = 6371; // Earth's radius in km
      const dLat = (destination.lat - userLocation.lat) * Math.PI / 180;
      const dLng = (destination.lng - userLocation.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) * 
        Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Distance in km
      
      // Adjust zoom based on distance
      if (distance > 100) return 8;
      if (distance > 50) return 9;
      if (distance > 20) return 10;
      if (distance > 10) return 11;
      if (distance > 5) return 12;
      if (distance > 2) return 13;
      return 14;
    }
    return 12; // Default zoom
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={getUserLocation}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl ${className}`}>
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
        <Map
          defaultCenter={getMapCenter()}
          defaultZoom={getZoomLevel()}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          mapId="smart-parking-map"
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          zoomControl={true}
          zoomControlOptions={{
            position: google.maps.ControlPosition.RIGHT_BOTTOM
          }}
        >
          {userLocation && (
            <AdvancedMarker position={userLocation} title="Your Location">
              <div className="relative">
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-blue-500'} rounded-full opacity-30 animate-ping-slow`}></div>
                <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-blue-500'} border-3 ${theme === 'dark' ? 'border-gray-800' : 'border-white'} rounded-full flex items-center justify-center shadow-lg relative animate-pulse-slow`}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${theme === 'dark' ? 'text-indigo-500' : 'text-blue-500'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </AdvancedMarker>
          )}

          {destination && (
            <AdvancedMarker position={destination} title={selectedArea?.area_name || 'Parking Area'}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full opacity-30 animate-ping-slow"></div>
                <div className={`w-10 h-10 bg-primary border-3 ${theme === 'dark' ? 'border-gray-800' : 'border-white'} rounded-full flex items-center justify-center text-white font-bold shadow-lg relative`}>
                  <span className="text-lg">P</span>
                  <div className={`absolute -bottom-2 -right-2 w-5 h-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </AdvancedMarker>
          )}

          {userLocation && destination && (
            <DirectionsRenderer origin={userLocation} destination={destination} />
          )}
        </Map>
    </div>
  );
};

export default GoogleMap;