import type { Place } from "./Place";

interface SearchFeature {
  geometry: {
    coordinates: number[];
  };
  properties: {
    place_id: number;
    display_name: string;
  };
}

interface SearchResponse {
  features: SearchFeature[];
}

export const search = async (term: string): Promise<Place[]> => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson`
  );

  const data: SearchResponse = await res.json();

  return data.features.map((feature) => ({
    id: feature.properties.place_id,
    name: feature.properties.display_name,
    longitude: feature.geometry.coordinates[0],
    latitude: feature.geometry.coordinates[1],
  }));
};
