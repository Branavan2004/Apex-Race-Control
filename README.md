# Apex Race Control

Apex Race Control is a Formula 1 inspired interactive developer portfolio built with React, TypeScript, Vite, and Express. It blends portfolio storytelling with broadcast-style motorsport visuals, animated telemetry overlays, and a lightweight backend that serves race-session, lap, position, and telemetry data in demo mode.

The project is designed to feel like an F1 race broadcast control room while presenting personal profile content, technical skills, projects, experience, certifications, and contact details in a memorable format.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Customization](#customization)
- [Build Status](#build-status)
- [Known Notes](#known-notes)

## Overview

This repository contains two main parts:

1. A Vite-powered frontend in `src/` that renders the Formula 1 themed portfolio experience.
2. A small Express API in `server/` that provides race-related data for replay and telemetry style UI components.

The frontend includes cinematic overlays such as timing towers, DRS indicators, telemetry widgets, weather panels, race director bars, track maps, and broadcast tickers. The portfolio content is organized as race sectors, turning a traditional personal site into an immersive motorsport presentation.

On the backend, the app serves demo race data and exposes REST endpoints that the frontend can consume through `/api`. The project also includes Vercel-compatible serverless API entry points in `api/`, making it suitable for both local development and simple deployment workflows.

## Features

### Frontend experience

- F1-style hero section with animated start lights, lap timer, and speedometer
- Scroll-aware race HUD that tracks the active portfolio section
- Motion-rich overlays including:
  - timing tower
  - track map
  - race director bar
  - DRS indicator
  - ERS bar
  - tyre degradation
  - weather panel
  - steering input
  - broadcast ticker
- Portfolio sections presented as themed race sectors:
  - Driver Profile
  - Skills Telemetry
  - Race History
  - Pit Wall
  - Certifications Garage
  - Live Telemetry
  - Contact Radio
  - Finish Line
- Responsive React UI with Framer Motion powered transitions
- Modular shared UI pieces such as glass cards, gauges, stat bars, and skill pills

### Backend and data

- Express API for sessions, drivers, laps, positions, and telemetry
- Demo-mode race datasets generated from mock season data
- In-memory response caching for repeated API calls
- Health endpoint for quick service checks
- Local API proxy support during Vite development
- Vercel-ready API handlers for deployment without a dedicated Node server process

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Framer Motion
- Recharts
- Lucide React
- CSS with custom theme and animation layers

### Backend

- Node.js
- Express
- Nodemon

### Tooling

- npm
- concurrently
- TypeScript compiler

## Architecture

The app uses a simple split architecture:

- `src/` contains the active frontend application
- `server/` contains the Express API used in local development
- `api/` exposes serverless wrappers for deployment platforms such as Vercel

During local development:

- the frontend runs on `http://localhost:5173`
- the backend runs on `http://localhost:8787`
- Vite proxies `/api` and `/health` requests to the backend

During deployment:

- the frontend is built as static assets
- API requests can be served through the `api/` directory
- the frontend uses a relative `'/api'` base path, so no frontend code changes are needed

## Project Structure

```text
f1-react-dashboard-main/
├── api/                     # Serverless API entry points for deployment
├── public/                  # Static public assets
├── server/                  # Express app, routes, middleware, demo data services
│   ├── data/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── src/
│   ├── components/
│   │   ├── overlays/        # Broadcast-style UI overlays
│   │   ├── sections/        # Main portfolio sections
│   │   ├── shared/          # Reusable presentational building blocks
│   │   └── UI/
│   ├── data/                # Portfolio and content data
│   ├── hooks/               # Custom hooks for animation and behavior
│   ├── lib/                 # API helpers, constants, formatters, utilities
│   └── styles/              # Global theme and animation styling
├── index.html
├── package.json
├── vercel.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

Node 18+ is recommended because the backend uses the standard `fetch` API.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/f1-react-dashboard-main.git
cd f1-react-dashboard-main
npm install
```

### Run the project locally

Start the frontend and backend together:

```bash
npm run dev
```

This starts:

- Vite client on `http://localhost:5173`
- Express API on `http://localhost:8787`

### Frontend only

```bash
npm run dev:client
```

### Backend only

```bash
npm run dev:server
```

## Available Scripts

### `npm run dev`

Runs the Vite frontend and Express backend concurrently for local development.

### `npm run dev:client`

Starts the Vite development server with host binding enabled.

### `npm run dev:server`

Starts the backend using Nodemon for automatic restarts.

### `npm run build`

Builds the frontend for production using Vite.

### `npm run preview`

Serves the production frontend build locally on `http://localhost:4173`.

### `npm start`

Runs the Express backend directly with Node.

## API Endpoints

The frontend consumes a relative API base path:

```text
/api
```

### `GET /health`

Returns service health information.

Example response:

```json
{
  "status": "ok",
  "service": "f1-dashboard-api",
  "mode": "demo-fallback-enabled",
  "timestamp": "2026-03-24T00:00:00.000Z"
}
```

### `GET /api/sessions`

Returns the available demo race sessions.

Optional query:

- `race`: include the selected session payload if a race slug is provided

### `GET /api/sessions/:slug`

Returns session details and fastest overall lap information for a specific race.

### `GET /api/drivers?race=<slug>`

Returns the drivers for a given race dataset.

### `GET /api/laps?race=<slug>`

Returns lap-by-lap race data, safety car periods, and fastest lap details.

### `GET /api/positions?race=<slug>&lap=<number>`

Returns position data for all laps, or for a specific lap if `lap` is provided.

### `GET /api/telemetry?race=<slug>&lap=<number>&driver=<code>`

Returns telemetry for the requested lap. If `driver` is provided, the response is narrowed to that driver.

## Deployment

### Deploying to Vercel

This project already includes:

- `api/[...route].js` to expose the Express app as a serverless handler
- `api/health.js` for the health route
- `vercel.json` rewrite support for `/health`

Basic Vercel workflow:

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Use the default build command:

```bash
npm run build
```

4. Use the default output directory:

```text
dist
```

Because the frontend uses `'/api'` as the base path, the app can call the deployed serverless routes without extra environment variables.

### Deploying elsewhere

If you deploy outside Vercel, make sure:

- static frontend assets are served from the Vite build output
- API routes are available under `/api`
- the Node runtime supports `fetch`

## Customization

This project is easy to adapt into another personal brand, portfolio, or motorsport-themed showcase.

### Update profile content

Edit:

- `src/data/profile.ts`
- `src/data/leadership.ts`
- `src/data/projects.ts`
- `src/data/certifications.ts`
- `src/data/radioMessages.ts`

### Update styling and theme

Edit:

- `src/styles/theme.css`
- `src/styles/globals.css`
- `src/styles/animations.css`
- component-level CSS files under `src/components/`

### Update demo race data

Edit:

- `server/data/mockRaces.js`
- `server/data/mockLaps.js`
- `server/data/mockPositions.js`
- `server/data/mockTelemetry.js`
- `server/services/mockDataService.js`

### Extend real data integration

The repository includes `server/services/openF1Service.js`, which shows the start of an external data integration path. At the moment, the active Express routes use demo/mock data for resilience and predictable rendering.

## Build Status

Production build verified successfully with:

```bash
npm run build
```

The current build generates an optimized Vite bundle in `dist/`.

## Known Notes

- The active modern app is primarily the `src/` frontend plus the `server/` backend.
- There are several older or duplicate root-level files in the repository that do not appear to be part of the main production path.
- No automated test suite is currently configured in `package.json`.
- No environment variables are required for the current demo-mode setup.
- A license file is not currently included. If you plan to publish this as an open-source repository, adding a license is recommended.

## Author

**Branavan Kuganesan**

- GitHub: [Branavan2004](https://github.com/Branavan2004)
- LinkedIn: [branavan-kuganesan](https://linkedin.com/in/branavan-kuganesan)
- Email: [branavan09@gmail.com](mailto:branavan09@gmail.com)

---

If you are using this README for GitHub, you can also add:

- a homepage screenshot or GIF near the top
- a live demo link
- badges for build, deployment, or tech stack

Those are optional, but they would make the repository presentation even stronger.
