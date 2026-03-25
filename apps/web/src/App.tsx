import { useState } from 'react';
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
  const { theme, toggle: toggleTheme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterValue>('ALL');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<RaceEvent | null>(null);
  const [searchTarget, setSearchTarget] = useState<{ lat: number; lng: number; label: string } | null>(null);

  const { events, allEvents, loading, error } = useEvents({ category: activeFilter });

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

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__brand">
            <span className="app__brand-icon">✈</span>
            <h1 className="app__title">Air Race Explorer</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <p className="app__subtitle">International Air Race Series — {new Date().getFullYear()}</p>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
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
            Showing map location for: <strong>{searchTarget.label}</strong>
            <button
              className="search-result-banner__close"
              onClick={() => setSearchTarget(null)}
              aria-label="Clear search"
            >
              ×
            </button>
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
            <div className="error-banner" role="alert">
              {error}
            </div>
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
              />
              <aside className="app__sidebar">
                <p className="app__event-count">
                  {events.length} event{events.length !== 1 ? 's' : ''}
                </p>
                <EventList
                  events={events}
                  activeId={activeId}
                  onHover={setActiveId}
                  onSelect={handleSelect}
                />
              </aside>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
