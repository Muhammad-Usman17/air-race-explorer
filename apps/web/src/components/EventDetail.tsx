import { useEffect, useRef } from 'react';
import type { RaceEvent } from '../types/event';

interface EventDetailProps {
  event: RaceEvent;
  onClose: () => void;
}

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

export function EventDetail({ event, onClose }: EventDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const color = CATEGORY_COLORS[event.category] ?? '#64748b';
  const icon = CATEGORY_ICONS[event.category] ?? '✈';
  const slug = event.category.toLowerCase().replace(' ', '-');

  return (
    <dialog
      ref={dialogRef}
      className="event-detail-dialog"
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      <div className="event-detail">
        {/* Header strip with category color */}
        <div className="event-detail__hero" style={{ borderTopColor: color }}>
          <div className="event-detail__hero-icon" style={{ color }}>
            {icon}
          </div>
          <div className="event-detail__hero-content">
            <span className={`category-badge category-badge--${slug}`}>
              {event.category}
            </span>
            <h2 className="event-detail__title">{event.title}</h2>
          </div>
          <button
            className="event-detail__close"
            onClick={onClose}
            aria-label="Close event detail"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="event-detail__body">
          <p className="event-detail__description">{event.description}</p>

          <div className="event-detail__meta">
            <div className="event-detail__meta-item">
              <span className="event-detail__meta-icon">📅</span>
              <div>
                <span className="event-detail__meta-label">Date</span>
                <span className="event-detail__meta-value">{formattedDate}</span>
              </div>
            </div>

            <div className="event-detail__meta-item">
              <span className="event-detail__meta-icon">📍</span>
              <div>
                <span className="event-detail__meta-label">Location</span>
                <span className="event-detail__meta-value">{event.address}</span>
              </div>
            </div>

            <div className="event-detail__meta-item">
              <span className="event-detail__meta-icon">🌍</span>
              <div>
                <span className="event-detail__meta-label">Country</span>
                <span className="event-detail__meta-value">{event.country}</span>
              </div>
            </div>

            <div className="event-detail__meta-item">
              <span className="event-detail__meta-icon">🗺️</span>
              <div>
                <span className="event-detail__meta-label">Coordinates</span>
                <span className="event-detail__meta-value">
                  {event.coordinates.lat.toFixed(4)}, {event.coordinates.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          <a
            className="event-detail__map-link"
            href={`https://www.openstreetmap.org/?mlat=${event.coordinates.lat}&mlon=${event.coordinates.lng}&zoom=12`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View on OpenStreetMap
          </a>
        </div>
      </div>
    </dialog>
  );
}
