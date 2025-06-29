import { useLoadScript, GoogleMap as GoogleMapComponent, Marker } from '@react-google-maps/api';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

const GoogleMap = ({ center, zoom = 15, className = '' }: GoogleMapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) {
    return (
      <div className={`w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Error loading maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Loading maps...</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full min-h-[400px] rounded-2xl overflow-hidden ${className}`}>
      <GoogleMapComponent
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={options}
      >
        <Marker
          position={center}
          title="Mithila Bazaar"
          animation={google.maps.Animation.DROP}
        />
      </GoogleMapComponent>
    </div>
  );
};

export default GoogleMap; 