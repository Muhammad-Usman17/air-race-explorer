import type { RaceEvent } from '../types/event';
import { EventCard } from './EventCard';
import { Pagination } from './Pagination';
import { usePagination } from '../hooks/usePagination';

const PAGE_SIZE = 4;

interface EventListProps {
  events: RaceEvent[];
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (event: RaceEvent) => void;
  onViewDetail: (event: RaceEvent) => void;
}

export function EventList({ events, activeId, onHover, onSelect, onViewDetail }: EventListProps) {
  const { paged, page, totalPages, setPage } = usePagination(events, PAGE_SIZE);

  if (events.length === 0) {
    return (
      <div className="event-list__empty">
        <span className="event-list__empty-icon">🗺️</span>
        <p>No events found for this category.</p>
      </div>
    );
  }

  return (
    <div className="event-list-wrapper">
      <ul className="event-list" role="list">
        {paged.map((event) => (
          <li key={event.id}>
            <EventCard
              event={event}
              isActive={activeId === event.id}
              onMouseEnter={onHover}
              onMouseLeave={() => onHover(null)}
              onClick={onSelect}
              onViewDetail={onViewDetail}
            />
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
