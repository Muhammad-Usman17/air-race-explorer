import { useParams, useNavigate } from 'react-router-dom';
import { RACE_EVENTS } from '../data/events';

const CATEGORY_COLORS: Record<string, string> = {
  'Grand Prix': '#3b82f6',
  Sprint: '#10b981',
  Exhibition: '#8b5cf6',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Grand Prix': '🏆',
  Sprint: '⚡',
  Exhibition: '🎪',
};

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = RACE_EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="detail-page detail-page--not-found">
        <button className="detail-back-btn" onClick={() => navigate('/')}>← Back</button>
        <p>Event not found.</p>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const color = CATEGORY_COLORS[event.category] ?? '#64748b';
  const icon = CATEGORY_ICONS[event.category] ?? '✈';
  const slug = event.category.toLowerCase().replace(' ', '-');
  const fallbackImage = `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80`;

  return (
    <div className="detail-page">
      {/* Hero image */}
      <div className="detail-hero">
        <img
          src={event.imageUrl ?? fallbackImage}
          alt={event.title}
          className="detail-hero__img"
        />
        <div className="detail-hero__overlay" />
        <div className="detail-hero__content">
          <button className="detail-back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Explorer
          </button>
          <div className="detail-hero__meta">
            <span className={`category-badge category-badge--${slug}`}>
              {icon} {event.category}
            </span>
            <h1 className="detail-hero__title">{event.title}</h1>
            <p className="detail-hero__location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {event.address}, {event.country}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="detail-body">
        <div className="detail-body__inner">

          {/* Description */}
          <section className="detail-section">
            <h2 className="detail-section__title">About this event</h2>
            <p className="detail-section__text">{event.description}</p>
          </section>

          {/* Stats grid */}
          <section className="detail-section">
            <h2 className="detail-section__title">Event details</h2>
            <div className="detail-stats">
              <div className="detail-stat" style={{ borderTopColor: color }}>
                <span className="detail-stat__icon">📅</span>
                <span className="detail-stat__label">Date</span>
                <span className="detail-stat__value">{formattedDate}</span>
              </div>
              <div className="detail-stat" style={{ borderTopColor: color }}>
                <span className="detail-stat__icon">🌍</span>
                <span className="detail-stat__label">Country</span>
                <span className="detail-stat__value">{event.country}</span>
              </div>
              <div className="detail-stat" style={{ borderTopColor: color }}>
                <span className="detail-stat__icon">📍</span>
                <span className="detail-stat__label">Venue</span>
                <span className="detail-stat__value">{event.address}</span>
              </div>
              <div className="detail-stat" style={{ borderTopColor: color }}>
                <span className="detail-stat__icon">🗺️</span>
                <span className="detail-stat__label">Coordinates</span>
                <span className="detail-stat__value">
                  {event.coordinates.lat.toFixed(4)}, {event.coordinates.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </section>

          {/* Map link */}
          <a
            className="detail-map-link"
            href={`https://www.openstreetmap.org/?mlat=${event.coordinates.lat}&mlon=${event.coordinates.lng}&zoom=12`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View on OpenStreetMap
          </a>
        </div>
      </div>
    </div>
  );
}
