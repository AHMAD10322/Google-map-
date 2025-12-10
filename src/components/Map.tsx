import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Place } from "../api/Place";
import "leaflet/dist/leaflet.css";

interface MapProps {
  place: Place | null;
}

function RecenterMap({ place }: { place: Place }) {
  const map = useMap();
  map.setView([place.latitude, place.longitude], 14);
  return null;
}

export default function Map({ place }: MapProps) {
  const defaultPosition = [31.5204, 74.3587]; // Lahore fallback

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "20px auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
        border: "1px solid #ddd",
      }}
    >
      <MapContainer
        center={defaultPosition}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {place && <RecenterMap place={place} />}

        {place && (
          <Marker position={[place.latitude, place.longitude]}>
            <Popup>{place.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
