import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RaceEvent, EventCategory } from './types/event';
import { useEvents } from './hooks/useEvents';
import { useTheme } from './hooks/useTheme';
import { CategoryFilter } from './components/CategoryFilter';
import { EventList } from './components/EventList';
import { EventMap } from './components/EventMap';
import { LocationSearch } from './components/LocationSearch';
import './App.css';

type FilterValue = EventCategory | 'ALL';

export default function App() {
  const navigate = useNavigate();
  const { theme, toggle: toggleTheme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterValue>('ALL');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<RaceEvent | null>(null);
  const [searchTarget, setSearchTarget] = useState<{ lat: number; lng: number; label: string } | null>(null);

  const { events: rawEvents, allEvents, loading, error } = useEvents({ category: activeFilter });

  const events = searchTarget
    ? [...rawEvents].sort((a, b) => {
        const dist = (e: typeof a) =>
          Math.hypot(e.coordinates.lat - searchTarget.lat, e.coordinates.lng - searchTarget.lng);
        return dist(a) - dist(b);
      })
    : rawEvents;

  const counts: Record<string, number> = {
    ALL: allEvents.length,
    'Grand Prix': allEvents.filter((e) => e.category === 'Grand Prix').length,
    Sprint: allEvents.filter((e) => e.category === 'Sprint').length,
    Exhibition: allEvents.filter((e) => e.category === 'Exhibition').length,
  };

  function handleSelect(event: RaceEvent) {
    setSelectedEvent(event);
    setActiveId(event.id);
    setSearchTarget(null);
  }

  function handleSearch(lat: number, lng: number, label: string) {
    setSearchTarget({ lat, lng, label });
    setSelectedEvent(null);
    setActiveId(null);
  }

  function handleViewDetail(event: RaceEvent) {
    navigate(`/events/${event.id}`);
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__brand">
            <span className="app__brand-icon">✈</span>
            <div>
              <h1 className="app__title">Air Race Explorer</h1>
              <p className="app__subtitle">International Air Race Series — {new Date().getFullYear()}</p>
            </div>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app__main">
        <div className="app__toolbar">
          <CategoryFilter
            active={activeFilter}
            onChange={(v) => {
              setActiveFilter(v);
              setActiveId(null);
              setSelectedEvent(null);
            }}
            counts={counts}
          />
          <LocationSearch onSearch={handleSearch} />
        </div>

        {searchTarget && (
          <div className="search-result-banner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <strong>{searchTarget.label}</strong>
            <button
              className="search-result-banner__close"
              onClick={() => setSearchTarget(null)}
              aria-label="Clear search"
            >×</button>
          </div>
        )}

        <div className="app__content">
          {loading && (
            <div className="loading-overlay">
              <div className="spinner" aria-label="Loading events" />
              <p>Loading events…</p>
            </div>
          )}

          {error && (
            <div className="error-banner" role="alert">{error}</div>
          )}

          {!loading && !error && (
            <>
              <EventMap
                events={events}
                activeId={activeId}
                selectedEvent={selectedEvent}
                searchTarget={searchTarget}
                onHover={setActiveId}
                onSelect={handleSelect}
                onViewDetail={handleViewDetail}
              />
              <aside className="app__sidebar">
                <div className="app__sidebar-header">
                  <p className="app__event-count">
                    <strong>{events.length}</strong> event{events.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <EventList
                  events={events}
                  activeId={activeId}
                  onHover={setActiveId}
                  onSelect={handleSelect}
                  onViewDetail={handleViewDetail}
                />
              </aside>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
