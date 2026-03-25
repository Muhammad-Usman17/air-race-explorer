import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventCard } from './EventCard';
import type { RaceEvent } from '../types/event';

const mockEvent: RaceEvent = {
  id: '1',
  title: 'Abu Dhabi Grand Prix',
  description: 'Season opener above the Corniche waterfront.',
  address: 'Corniche Waterfront, Abu Dhabi',
  country: 'UAE',
  coordinates: { lat: 24.4672, lng: 54.3569 },
  category: 'Grand Prix',
  date: '2025-03-15',
};

describe('EventCard', () => {
  it('renders event title and location', () => {
    render(
      <EventCard
        event={mockEvent}
        isActive={false}
        onMouseEnter={vi.fn()}
        onMouseLeave={vi.fn()}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('Abu Dhabi Grand Prix')).toBeInTheDocument();
    expect(screen.getByText(/Corniche Waterfront/)).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(
      <EventCard
        event={mockEvent}
        isActive={false}
        onMouseEnter={vi.fn()}
        onMouseLeave={vi.fn()}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('Grand Prix')).toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    const { container } = render(
      <EventCard
        event={mockEvent}
        isActive={true}
        onMouseEnter={vi.fn()}
        onMouseLeave={vi.fn()}
        onClick={vi.fn()}
      />
    );
    expect(container.querySelector('.event-card')).toHaveClass('active');
  });

  it('calls onClick with the event when clicked', () => {
    const onClick = vi.fn();
    render(
      <EventCard
        event={mockEvent}
        isActive={false}
        onMouseEnter={vi.fn()}
        onMouseLeave={vi.fn()}
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(mockEvent);
  });

  it('calls onMouseEnter with event id on hover', () => {
    const onMouseEnter = vi.fn();
    render(
      <EventCard
        event={mockEvent}
        isActive={false}
        onMouseEnter={onMouseEnter}
        onMouseLeave={vi.fn()}
        onClick={vi.fn()}
      />
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(onMouseEnter).toHaveBeenCalledWith('1');
  });
});
