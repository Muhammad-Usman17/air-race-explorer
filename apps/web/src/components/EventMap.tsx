import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { RaceEvent } from '../types/event';

// Fix default marker icon path issue with Vite bundling
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
});

function createMarkerIcon(isActive: boolean, category: string) {
  const categoryColors: Record<string, string> = {
    'Grand Prix': '#3b82f6',  // blue
    Sprint: '#10b981',        // emerald
    Exhibition: '#8b5cf6',    // purple
  };
  const color = isActive ? '#f59e0b' : (categoryColors[category] ?? '#64748b');
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: ${isActive ? 20 : 16}px;
        height: ${isActive ? 20 : 16}px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        transition: all 0.2s ease;
      "></div>
    `,
    iconSize: [isActive ? 20 : 16, isActive ? 20 : 16],
    iconAnchor: [isActive ? 10 : 8, isActive ? 10 : 8],
  });
}

// Sub-component: pans map to selected event or search target
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

// Sub-component: holds imperative marker refs and syncs hover state
interface MarkersLayerProps {
  events: RaceEvent[];
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (event: RaceEvent) => void;
}

function MarkersLayer({ events, activeId, onHover, onSelect }: MarkersLayerProps) {
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  // Open popup for the active (selected) event programmatically
  useEffect(() => {
    markerRefs.current.forEach((marker, id) => {
      if (id === activeId) {
        marker.openPopup();
      }
    });
  }, [activeId]);

  return (
    <>
      {events.map((event) => (
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
              <span className={`category-badge category-badge--${event.category.toLowerCase().replace(' ', '-')}`}>
                {event.category}
              </span>
              <strong>{event.title}</strong>
              <p>{event.description}</p>
              <small>
                {event.address}, {event.country}
              </small>
            </div>
          </Popup>
        </Marker>
      ))}
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
}

export function EventMap({
  events,
  activeId,
  selectedEvent,
  searchTarget,
  onHover,
  onSelect,
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
        />
      </MapContainer>
    </div>
  );
}
