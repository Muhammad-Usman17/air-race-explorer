import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from './CategoryFilter';

const counts = { ALL: 9, 'Grand Prix': 4, Sprint: 3, Exhibition: 2 };

describe('CategoryFilter', () => {
  it('renders all filter buttons', () => {
    render(<CategoryFilter active="ALL" onChange={vi.fn()} counts={counts} />);
    expect(screen.getByText('All Events')).toBeInTheDocument();
    expect(screen.getByText('Grand Prix')).toBeInTheDocument();
    expect(screen.getByText('Sprint')).toBeInTheDocument();
    expect(screen.getByText('Exhibition')).toBeInTheDocument();
  });

  it('marks the active filter button', () => {
    render(<CategoryFilter active="Grand Prix" onChange={vi.fn()} counts={counts} />);
    const btn = screen.getByText('Grand Prix').closest('button');
    expect(btn).toHaveClass('active');
  });

  it('calls onChange with the correct value when a button is clicked', () => {
    const onChange = vi.fn();
    render(<CategoryFilter active="ALL" onChange={onChange} counts={counts} />);
    fireEvent.click(screen.getByText('Sprint').closest('button')!);
    expect(onChange).toHaveBeenCalledWith('Sprint');
  });

  it('displays the event count for each category', () => {
    render(<CategoryFilter active="ALL" onChange={vi.fn()} counts={counts} />);
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
