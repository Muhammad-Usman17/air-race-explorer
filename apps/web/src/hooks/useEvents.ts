import { useState, useEffect } from 'react';
import type { RaceEvent, EventCategory } from '../types/event';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

interface UseEventsOptions {
  category: EventCategory | 'ALL';
}

interface UseEventsResult {
  events: RaceEvent[];
  allEvents: RaceEvent[];
  loading: boolean;
  error: string | null;
}

async function fetchEvents(): Promise<RaceEvent[]> {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<RaceEvent[]>;
}

export function useEvents({ category }: UseEventsOptions): UseEventsResult {
  const [allEvents, setAllEvents] = useState<RaceEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then(setAllEvents)
      .catch(() => setError('Failed to load events. Is the API running on port 3000?'))
      .finally(() => setLoading(false));
  }, []);

  const events =
    category === 'ALL'
      ? allEvents
      : allEvents.filter((e) => e.category === category);

  return { events, allEvents, loading, error };
}
