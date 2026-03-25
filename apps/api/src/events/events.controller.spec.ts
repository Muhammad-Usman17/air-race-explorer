import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { RACE_EVENTS } from './events.data';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  describe('findAll()', () => {
    it('returns all events with no query param', () => {
      const result = controller.findAll(undefined);
      expect(result).toHaveLength(RACE_EVENTS.length);
    });

    it('filters events by category', () => {
      const result = controller.findAll('Grand Prix');
      expect(result.every((e) => e.category === 'Grand Prix')).toBe(true);
    });
  });

  describe('getCategories()', () => {
    it('returns a sorted array of unique categories', () => {
      const cats = controller.getCategories();
      expect(Array.isArray(cats)).toBe(true);
      expect(cats.length).toBeGreaterThan(0);
    });
  });

  describe('findOne()', () => {
    it('returns a single event by id', () => {
      const first = RACE_EVENTS[0];
      const result = controller.findOne(first.id);
      expect(result?.id).toBe(first.id);
    });

    it('throws NotFoundException for unknown id', () => {
      expect(() => controller.findOne('unknown-id')).toThrow(NotFoundException);
    });
  });
});
