import type { RaceEvent } from '../types/event';

interface EventCardProps {
  event: RaceEvent;
  isActive: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onClick: (event: RaceEvent) => void;
  onViewDetail: (event: RaceEvent) => void;
}

export function EventCard({
  event,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onViewDetail,
}: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const slug = event.category.toLowerCase().replace(' ', '-');

  return (
    <article
      className={`event-card ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onMouseEnter(event.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(event)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(event)}
      aria-pressed={isActive}
    >
      <div className="event-card__header">
        <span className={`category-badge category-badge--${slug}`}>
          {event.category}
        </span>
        <span className="event-card__date">{formattedDate}</span>
      </div>

      <h3 className="event-card__title">{event.title}</h3>

      <p className="event-card__location">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        {event.address}, {event.country}
      </p>

      <p className="event-card__description">{event.description}</p>

      <div className="event-card__footer">
        <button
          className="event-card__detail-btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(event);
          }}
          aria-label={`View details for ${event.title}`}
        >
          View details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </article>
  );
}
