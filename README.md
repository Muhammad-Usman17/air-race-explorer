# Air Race Explorer

A full-stack demo project built for Zooom Productions — an interactive explorer for an international Air Race event series.

---

## Architecture

npm workspaces monorepo:

```
air-race-explorer/
├── apps/
│   ├── web/    # React + Vite + TypeScript
│   └── api/    # NestJS REST API
├── package.json
└── README.md
```

---

## Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run both apps

```bash
npm run dev
```

| App      | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| API      | http://localhost:3000  |

### Run individually

```bash
npm run dev:web   # frontend only
npm run dev:api   # backend only
```

### API endpoints

```
GET /api/events                        # all events
GET /api/events?category=Grand+Prix    # filtered by category
GET /api/events/categories             # list of all categories
GET /api/events/:id                    # single event
```

---

## Features

- **Map view** — Leaflet + OpenStreetMap, custom markers per category (no API key required)
- **Event list** — scrollable sidebar synced with map markers
- **Hover interaction** — hovering a list item highlights its marker and vice versa
- **Click interaction** — clicking a card or marker flies the map to that location and opens a popup
- **Category filter** — filter by Grand Prix / Sprint / Exhibition (affects both map and list)
- **Location search** — geocoding via Nominatim, centers map on any city or address
- **Dark / Light mode** — toggle in the header, persists via `localStorage`, defaults to OS preference

---

## Technical Decisions

**React + Vite + TypeScript** — fast HMR, type safety, minimal config overhead.

**NestJS** — module/controller/service structure enforces separation of concerns from day one. Easy to extend with a real database or CMS layer later.

**React-Leaflet + OpenStreetMap** — no API key, open source, well-maintained React wrapper around Leaflet.js.

**Plain CSS with custom properties** — CSS variables on `[data-theme]` handle dark/light theming without adding a runtime styling dependency. Keeps the bundle lean.

**Data model** — designed to be CMS-extendable. Each event has `id`, `title`, `description`, `address`, `country`, `coordinates`, `category`, `date`, and optional `imageUrl`. Maps cleanly to a Contentful or Sanity content type.

**Categories** — `Grand Prix`, `Sprint`, `Exhibition` instead of opaque A/B labels — meaningful to users and easier to extend.

**`useEvents` hook** — fetches from the NestJS API; the static seed data in `apps/web/src/data/events.ts` acts as a fallback and mirrors the API data exactly.

---

