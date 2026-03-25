import type { EventCategory } from '../types/event';

type FilterValue = EventCategory | 'ALL';

interface CategoryFilterProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<string, number>;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'ALL', label: 'All Events' },
  { value: 'Grand Prix', label: 'Grand Prix' },
  { value: 'Sprint', label: 'Sprint' },
  { value: 'Exhibition', label: 'Exhibition' },
];

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="filter-bar">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-btn filter-btn--${value.toLowerCase().replace(' ', '-')} ${active === value ? 'active' : ''}`}
          onClick={() => onChange(value)}
        >
          {label}
          <span className="filter-count">{counts[value] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
