import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventList } from './EventList';
import type { RaceEvent } from '../types/event';

const events: RaceEvent[] = [
  {
    id: '1',
    title: 'Abu Dhabi Grand Prix',
    description: 'Season opener.',
    address: 'Corniche, Abu Dhabi',
    country: 'UAE',
    coordinates: { lat: 24.4672, lng: 54.3569 },
    category: 'Grand Prix',
    date: '2025-03-15',
  },
  {
    id: '2',
    title: 'San Diego Sprint',
    description: 'Sprint over the bay.',
    address: 'San Diego Bay, CA',
    country: 'USA',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    category: 'Sprint',
    date: '2025-04-26',
  },
];

describe('EventList', () => {
  it('renders all events', () => {
    render(
      <EventList events={events} activeId={null} onHover={vi.fn()} onSelect={vi.fn()} />
    );
    expect(screen.getByText('Abu Dhabi Grand Prix')).toBeInTheDocument();
    expect(screen.getByText('San Diego Sprint')).toBeInTheDocument();
  });

  it('shows empty state when events array is empty', () => {
    render(
      <EventList events={[]} activeId={null} onHover={vi.fn()} onSelect={vi.fn()} />
    );
    expect(screen.getByText(/No events found/)).toBeInTheDocument();
  });

  it('passes activeId to EventCard', () => {
    const { container } = render(
      <EventList events={events} activeId="1" onHover={vi.fn()} onSelect={vi.fn()} />
    );
    const cards = container.querySelectorAll('.event-card');
    expect(cards[0]).toHaveClass('active');
    expect(cards[1]).not.toHaveClass('active');
  });
});
