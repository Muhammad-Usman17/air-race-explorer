import { useState, useRef } from 'react';

interface LocationSearchProps {
  onSearch: (lat: number, lng: number, label: string) => void;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmed)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data: NominatimResult[] = await res.json();
      if (data.length === 0) {
        setError('Location not found. Try a different search.');
        return;
      }
      const { lat, lon, display_name } = data[0];
      onSearch(parseFloat(lat), parseFloat(lon), display_name);
      setQuery('');
    } catch {
      setError('Search failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="location-search" onSubmit={handleSearch} role="search">
      <div className="location-search__input-wrap">
        <svg
          className="location-search__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          className="location-search__input"
          placeholder="Search city or address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          aria-label="Search location"
        />
      </div>
      <button
        type="submit"
        className="location-search__btn"
        disabled={loading || !query.trim()}
      >
        {loading ? 'Searching…' : 'Go'}
      </button>
      {error && <p className="location-search__error">{error}</p>}
    </form>
  );
}
