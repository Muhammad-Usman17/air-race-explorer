import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Events API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/events — returns all events', () => {
    return request(app.getHttpServer())
      .get('/api/events')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('coordinates');
      });
  });

  it('GET /api/events?category=Grand+Prix — returns only Grand Prix', () => {
    return request(app.getHttpServer())
      .get('/api/events?category=Grand+Prix')
      .expect(200)
      .expect((res) => {
        expect(res.body.every((e: { category: string }) => e.category === 'Grand Prix')).toBe(true);
      });
  });

  it('GET /api/events/categories — returns sorted category list', () => {
    return request(app.getHttpServer())
      .get('/api/events/categories')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toContain('Grand Prix');
      });
  });

  it('GET /api/events/1 — returns a single event', () => {
    return request(app.getHttpServer())
      .get('/api/events/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe('1');
      });
  });

  it('GET /api/events/999 — returns 404', () => {
    return request(app.getHttpServer())
      .get('/api/events/999')
      .expect(404);
  });
});
