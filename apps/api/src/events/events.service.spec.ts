import { EventsService } from './events.service';
import { RACE_EVENTS } from './events.data';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(() => {
    service = new EventsService();
  });

  describe('findAll()', () => {
    it('returns all events when no category is given', () => {
      const result = service.findAll();
      expect(result).toHaveLength(RACE_EVENTS.length);
    });

    it('returns only Grand Prix events when filtered', () => {
      const result = service.findAll('Grand Prix');
      expect(result.every((e) => e.category === 'Grand Prix')).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns only Sprint events when filtered', () => {
      const result = service.findAll('Sprint');
      expect(result.every((e) => e.category === 'Sprint')).toBe(true);
    });

    it('returns only Exhibition events when filtered', () => {
      const result = service.findAll('Exhibition');
      expect(result.every((e) => e.category === 'Exhibition')).toBe(true);
    });
  });

  describe('findOne()', () => {
    it('returns the correct event by id', () => {
      const first = RACE_EVENTS[0];
      const result = service.findOne(first.id);
      expect(result).toEqual(first);
    });

    it('returns undefined for a non-existent id', () => {
      expect(service.findOne('non-existent')).toBeUndefined();
    });
  });

  describe('getCategories()', () => {
    it('returns all unique categories sorted', () => {
      const cats = service.getCategories();
      expect(cats).toEqual([...new Set(cats)].sort());
      expect(cats).toContain('Grand Prix');
      expect(cats).toContain('Sprint');
      expect(cats).toContain('Exhibition');
    });
  });
});
