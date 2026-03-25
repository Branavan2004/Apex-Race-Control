const TEAM_COLORS = {
  'Red Bull': '#3671C6',
  Ferrari: '#E80020',
  McLaren: '#FF8000',
  Mercedes: '#00D2BE',
  'Aston Martin': '#229971',
  Alpine: '#0090FF',
  RB: '#6692FF',
  Haas: '#B6BABD',
  Williams: '#64C4FF',
  Sauber: '#52E252',
};

const DRIVERS = [
  { number: 1, code: 'VER', name: 'Max Verstappen', team: 'Red Bull', skill: 0.99 },
  { number: 11, code: 'PER', name: 'Sergio Perez', team: 'Red Bull', skill: 0.93 },
  { number: 16, code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', skill: 0.97 },
  { number: 55, code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', skill: 0.95 },
  { number: 4, code: 'NOR', name: 'Lando Norris', team: 'McLaren', skill: 0.97 },
  { number: 81, code: 'PIA', name: 'Oscar Piastri', team: 'McLaren', skill: 0.94 },
  { number: 44, code: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes', skill: 0.96 },
  { number: 63, code: 'RUS', name: 'George Russell', team: 'Mercedes', skill: 0.94 },
  { number: 14, code: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin', skill: 0.92 },
  { number: 18, code: 'STR', name: 'Lance Stroll', team: 'Aston Martin', skill: 0.86 },
  { number: 10, code: 'GAS', name: 'Pierre Gasly', team: 'Alpine', skill: 0.87 },
  { number: 31, code: 'OCO', name: 'Esteban Ocon', team: 'Alpine', skill: 0.86 },
  { number: 22, code: 'TSU', name: 'Yuki Tsunoda', team: 'RB', skill: 0.88 },
  { number: 3, code: 'RIC', name: 'Daniel Ricciardo', team: 'RB', skill: 0.84 },
  { number: 27, code: 'HUL', name: 'Nico Hulkenberg', team: 'Haas', skill: 0.85 },
  { number: 20, code: 'MAG', name: 'Kevin Magnussen', team: 'Haas', skill: 0.82 },
  { number: 23, code: 'ALB', name: 'Alex Albon', team: 'Williams', skill: 0.86 },
  { number: 2, code: 'SAR', name: 'Logan Sargeant', team: 'Williams', skill: 0.79 },
  { number: 77, code: 'BOT', name: 'Valtteri Bottas', team: 'Sauber', skill: 0.82 },
  { number: 24, code: 'ZHO', name: 'Zhou Guanyu', team: 'Sauber', skill: 0.8 },
];

const TIRE_CYCLE = ['S', 'S', 'M', 'M', 'H', 'H', 'S'];

export const RACE_RESULTS_2024 = [
  { round: 1, slug: 'bahrain', flag: '🇧🇭', country: 'Bahrain', name: 'Bahrain Grand Prix', raceName: 'Bahrain Grand Prix', circuitName: 'Bahrain International Circuit', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 57, session: 'RACE', date: '2024-03-02' },
  { round: 2, slug: 'saudi-arabia', flag: '🇸🇦', country: 'Saudi Arabia', name: 'Saudi Arabian Grand Prix', raceName: 'Saudi Arabian Grand Prix', circuitName: 'Jeddah Corniche Circuit', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 50, session: 'RACE', date: '2024-03-09' },
  { round: 3, slug: 'australia', flag: '🇦🇺', country: 'Australia', name: 'Australian Grand Prix', raceName: 'Australian Grand Prix', circuitName: 'Albert Park Circuit', winner: 'SAI', winnerTeam: 'Ferrari', totalLaps: 58, session: 'RACE', date: '2024-03-24' },
  { round: 4, slug: 'japan', flag: '🇯🇵', country: 'Japan', name: 'Japanese Grand Prix', raceName: 'Japanese Grand Prix', circuitName: 'Suzuka Circuit', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 53, session: 'RACE', date: '2024-04-07' },
  { round: 5, slug: 'china', flag: '🇨🇳', country: 'China', name: 'Chinese Grand Prix', raceName: 'Chinese Grand Prix', circuitName: 'Shanghai International Circuit', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 56, session: 'RACE', date: '2024-04-21' },
  { round: 6, slug: 'miami', flag: '🇺🇸', country: 'United States', name: 'Miami Grand Prix', raceName: 'Miami Grand Prix', circuitName: 'Miami International Autodrome', winner: 'NOR', winnerTeam: 'McLaren', totalLaps: 57, session: 'RACE', date: '2024-05-05' },
  { round: 7, slug: 'emilia-romagna', flag: '🇮🇹', country: 'Italy', name: 'Emilia Romagna Grand Prix', raceName: 'Emilia Romagna Grand Prix', circuitName: 'Autodromo Enzo e Dino Ferrari', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 63, session: 'RACE', date: '2024-05-19' },
  { round: 8, slug: 'monaco', flag: '🇲🇨', country: 'Monaco', name: 'Monaco Grand Prix', raceName: 'Monaco Grand Prix', circuitName: 'Circuit de Monaco', winner: 'LEC', winnerTeam: 'Ferrari', totalLaps: 78, session: 'RACE', date: '2024-05-26' },
  { round: 9, slug: 'canada', flag: '🇨🇦', country: 'Canada', name: 'Canadian Grand Prix', raceName: 'Canadian Grand Prix', circuitName: 'Circuit Gilles Villeneuve', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 70, session: 'RACE', date: '2024-06-09' },
  { round: 10, slug: 'spain', flag: '🇪🇸', country: 'Spain', name: 'Spanish Grand Prix', raceName: 'Spanish Grand Prix', circuitName: 'Circuit de Barcelona-Catalunya', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 66, session: 'RACE', date: '2024-06-23' },
  { round: 11, slug: 'austria', flag: '🇦🇹', country: 'Austria', name: 'Austrian Grand Prix', raceName: 'Austrian Grand Prix', circuitName: 'Red Bull Ring', winner: 'RUS', winnerTeam: 'Mercedes', totalLaps: 71, session: 'RACE', date: '2024-06-30' },
  { round: 12, slug: 'britain', flag: '🇬🇧', country: 'United Kingdom', name: 'British Grand Prix', raceName: 'British Grand Prix', circuitName: 'Silverstone Circuit', winner: 'HAM', winnerTeam: 'Mercedes', totalLaps: 52, session: 'RACE', date: '2024-07-07' },
  { round: 13, slug: 'hungary', flag: '🇭🇺', country: 'Hungary', name: 'Hungarian Grand Prix', raceName: 'Hungarian Grand Prix', circuitName: 'Hungaroring', winner: 'PIA', winnerTeam: 'McLaren', totalLaps: 70, session: 'RACE', date: '2024-07-21' },
  { round: 14, slug: 'belgium', flag: '🇧🇪', country: 'Belgium', name: 'Belgian Grand Prix', raceName: 'Belgian Grand Prix', circuitName: 'Circuit de Spa-Francorchamps', winner: 'LEC', winnerTeam: 'Ferrari', totalLaps: 44, session: 'RACE', date: '2024-07-28' },
  { round: 15, slug: 'netherlands', flag: '🇳🇱', country: 'Netherlands', name: 'Dutch Grand Prix', raceName: 'Dutch Grand Prix', circuitName: 'Circuit Zandvoort', winner: 'NOR', winnerTeam: 'McLaren', totalLaps: 72, session: 'RACE', date: '2024-08-25' },
  { round: 16, slug: 'italy', flag: '🇮🇹', country: 'Italy', name: 'Italian Grand Prix', raceName: 'Italian Grand Prix', circuitName: 'Autodromo Nazionale Monza', winner: 'LEC', winnerTeam: 'Ferrari', totalLaps: 53, session: 'RACE', date: '2024-09-01' },
  { round: 17, slug: 'azerbaijan', flag: '🇦🇿', country: 'Azerbaijan', name: 'Azerbaijan Grand Prix', raceName: 'Azerbaijan Grand Prix', circuitName: 'Baku City Circuit', winner: 'PIA', winnerTeam: 'McLaren', totalLaps: 51, session: 'RACE', date: '2024-09-15' },
  { round: 18, slug: 'singapore', flag: '🇸🇬', country: 'Singapore', name: 'Singapore Grand Prix', raceName: 'Singapore Grand Prix', circuitName: 'Marina Bay Street Circuit', winner: 'NOR', winnerTeam: 'McLaren', totalLaps: 62, session: 'RACE', date: '2024-09-22' },
  { round: 19, slug: 'united-states', flag: '🇺🇸', country: 'United States', name: 'United States Grand Prix', raceName: 'United States Grand Prix', circuitName: 'Circuit of the Americas', winner: 'LEC', winnerTeam: 'Ferrari', totalLaps: 56, session: 'RACE', date: '2024-10-20' },
  { round: 20, slug: 'mexico', flag: '🇲🇽', country: 'Mexico', name: 'Mexico City Grand Prix', raceName: 'Mexico City Grand Prix', circuitName: 'Autodromo Hermanos Rodriguez', winner: 'SAI', winnerTeam: 'Ferrari', totalLaps: 71, session: 'RACE', date: '2024-10-27' },
  { round: 21, slug: 'brazil', flag: '🇧🇷', country: 'Brazil', name: 'Sao Paulo Grand Prix', raceName: 'Sao Paulo Grand Prix', circuitName: 'Autodromo Jose Carlos Pace', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 69, session: 'RACE', date: '2024-11-03' },
  { round: 22, slug: 'las-vegas', flag: '🇺🇸', country: 'United States', name: 'Las Vegas Grand Prix', raceName: 'Las Vegas Grand Prix', circuitName: 'Las Vegas Street Circuit', winner: 'RUS', winnerTeam: 'Mercedes', totalLaps: 50, session: 'RACE', date: '2024-11-23' },
  { round: 23, slug: 'qatar', flag: '🇶🇦', country: 'Qatar', name: 'Qatar Grand Prix', raceName: 'Qatar Grand Prix', circuitName: 'Losail International Circuit', winner: 'VER', winnerTeam: 'Red Bull', totalLaps: 57, session: 'RACE', date: '2024-12-01' },
  { round: 24, slug: 'abu-dhabi', flag: '🇦🇪', country: 'Abu Dhabi', name: 'Abu Dhabi Grand Prix', raceName: 'Abu Dhabi Grand Prix', circuitName: 'Yas Marina Circuit', winner: 'NOR', winnerTeam: 'McLaren', totalLaps: 58, session: 'RACE', date: '2024-12-08' },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function seededValue(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function formatLapTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds - minutes * 60;
  return `${minutes}:${remaining.toFixed(3).padStart(6, '0')}`;
}

function getSafetyCarLaps(totalLaps) {
  if (totalLaps < 55) {
    return [{ start: Math.max(6, Math.floor(totalLaps * 0.18)), end: Math.max(8, Math.floor(totalLaps * 0.2)) }];
  }

  return [
    { start: Math.max(6, Math.floor(totalLaps * 0.16)), end: Math.max(8, Math.floor(totalLaps * 0.18)) },
    { start: Math.max(30, Math.floor(totalLaps * 0.54)), end: Math.max(32, Math.floor(totalLaps * 0.57)) },
  ];
}

function buildRaceDataset(race) {
  const safetyCarPeriods = getSafetyCarLaps(race.totalLaps);
  const raceDrivers = DRIVERS.map((driver, index) => ({
    ...driver,
    teamColor: TEAM_COLORS[driver.team],
    baseline: 84 + index * 0.28 + (1 - driver.skill) * 20,
    pitStops: race.totalLaps > 60
      ? [Math.floor(race.totalLaps * 0.28) + (index % 3), Math.floor(race.totalLaps * 0.66) + (index % 2)]
      : [Math.floor(race.totalLaps * 0.38) + (index % 4)],
    dnfLap: seededValue(index + race.round * 7) > 0.93 ? Math.floor(race.totalLaps * 0.72) + (index % 5) : null,
  }));

  const laps = [];
  const positionsByLap = [];
  const telemetryByLap = {};
  const cumulative = new Map(raceDrivers.map((driver) => [driver.code, 0]));
  const bestLapByDriver = new Map();

  for (let lap = 1; lap <= race.totalLaps; lap += 1) {
    const safetyCar = safetyCarPeriods.some((period) => lap >= period.start && lap <= period.end);
    const lapRows = [];

    raceDrivers.forEach((driver, index) => {
      const dnf = Boolean(driver.dnfLap && lap >= driver.dnfLap);
      const noise = (seededValue(lap * 101 + index * 17 + race.round) - 0.5) * 1.2;
      const paceSwing = Math.sin((lap + index) / 4) * 0.26;
      const pitLoss = driver.pitStops.includes(lap) ? 22 + (index % 5) : 0;
      const safetyCarLoss = safetyCar ? 22 + index * 0.12 : 0;
      const tireIndex = driver.pitStops.filter((pitLap) => lap > pitLap).length;
      const tire = TIRE_CYCLE[(index + tireIndex) % TIRE_CYCLE.length];
      const lapTimeSeconds = clamp(driver.baseline + noise + paceSwing + pitLoss + safetyCarLoss, 73.2, 150);
      const totalTime = cumulative.get(driver.code) + (dnf ? 999 : lapTimeSeconds);
      cumulative.set(driver.code, totalTime);

      const speed = clamp(220 + Math.sin((lap + index) / 3) * 52 + (driver.skill - 0.8) * 110, 82, 356);
      const throttle = clamp(68 + Math.sin((lap + index) / 5) * 28 + seededValue(lap + index * 3) * 22, 0, 100);
      const brake = clamp(100 - throttle + seededValue(index + lap * 9) * 18, 0, 100);
      const gear = clamp(Math.round((speed / 380) * 8), 1, 8);

      lapRows.push({
        lap,
        driver: driver.code,
        driverNumber: driver.number,
        team: driver.team,
        teamColor: driver.teamColor,
        tire,
        lapTimeSeconds,
        lapTime: formatLapTime(lapTimeSeconds),
        pit: driver.pitStops.includes(lap),
        dnf,
        totalTime,
        telemetry: {
          speed: Math.round(speed),
          throttle: Math.round(throttle),
          brake: Math.round(brake),
          gear,
          drs: speed > 290 && !safetyCar && !pitLoss,
        },
      });
    });

    lapRows.sort((left, right) => left.totalTime - right.totalTime);
    const leaderTotal = lapRows[0].totalTime;

    lapRows.forEach((row, index) => {
      const bestLap = bestLapByDriver.get(row.driver);
      if (!bestLap || row.lapTimeSeconds < bestLap.lapTimeSeconds) {
        bestLapByDriver.set(row.driver, { lap, lapTimeSeconds: row.lapTimeSeconds });
      }

      const gapSeconds = row.totalTime - leaderTotal;
      const lapsBehind = row.dnf ? null : Math.max(0, Math.floor((gapSeconds - 0.5) / 90));
      row.position = row.dnf ? 'DNF' : index + 1;
      row.gapSeconds = gapSeconds;
      row.lapsBehind = lapsBehind;

      if (!telemetryByLap[lap]) {
        telemetryByLap[lap] = {};
      }
      telemetryByLap[lap][row.driver] = row.telemetry;
    });

    positionsByLap.push({
      lap,
      safetyCar,
      standings: lapRows.map((row) => ({
        driver: row.driver,
        driverNumber: row.driverNumber,
        position: row.position,
        gapSeconds: row.gapSeconds,
        lapsBehind: row.lapsBehind,
        lastLap: row.lapTime,
        lastLapSeconds: row.lapTimeSeconds,
        tire: row.tire,
        pit: row.pit,
        dnf: row.dnf,
      })),
    });

    laps.push(...lapRows);
  }

  const fastestOverall = Array.from(bestLapByDriver.entries()).reduce((best, [driver, lapInfo]) => {
    if (!best || lapInfo.lapTimeSeconds < best.lapTimeSeconds) {
      return { driver, ...lapInfo };
    }
    return best;
  }, null);

  return {
    session: {
      ...race,
      displayName: `${race.flag} ${race.raceName.toUpperCase()}`,
      status: 'Demo Mode',
      safetyCarPeriods,
      mode: 'demo',
    },
    drivers: raceDrivers.map((driver) => ({
      number: driver.number,
      code: driver.code,
      name: driver.name,
      team: driver.team,
      teamColor: driver.teamColor,
      pitStops: driver.pitStops,
      bestLap: bestLapByDriver.get(driver.code),
      fastestLap: fastestOverall?.driver === driver.code,
    })),
    laps,
    positionsByLap,
    telemetryByLap,
    fastestOverall,
  };
}

const DATASETS_BY_SLUG = new Map(
  RACE_RESULTS_2024.map((race) => [race.slug, buildRaceDataset(race)]),
);

export function getRaceByRound(round) {
  return RACE_RESULTS_2024.find((race) => Number(race.round) === Number(round)) || RACE_RESULTS_2024[0];
}

export function normalizeRaceSummary(race) {
  if (!race) {
    return RACE_RESULTS_2024[0];
  }

  const fallback = getRaceByRound(race.round);

  return {
    ...fallback,
    ...race,
    round: Number(race.round ?? fallback.round),
    name: race.name ?? race.raceName ?? fallback.name,
    raceName: race.raceName ?? race.name ?? fallback.raceName,
    country: race.country ?? fallback.country,
    slug: race.slug ?? fallback.slug,
    circuitName: race.circuitName ?? fallback.circuitName,
    totalLaps: Number(race.totalLaps ?? fallback.totalLaps),
  };
}

export function getRaceDatasetBySlug(slug) {
  return DATASETS_BY_SLUG.get(slug) || DATASETS_BY_SLUG.get(RACE_RESULTS_2024[0].slug);
}
