import { useState } from "react";
import type { Place } from "../api/Place";
import { search } from "../api/search";

interface LocationSearchProps {
  onePlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onePlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = await search(term);
    setPlaces(results);
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "20px auto" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          background: "white",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          alignItems: "center",
        }}
      >
        <input
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for a city..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Search
        </button>
      </form>

      <ul
        style={{
          background: "white",
          marginTop: "10px",
          borderRadius: "12px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          maxHeight: "250px",
          overflowY: "auto",
          padding: 0,
        }}
      >
        {places.map((p) => (
          <li
            key={p.id}
            onClick={() => onePlaceClick(p)}
            style={{
              padding: "12px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              listStyle: "none",
              fontSize: "15px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#e8f0fe")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
