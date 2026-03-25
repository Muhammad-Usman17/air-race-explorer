import type { RaceEvent } from '../types/event';
import { EventCard } from './EventCard';

interface EventListProps {
  events: RaceEvent[];
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (event: RaceEvent) => void;
}

export function EventList({ events, activeId, onHover, onSelect }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="event-list__empty">
        <p>No events found for this category.</p>
      </div>
    );
  }

  return (
    <ul className="event-list" role="list">
      {events.map((event) => (
        <li key={event.id}>
          <EventCard
            event={event}
            isActive={activeId === event.id}
            onMouseEnter={onHover}
            onMouseLeave={() => onHover(null)}
            onClick={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}
