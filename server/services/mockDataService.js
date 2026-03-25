const mockRaces = require('../data/mockRaces');

const drivers = [
  { number: 1, code: 'VER', name: 'Max Verstappen', team: 'Red Bull', teamColor: '#3671C6', skill: 0.99 },
  { number: 11, code: 'PER', name: 'Sergio Perez', team: 'Red Bull', teamColor: '#3671C6', skill: 0.93 },
  { number: 16, code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', teamColor: '#E80020', skill: 0.97 },
  { number: 55, code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', teamColor: '#E80020', skill: 0.95 },
  { number: 4, code: 'NOR', name: 'Lando Norris', team: 'McLaren', teamColor: '#FF8000', skill: 0.97 },
  { number: 81, code: 'PIA', name: 'Oscar Piastri', team: 'McLaren', teamColor: '#FF8000', skill: 0.94 },
  { number: 44, code: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes', teamColor: '#00D2BE', skill: 0.96 },
  { number: 63, code: 'RUS', name: 'George Russell', team: 'Mercedes', teamColor: '#00D2BE', skill: 0.94 },
  { number: 14, code: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin', teamColor: '#229971', skill: 0.92 },
  { number: 18, code: 'STR', name: 'Lance Stroll', team: 'Aston Martin', teamColor: '#229971', skill: 0.86 },
  { number: 10, code: 'GAS', name: 'Pierre Gasly', team: 'Alpine', teamColor: '#0090FF', skill: 0.87 },
  { number: 31, code: 'OCO', name: 'Esteban Ocon', team: 'Alpine', teamColor: '#0090FF', skill: 0.86 },
  { number: 22, code: 'TSU', name: 'Yuki Tsunoda', team: 'RB', teamColor: '#6692FF', skill: 0.88 },
  { number: 3, code: 'RIC', name: 'Daniel Ricciardo', team: 'RB', teamColor: '#6692FF', skill: 0.84 },
  { number: 27, code: 'HUL', name: 'Nico Hulkenberg', team: 'Haas', teamColor: '#B6BABD', skill: 0.85 },
  { number: 20, code: 'MAG', name: 'Kevin Magnussen', team: 'Haas', teamColor: '#B6BABD', skill: 0.82 },
  { number: 23, code: 'ALB', name: 'Alex Albon', team: 'Williams', teamColor: '#64C4FF', skill: 0.86 },
  { number: 2, code: 'SAR', name: 'Logan Sargeant', team: 'Williams', teamColor: '#64C4FF', skill: 0.79 },
  { number: 77, code: 'BOT', name: 'Valtteri Bottas', team: 'Sauber', teamColor: '#52E252', skill: 0.82 },
  { number: 24, code: 'ZHO', name: 'Zhou Guanyu', team: 'Sauber', teamColor: '#52E252', skill: 0.8 },
];

const tireCycle = ['S', 'S', 'M', 'M', 'H', 'H', 'S'];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function seededValue(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
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
  const totalLaps = race.totalLaps;
  const safetyCarPeriods = getSafetyCarLaps(totalLaps);

  const raceDrivers = drivers.map((driver, index) => {
    const baseline = 84 + index * 0.28 + (1 - driver.skill) * 20;
    const pitStops = totalLaps > 60
      ? [Math.floor(totalLaps * 0.28) + (index % 3), Math.floor(totalLaps * 0.66) + (index % 2)]
      : [Math.floor(totalLaps * 0.38) + (index % 4)];
    const dnfLap = seededValue(index + race.round * 7) > 0.93 ? Math.floor(totalLaps * 0.72) + (index % 5) : null;

    return {
      ...driver,
      baseline,
      pitStops,
      dnfLap,
    };
  });

  const laps = [];
  const positionsByLap = [];
  const telemetryByLap = {};
  const cumulative = new Map(raceDrivers.map((driver) => [driver.code, 0]));
  const bestLapByDriver = new Map();

  for (let lap = 1; lap <= totalLaps; lap += 1) {
    const scActive = safetyCarPeriods.some((period) => lap >= period.start && lap <= period.end);
    const lapRows = [];

    raceDrivers.forEach((driver, index) => {
      const dnf = driver.dnfLap && lap >= driver.dnfLap;
      const noise = (seededValue(lap * 101 + index * 17 + race.round) - 0.5) * 1.2;
      const paceSwing = Math.sin((lap + index) / 4) * 0.26;
      const pitLoss = driver.pitStops.includes(lap) ? 22 + (index % 5) : 0;
      const safetyCarLoss = scActive ? 22 + index * 0.12 : 0;
      const tireIndex = driver.pitStops.filter((pitLap) => lap > pitLap).length;
      const tireCompound = tireCycle[(index + tireIndex) % tireCycle.length];
      const baseTime = driver.baseline + noise + paceSwing + pitLoss + safetyCarLoss;
      const lapTimeSeconds = clamp(baseTime, 73.2, 150);
      const currentTotal = cumulative.get(driver.code) + (dnf ? 999 : lapTimeSeconds);
      cumulative.set(driver.code, currentTotal);

      const speed = clamp(220 + Math.sin((lap + index) / 3) * 52 + (driver.skill - 0.8) * 110, 82, 356);
      const throttle = clamp(68 + Math.sin((lap + index) / 5) * 28 + seededValue(lap + index * 3) * 22, 0, 100);
      const brake = clamp(100 - throttle + seededValue(index + lap * 9) * 18, 0, 100);
      const gear = clamp(Math.round((speed / 380) * 8), 1, 8);
      const drs = speed > 290 && !scActive && !pitLoss;

      lapRows.push({
        lap,
        driver: driver.code,
        driverNumber: driver.number,
        team: driver.team,
        teamColor: driver.teamColor,
        tire: tireCompound,
        lapTimeSeconds,
        lapTime: formatLapTime(lapTimeSeconds),
        pit: driver.pitStops.includes(lap),
        dnf,
        totalTime: currentTotal,
        telemetry: {
          speed: Math.round(speed),
          throttle: Math.round(throttle),
          brake: Math.round(brake),
          gear,
          drs,
        },
      });
    });

    lapRows.sort((a, b) => a.totalTime - b.totalTime);
    const leaderTotal = lapRows[0].totalTime;
    const leaderLapCount = lap;

    lapRows.forEach((row, index) => {
      const best = bestLapByDriver.get(row.driver);
      if (!best || row.lapTimeSeconds < best.lapTimeSeconds) {
        bestLapByDriver.set(row.driver, { lap, lapTimeSeconds: row.lapTimeSeconds });
      }

      const gapSeconds = row.totalTime - leaderTotal;
      const lapsBehind = row.dnf ? null : Math.max(0, Math.floor((gapSeconds - 0.5) / 90));
      row.position = row.dnf ? 'DNF' : index + 1;
      row.gapSeconds = gapSeconds;
      row.lapsBehind = lapsBehind;
      row.progress = row.dnf ? 0.995 : clamp((lap + (1 - gapSeconds / 120)) / totalLaps, 0.01, 0.995);
      row.positionAtLap = index + 1;

      if (!telemetryByLap[lap]) {
        telemetryByLap[lap] = {};
      }
      telemetryByLap[lap][row.driver] = row.telemetry;
    });

    positionsByLap.push({
      lap,
      safetyCar: scActive,
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
        progress: row.progress,
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
      fastestLap: fastestOverall.driver === driver.code,
    })),
    laps,
    positionsByLap,
    telemetryByLap,
    fastestOverall,
  };
}

const datasets = new Map(mockRaces.map((race) => [race.slug, buildRaceDataset(race)]));

function getAllSessions() {
  return mockRaces;
}

function getSession(slug) {
  return datasets.get(slug);
}

module.exports = {
  getAllSessions,
  getSession,
};
