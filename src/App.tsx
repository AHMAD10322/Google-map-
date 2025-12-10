import { useState } from "react";
import type { Place } from "./api/Place";
import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";

export default function App() {
  const [place, setPlace] = useState<Place | null>(null);

  return (
    <div className="p-6 bg-blue-500 text-white text-2xl font-bold">
      <LocationSearch onePlaceClick={(p) => setPlace(p)} />
      <Map place={place} />
    </div>
  );
}
