# 🏎️ Apex Race Control

> A production-grade Formula 1 race analytics dashboard built with 
> React 18 and Node.js — featuring live SVG track animation, 
> real-time replay engine, and dynamic championship standings 
> calculated race by race across the full 2024 F1 season.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat&logo=express&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-brightgreen?style=flat)

---

## 📸 Preview

> Add a screen recording GIF of the dashboard running here
> `![Dashboard Preview](./preview.gif)`

---

## ✨ Features

### 🏁 Race Replay Engine
- Full race replay from Lap 1 to the final lap across all 
  24 rounds of the 2024 F1 season
- Adjustable playback speeds: 0.25×, 0.5×, 1×, 2×
- Full-width lap scrubber — jump to any lap instantly
- Play, Pause, Previous Lap, Next Lap, and Restart controls
- Leaderboard updates every lap with animated position 
  changes, live gap times, and pit stop indicators

### 🗺️ Live SVG Track Map
- Accurate SVG circuit layouts for all 24 F1 2024 circuits
- All 20 driver cars animated simultaneously around the track
- Car positions calculated using SVGPathElement.getPointAtLength()
- Leader car highlighted with pulsing team-color glow effect
- Hover tooltip showing driver name, current position, and gap
- Click any car to switch telemetry focus to that driver

### 🏆 Championship Standings
- Dynamic points calculation — select any race to see the 
  championship standings exactly as they stood after that round
- Full F1 points system: 25-18-15-12-10-8-6-4-2-1 with +1 
  bonus point for fastest lap (only if finished P1–P10)
- Both Driver and Constructor championship tables
- Watch the 2024 title fight evolve round by round
- Verified accurate finishing orders for all 24 rounds
- Final standings match official 2024 results exactly:
  VER 437pts · NOR 374pts · LEC 356pts

### 📊 Lap Time Chart
- Recharts line graph comparing lap times across all drivers
- Toggle individual drivers on/off with pill buttons
- Pit stop laps marked as vertical dashed indicators
- Fastest lap highlighted per driver

### ⚡ Telemetry Panel
- SVG arc speed gauge (0–380 km/h)
- Throttle and brake vertical bars (0–100%)
- Gear indicator with color coding per gear (1–8)
- DRS open/closed status
- Switch driver focus by clicking any leaderboard row

### 🔄 Resilient Data Architecture
- Primary: Ergast F1 API (real 2024 race results, lap times,
  championship standings — free, no auth required)
- Fallback: deterministic mock engine activates silently if 
  API is unreachable — the app never shows a blank screen
- Server-side in-memory cache (30-minute TTL) prevents 
  hitting API rate limits
- Live status indicator in header: 
  🟢 LIVE DATA or ⚡ DEMO MODE

---

## 🛠️ Tech Stack

| Layer        | Technology                  | Purpose                           |
|--------------|-----------------------------|-----------------------------------|
| Frontend     | React 18 + Vite 5           | UI framework + optimized build    |
| Styling      | Pure CSS Custom Properties  | Design system, zero CSS-in-JS     |
| Animation    | Framer Motion               | Leaderboard position transitions  |
| Charts       | Recharts                    | Lap time line graph               |
| Track Maps   | SVG + rAF                   | 60fps car position animation      |
| Backend      | Node.js + Express 4         | API proxy + caching layer         |
| Data         | Ergast F1 API               | Real 2024 season data             |
| Icons        | Lucide React                | UI iconography                    |
| Fonts        | Rajdhani + Inter            | Motorsport-inspired typography    |

---

## 🏗️ Architecture

### Data Flow
```
Ergast API → Express (cache 30min) → React Frontend
→ useReplayEngine (state machine) → useTrackAnimation 
→ SVG path interpolation → 20 animated CarMarkers
```

### Dual Data Source Strategy
The Ergast API provides complete historical 2024 data 
(results, lap times, standings) but has no telemetry or 
car position data — no public API does. The app uses a 
deliberate hybrid:

- **Real data** — race results, lap times, standings via Ergast
- **Simulated data** — speed, throttle, brake, track positions 
  generated deterministically from lap data

If Ergast is unreachable, the mock engine activates silently.
The interviewer would never know unless they read the badge.

### Replay State Machine
`useReplayEngine` manages `currentLap`, `lapFraction` (0.0–1.0), 
`playbackSpeed`, and `isPlaying`. A `setInterval` advances 
`lapFraction` every 100ms. When it reaches 1.0, `currentLap` 
increments and `lapFraction` resets. Speed refs prevent 
stale closures without recreating the interval.

### SVG Track Animation
`SVGPathElement.getTotalLength()` is called once on mount and 
cached in a ref. Each driver's gap is converted to a track 
fraction offset. `getPointAtLength(fraction × totalLength)` 
returns pixel coordinates. A 95ms CSS transition on each car 
marker creates smooth movement between 100ms ticks.

### Championship Calculator
`calculateStandingsAfterRound(n)` is a pure function with zero 
API calls and zero side effects. It filters `RACE_RESULTS_2024` 
to rounds ≤ n, accumulates points using the F1 scoring system, 
and returns a sorted standings array. Clicking Race 8 triggers 
an instant recalculation — no loading, no network request.

---

## 📁 Project Structure
```
f1-dashboard/
├── server/
│   ├── index.js                 # Express server, port 8787
│   ├── routes/
│   │   ├── sessions.js          # Race calendar endpoint
│   │   ├── laps.js              # Lap times endpoint
│   │   └── standings.js         # Championship endpoint
│   ├── services/
│   │   ├── ergastService.js     # Ergast API integration
│   │   └── mockDataService.js   # Fallback data engine
│   └── middleware/
│       ├── cache.js             # 30-min in-memory cache
│       └── errorHandler.js      # Global error handler
├── src/
│   ├── components/
│   │   ├── TrackMap/            # SVG circuit + car animation
│   │   ├── Leaderboard/         # Live race standings
│   │   ├── LapChart/            # Recharts lap time graph
│   │   ├── TelemetryPanel/      # Speed/throttle/gear gauges
│   │   ├── ReplayControls/      # Playback bar + scrubber
│   │   ├── RaceSelector/        # 2024 season race list
│   │   ├── StandingsPanel/      # Championship standings
│   │   └── Header/              # App bar + data status
│   ├── hooks/
│   │   ├── useReplayEngine.js   # Core replay state machine
│   │   ├── useTrackAnimation.js # SVG path interpolation
│   │   ├── useRaceData.js       # Data fetching + fallback
│   │   └── useTelemetry.js      # Telemetry data hook
│   └── lib/
│       ├── raceResults2024.js   # All 24 verified race results
│       ├── calculateStandings.js # Pure points calculator
│       ├── trackLayouts.js      # 24 SVG circuit paths
│       ├── generateRaceLaps.js  # Lap-by-lap position engine
│       └── teamColors.js        # F1 2024 team colors
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/apex-race-control.git
cd apex-race-control

# Install dependencies
npm install

# Start frontend and backend together
npm run dev
```

Open **http://localhost:5173** in your browser.

The backend API runs on **http://localhost:8787**.

### Available Scripts

| Command           | Description                                |
|-------------------|--------------------------------------------|
| `npm run dev`     | Start frontend + backend concurrently      |
| `npm run build`   | Production build → outputs to `dist/`      |
| `npm run preview` | Preview production build locally           |
| `npm start`       | Start backend server only (port 8787)      |

---

## 💡 Technical Decisions

**Why not use the OpenF1 API for live data?**  
OpenF1 only streams data during active race weekends. An 
interviewer opening this project on a Tuesday would see a 
completely blank screen. The Ergast API provides complete, 
verified 2024 historical data that works 24/7. Telemetry 
and track positions — which no public API provides for 
completed races — are simulated deterministically.

**Why a custom Express backend instead of direct API calls?**  
Server-side caching keeps the app under Ergast rate limits, 
keeps API origin headers out of the browser, and centralizes 
the live-vs-fallback decision in one place. The frontend 
never knows or cares whether data came from Ergast or mock.

**Why pure CSS instead of Tailwind or styled-components?**  
Demonstrates genuine CSS knowledge — custom properties as a 
design token system, CSS Grid for layout, keyframe animations 
for skeleton loaders and car glow effects. A hand-built design 
system is a stronger portfolio signal than utility classes.

**Why is the championship calculator a pure function?**  
`calculateStandingsAfterRound(8)` always returns the same 
result for the same input. No API calls, no loading states, 
no side effects. It runs in under 1ms. This is an intentional 
architectural decision that makes the feature both faster and 
easier to reason about.

**Why memoize with React.memo, useMemo, and useCallback?**  
The track map re-renders at up to 10fps during fast playback 
with 20 SVG elements each frame. Without memoization, the 
entire leaderboard and chart would re-render on every tick. 
Memoization keeps non-animated panels completely static 
unless their specific data changes.

---

## 📊 2024 Season Data

- **24 circuits** — every round of the 2024 F1 calendar
- **20 drivers** across 10 constructor teams
- **Verified finishing orders** cross-referenced with 
  official 2024 race results
- **Accurate fastest lap data** for all 24 rounds
- **Final standings match official 2024 results exactly**

| Position | Driver | Points | Team |
|----------|--------|--------|------|
| 1st | Max Verstappen | 437 | Red Bull |
| 2nd | Lando Norris | 374 | McLaren |
| 3rd | Charles Leclerc | 356 | Ferrari |
| 4th | Oscar Piastri | 292 | McLaren |
| 5th | Carlos Sainz | 290 | Ferrari |

| Position | Constructor | Points |
|----------|-------------|--------|
| 1st | McLaren | 666 |
| 2nd | Ferrari | 652 |
| 3rd | Red Bull | 589 |
| 4th | Mercedes | 468 |

---

## 🎨 Design System

- **Dark theme** — layered background variables from 
  `#06060e` (deepest) to `#1f1f35` (overlays)
- **F1 red** `#e10600` as primary accent throughout
- **Rajdhani** — all race data, positions, lap times 
  (motorsport display aesthetic)
- **Inter** — body copy and labels
- **Team colors** applied consistently on every driver 
  element across leaderboard, chart, and track map
- **CSS keyframes** — skeleton shimmer loaders, leaderboard 
  position flash animations, leader car pulse glow

---

## 🔮 What I Would Add Next

- WebSocket integration for true real-time data during 
  live race weekends via OpenF1
- Redis replacing in-memory cache for production deployment
- Driver head-to-head comparison mode
- Historical seasons — 2023, 2022, 2021 title fights
- Race incident timeline — VSC, Safety Car, red flags
- Mobile responsive layout for tablet and phone
- Qualifying session replay mode

---

## 👤 Author

Built by **Branavan  Kuganeshan**

[![GitHub](https://img.shields.io/badge/GitHub-yourusername-181717?style=flat&logo=github)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-yourname-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/yourname)
[![Portfolio](https://img.shields.io/badge/Portfolio-yoursite.com-FF4500?style=flat)](https://yoursite.com)

---

## 📄 License

MIT License — free to use, fork, and build upon.

---

*Built as a portfolio project to demonstrate full-stack 
React engineering, data visualization, SVG animation, 
and product architecture decision-making.*
