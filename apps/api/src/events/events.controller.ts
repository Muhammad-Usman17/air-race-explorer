import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { EventsService } from './events.service';
import type { EventCategory } from './events.types';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // GET /events
  // GET /events?category=Grand+Prix
  @Get()
  findAll(@Query('category') category?: EventCategory) {
    return this.eventsService.findAll(category);
  }

  // GET /events/categories
  @Get('categories')
  getCategories() {
    return this.eventsService.getCategories();
  }

  // GET /events/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    const event = this.eventsService.findOne(id);
    if (!event) throw new NotFoundException(`Event with id "${id}" not found`);
    return event;
  }
}
