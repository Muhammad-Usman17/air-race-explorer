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

const defaultProps = {
  event: mockEvent,
  isActive: false,
  onMouseEnter: vi.fn(),
  onMouseLeave: vi.fn(),
  onClick: vi.fn(),
  onViewDetail: vi.fn(),
};

describe('EventCard', () => {
  it('renders event title and location', () => {
    render(<EventCard {...defaultProps} />);
    expect(screen.getByText('Abu Dhabi Grand Prix')).toBeInTheDocument();
    expect(screen.getByText(/Corniche Waterfront/)).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(<EventCard {...defaultProps} />);
    expect(screen.getByText('Grand Prix')).toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    const { container } = render(<EventCard {...defaultProps} isActive={true} />);
    expect(container.querySelector('.event-card')).toHaveClass('active');
  });

  it('calls onClick with the event when the card is clicked', () => {
    const onClick = vi.fn();
    const { container } = render(<EventCard {...defaultProps} onClick={onClick} />);
    fireEvent.click(container.querySelector('.event-card')!);
    expect(onClick).toHaveBeenCalledWith(mockEvent);
  });

  it('calls onMouseEnter with event id on hover', () => {
    const onMouseEnter = vi.fn();
    const { container } = render(<EventCard {...defaultProps} onMouseEnter={onMouseEnter} />);
    fireEvent.mouseEnter(container.querySelector('.event-card')!);
    expect(onMouseEnter).toHaveBeenCalledWith('1');
  });

  it('calls onViewDetail when "View details" button is clicked', () => {
    const onViewDetail = vi.fn();
    render(<EventCard {...defaultProps} onViewDetail={onViewDetail} />);
    fireEvent.click(screen.getByRole('button', { name: /view details/i }));
    expect(onViewDetail).toHaveBeenCalledWith(mockEvent);
  });
});
