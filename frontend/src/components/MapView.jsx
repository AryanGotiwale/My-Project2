import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function MapView({ location }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY"
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      center={location}
      zoom={14}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
}

export default MapView;
