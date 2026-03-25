# Air Race Explorer

A full-stack demo project built for Zooom Productions, showcasing an interactive explorer for air race events around the world.

## Project Overview

Air Race Explorer is a web application that lets users browse, filter, and explore air race events on an interactive map. Each event includes details such as title, description, location, category, and date. The project demonstrates a clean monorepo architecture with a React frontend and a NestJS backend API.

---

## Architecture

This project is organized as an **npm workspaces monorepo**:

```
air-race-explorer/
├── apps/
│   ├── web/          # React + Vite + TypeScript frontend
│   └── api/          # NestJS backend
├── README.md
├── .gitignore
└── package.json      # root (workspaces)
```

### apps/web — Frontend
- **React + Vite + TypeScript** for a fast, type-safe UI
- **React-Leaflet + OpenStreetMap** for interactive mapping (no API key required)
- **Tailwind CSS** for utility-first styling
- **Axios** for HTTP requests to the API

### apps/api — Backend
- **NestJS** for a structured, opinionated REST API
- Strict TypeScript mode enabled
- Designed to be extended with a database or CMS integration

---

## Setup Instructions

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm 9+**

### Install dependencies

From the repository root, run:

```bash
npm install
```

This installs dependencies for all workspaces (root, `apps/web`, and `apps/api`) in one step.

### Run both apps concurrently

```bash
npm run dev
```

This starts both the frontend and backend simultaneously:

| App      | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:5173    |
| API      | http://localhost:3000    |

### Run apps individually

```bash
# Frontend only
npm run dev:web

# Backend only
npm run dev:api
```

---

## Technical Decisions

### React + Vite + TypeScript
Vite provides near-instant HMR and build times compared to Create React App or Webpack-based setups. TypeScript adds static typing across the frontend, catching errors at compile time and improving maintainability as the codebase grows.

### NestJS
NestJS is an opinionated Node.js framework built on top of Express (with optional Fastify support). Its module/controller/service architecture enforces separation of concerns from day one, making it easier to scale the API as requirements grow. The strict TypeScript configuration further improves reliability.

### React-Leaflet + OpenStreetMap
React-Leaflet provides a declarative React wrapper around the battle-tested Leaflet.js mapping library. OpenStreetMap is used as the tile provider — completely open source and requiring no API key, which removes a barrier for local development and avoids vendor lock-in.

### Tailwind CSS
Tailwind's utility-first approach allows rapid UI development without leaving JSX. It eliminates the overhead of naming CSS classes and keeps styles co-located with components, which improves readability and reduces context switching.

### Monorepo with npm Workspaces
Keeping both `apps/web` and `apps/api` in a single repository makes it easy to share types, run both apps with a single command, and manage the project as a cohesive unit. npm workspaces (built into npm 7+) handles cross-package linking with no additional tooling required.

### Data Model
Each air race event is designed with a CMS-extendable shape:

```ts
interface AirRaceEvent {
  id: string;
  title: string;
  description: string;
  address: string;
  country: string;
  coordinates: { lat: number; lng: number };
  category: string;       // e.g. "Red Bull Air Race", "Airshow", "Pylon Racing"
  imageUrl: string;
  date: string;           // ISO 8601
}
```

This structure maps cleanly to content types in headless CMS platforms like Contentful or Sanity, making a future CMS integration straightforward.

---
