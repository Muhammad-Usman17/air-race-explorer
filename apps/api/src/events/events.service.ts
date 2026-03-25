import { Injectable } from '@nestjs/common';
import type { RaceEvent, EventCategory } from './events.types';
import { RACE_EVENTS } from './events.data';

@Injectable()
export class EventsService {
  findAll(category?: EventCategory): RaceEvent[] {
    if (!category) return RACE_EVENTS;
    return RACE_EVENTS.filter((e) => e.category === category);
  }

  findOne(id: string): RaceEvent | undefined {
    return RACE_EVENTS.find((e) => e.id === id);
  }

  getCategories(): EventCategory[] {
    const unique = new Set(RACE_EVENTS.map((e) => e.category));
    return Array.from(unique).sort() as EventCategory[];
  }
}
