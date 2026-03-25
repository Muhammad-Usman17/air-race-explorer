# Air Race Explorer

An interactive explorer for an international Air Race event series — built as a full-stack demo for Zooom Productions.

---

## Architecture

npm workspaces monorepo:

```
air-race-explorer/
├── apps/
│   ├── web/          # React + Vite + TypeScript
│   └── api/          # NestJS REST API
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Local Setup

### Prerequisites
- Node.js 20+
- npm 9+

### Install & run

```bash
npm install
npm run dev
```

| App      | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:5173 |
| API      | http://localhost:3000 |

```bash
npm run dev:web   # frontend only
npm run dev:api   # backend only
```

### API endpoints

```
GET /api/events                       # all events
GET /api/events?category=Grand+Prix   # filtered by category
GET /api/events/categories            # list of categories
GET /api/events/:id                   # single event
```

---

## Docker

Runs both services behind a single nginx proxy — frontend on `/`, API on `/api`.

```bash
docker compose up --build
```

| App      | URL                  |
|----------|----------------------|
| Frontend | http://localhost     |
| API      | http://localhost/api |

---

## Tests

```bash
npm test --workspace=apps/api   # NestJS unit + e2e (12 tests)
npm test --workspace=apps/web   # Vitest + RTL (17 tests)
```

CI runs both on every push and pull request to `main`.

---

## Features

- **Map view** — Leaflet + OpenStreetMap, custom markers per category, no API key required
- **Event list** — scrollable sidebar synced with map markers
- **Hover** — hovering a list item highlights its marker and vice versa
- **Click** — clicking a card or marker flies the map to that location and opens a popup
- **Category filter** — Grand Prix / Sprint / Exhibition, affects both map and list
- **Location search** — geocoding via Nominatim, centers map on any city or address
- **Dark / Light mode** — header toggle, persists via `localStorage`, defaults to OS preference

---

## Technical Decisions

**React + Vite + TypeScript** — fast HMR, type safety, minimal config.

**NestJS** — module/controller/service structure enforces separation of concerns. Easy to extend with a database or CMS later.

**React-Leaflet + OpenStreetMap** — no API key, open source, no vendor lock-in.

**Plain CSS with custom properties** — `[data-theme]` variables for dark/light theming without a runtime styling dependency.

**Data model** — CMS-extendable shape: `id`, `title`, `description`, `address`, `country`, `coordinates`, `category`, `date`, `imageUrl?`. Maps directly to a Contentful or Sanity content type.

**Categories** — `Grand Prix`, `Sprint`, `Exhibition` — meaningful labels, easy to extend.

**`useEvents` hook** — fetches from the NestJS API; static seed data in `apps/web/src/data/events.ts` mirrors the API exactly and acts as a dev fallback.

---
