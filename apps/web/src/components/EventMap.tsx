import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { RaceEvent } from '../types/event';

import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
});

const CATEGORY_COLORS: Record<string, string> = {
  'Grand Prix': '#3b82f6',
  Sprint: '#10b981',
  Exhibition: '#8b5cf6',
};

function createMarkerIcon(isActive: boolean, category: string) {
  const size = isActive ? 22 : 16;
  const color = isActive ? '#f59e0b' : (CATEGORY_COLORS[category] ?? '#64748b');
  const ring = isActive ? `box-shadow: 0 0 0 3px rgba(245,158,11,0.35), 0 2px 8px rgba(0,0,0,0.5);` : `box-shadow: 0 2px 6px rgba(0,0,0,0.4);`;
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px; height:${size}px;
      background:${color};
      border: 2.5px solid white;
      border-radius: 50%;
      ${ring}
      transition: all 0.2s ease;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapController({
  selectedEvent,
  searchTarget,
}: {
  selectedEvent: RaceEvent | null;
  searchTarget: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (searchTarget) {
      map.flyTo([searchTarget.lat, searchTarget.lng], 11, { duration: 1.5 });
    } else if (selectedEvent) {
      map.flyTo(
        [selectedEvent.coordinates.lat, selectedEvent.coordinates.lng],
        10,
        { duration: 1.2 }
      );
    }
  }, [selectedEvent, searchTarget, map]);
  return null;
}

interface MarkersLayerProps {
  events: RaceEvent[];
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (event: RaceEvent) => void;
  onViewDetail: (event: RaceEvent) => void;
}

function MarkersLayer({ events, activeId, onHover, onSelect, onViewDetail }: MarkersLayerProps) {
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    markerRefs.current.forEach((marker, id) => {
      if (id === activeId) marker.openPopup();
    });
  }, [activeId]);

  return (
    <>
      {events.map((event) => {
        const slug = event.category.toLowerCase().replace(' ', '-');
        return (
          <Marker
            key={event.id}
            position={[event.coordinates.lat, event.coordinates.lng]}
            icon={createMarkerIcon(activeId === event.id, event.category)}
            ref={(ref) => {
              if (ref) markerRefs.current.set(event.id, ref);
              else markerRefs.current.delete(event.id);
            }}
            eventHandlers={{
              mouseover: () => onHover(event.id),
              mouseout: () => onHover(null),
              click: () => onSelect(event),
            }}
          >
            <Popup>
              <div className="map-popup">
                <span className={`category-badge category-badge--${slug}`}>
                  {event.category}
                </span>
                <strong>{event.title}</strong>
                <p>{event.description}</p>
                <small>📍 {event.address}, {event.country}</small>
                <button
                  className="map-popup__detail-btn"
                  onClick={() => onViewDetail(event)}
                >
                  View details →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

interface EventMapProps {
  events: RaceEvent[];
  activeId: string | null;
  selectedEvent: RaceEvent | null;
  searchTarget: { lat: number; lng: number; label: string } | null;
  onHover: (id: string | null) => void;
  onSelect: (event: RaceEvent) => void;
  onViewDetail: (event: RaceEvent) => void;
}

export function EventMap({
  events,
  activeId,
  selectedEvent,
  searchTarget,
  onHover,
  onSelect,
  onViewDetail,
}: EventMapProps) {
  return (
    <div className="map-container">
      <MapContainer
        center={[30, 10]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedEvent={selectedEvent} searchTarget={searchTarget} />
        <MarkersLayer
          events={events}
          activeId={activeId}
          onHover={onHover}
          onSelect={onSelect}
          onViewDetail={onViewDetail}
        />
      </MapContainer>
    </div>
  );
}
