# Apex Race Control

Apex Race Control is a Formula 1 inspired interactive portfolio and telemetry-style dashboard built with React, TypeScript, Vite, and Express. It transforms a traditional developer portfolio into an immersive race-broadcast experience, combining cinematic UI design, animated telemetry overlays, and structured backend-driven demo data.

Designed around the visual language of Formula 1 race coverage, the project presents profile information, technical skills, experience, featured work, and contact details through themed sectors, overlays, and broadcast components that create a memorable and distinctive user experience.

## Live Concept

Apex Race Control is more than a portfolio website. It is a frontend-heavy product experience that blends:

- Personal branding
- UI animation and interaction design
- Data-driven dashboard patterns
- API-backed telemetry simulation
- Motorsport-inspired storytelling

The result is a polished showcase project that demonstrates both creative interface design and practical full-stack engineering structure.

---

## Key Features

### Immersive Portfolio Experience

- Formula 1 inspired hero section with animated race start lights
- Dynamic speedometer and lap timer visuals
- Scroll-aware race HUD that tracks active page sections
- Sector-based storytelling structure for portfolio content
- Broadcast-style overlays and race control interface elements

### Broadcast and Telemetry UI Components

- Timing Tower
- Track Map
- DRS Overlay
- ERS Bar
- Race Director Bar
- Weather Panel
- Tyre Degradation Overlay
- Steering Input Visualization
- Broadcast Ticker
- Race HUD navigation

### Portfolio Sections

- Driver Profile
- Skills Telemetry
- Race History
- Pit Wall
- Certifications Garage
- Live Telemetry
- Contact Radio
- Finish Line

### Backend and Data Support

- Express REST API for race-related demo data
- Mock/demo session support for stable local rendering
- Endpoints for sessions, drivers, laps, positions, and telemetry
- In-memory caching middleware for faster repeated requests
- Health endpoint for deployment and runtime checks
- Vercel-compatible serverless API wrapper support

---

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Framer Motion
- Recharts
- Lucide React
- Custom CSS architecture

### Backend

- Node.js
- Express
- Nodemon

### Tooling

- npm
- concurrently
- TypeScript compiler
- Vite build tooling

---

## Project Architecture

The project is organized into three main layers:

### `src/`
Contains the primary frontend application, including:

- visual overlays
- portfolio content sections
- reusable shared components
- custom hooks
- styling system
- frontend utilities and API helpers

### `server/`
Contains the Express backend used in local development, including:

- API routes
- middleware
- mock race data
- telemetry/session services

### `api/`
Contains serverless wrappers used for deployment environments such as Vercel.

This architecture allows the project to run smoothly in local development while remaining easy to deploy as a combined frontend and API application.

---

## Project Structure

```text
f1-react-dashboard-main/
├── api/                     # Serverless API entry points
├── public/                  # Static assets
├── server/                  # Express backend
│   ├── data/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── src/
│   ├── components/
│   │   ├── overlays/
│   │   ├── sections/
│   │   ├── shared/
│   │   └── UI/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── index.html
├── package.json
├── vercel.json
└── README.md
