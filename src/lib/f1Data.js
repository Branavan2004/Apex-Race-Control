import { DEMO_RACES, DRIVER_FIELD, F1_POINTS, RACE_PROFILES } from '../data/demoSeason.js';
import { DRIVER_BY_ID } from './driverData.js';
import { normalizeCircuitId } from './trackLayouts.js';

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function seededUnit(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 10000) / 10000;
}

export function lapTimeToSeconds(timeString) {
  if (!timeString) return null;
  const [minutes, seconds] = timeString.split(':');
  if (!seconds) return null;
  return Number(minutes) * 60 + Number(seconds);
}

function secondsToLapTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  return `${minutes}:${seconds.toFixed(3).padStart(6, '0')}`;
}

export function getRaceProfile(race) {
  const rawCircuitId = race?.Circuit?.circuitId;
  const circuitId = normalizeCircuitId(rawCircuitId);
  return {
    ...RACE_PROFILES.default,
    ...((circuitId && RACE_PROFILES[circuitId]) || (rawCircuitId && RACE_PROFILES[rawCircuitId]) || {}),
  };
}

function enrichRace(race, source) {
  return {
    ...race,
    source,
    profile: getRaceProfile(race),
  };
}

export function pickFeaturedRace(races = []) {
  return races.find((race) => Number(race.round) === 8) || races[0] || null;
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  let attempt = 0;
  let lastError = null;

  while (attempt < retries) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }
      return response;
    } catch (error) {
      if (options.signal?.aborted) throw error;
      lastError = error;
      attempt += 1;
      if (attempt >= retries) break;
      const delay = 250 * (2 ** (attempt - 1));
      await new Promise((resolve) => window.setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

function getPitPlan(driver, profile, race) {
  const raceLength = profile.laps;
  const firstSeed = seededUnit(`${race.round}-${driver.driverId}-pit-1`);
  const secondSeed = seededUnit(`${race.round}-${driver.driverId}-pit-2`);
  const isStreetCircuit = ['monaco', 'marina_bay', 'jeddah', 'baku', 'las_vegas'].includes(
    race?.Circuit?.circuitId,
  );

  const firstStop = clamp(
    Math.round(raceLength * (0.26 + firstSeed * 0.14 - driver.tyreCare * 0.04)),
    8,
    Math.max(14, raceLength - 18),
  );

  const wantsTwoStops =
    !isStreetCircuit && (profile.degradation > 0.7 || driver.aggression > 0.84) && secondSeed > 0.38;

  if (!wantsTwoStops) return [firstStop];

  const secondStop = clamp(
    Math.round(raceLength * (0.58 + secondSeed * 0.14 - driver.tyreCare * 0.03)),
    firstStop + 10,
    raceLength - 6,
  );

  return [firstStop, secondStop];
}

function detectPitStops(lapTimes) {
  const pitLaps = [];
  lapTimes.forEach((lapTime, index) => {
    const seconds = lapTimeToSeconds(lapTime);
    if (seconds && seconds > 110) {
      pitLaps.push(index + 1);
    }
  });
  return pitLaps;
}

function getCompoundForLap(pitStops, lapNumber) {
  if (!pitStops.length || lapNumber < pitStops[0]) return 'M';
  if (pitStops.length === 1) return pitStops[0] < 20 ? 'H' : 'S';
  if (lapNumber < pitStops[1]) return 'H';
  return 'S';
}

function generateTelemetry(seedBase, position, isPitLap) {
  const throttle = isPitLap ? 34 : clamp(Math.round(74 + seededUnit(`${seedBase}-thr`) * 24), 48, 100);
  const brake = isPitLap ? 72 : clamp(Math.round(12 + seededUnit(`${seedBase}-brk`) * 48), 2, 82);
  const gear = isPitLap ? 3 : clamp(Math.round(5 + seededUnit(`${seedBase}-gear`) * 3), 4, 8);
  const speed = isPitLap ? 84 : clamp(Math.round(245 + seededUnit(`${seedBase}-spd`) * 120 - position * 1.4), 182, 369);
  const drsOpen = !isPitLap && position > 1 && seededUnit(`${seedBase}-drs`) > 0.42;
  return { throttle, brake, gear, speed, drsOpen };
}

function normalizeReplay(race, results, laps, source, note) {
  const profile = getRaceProfile(race);
  const driverLapMap = {};

  results.forEach((result) => {
    driverLapMap[result.Driver.driverId] = [];
  });

  laps.forEach((lap) => {
    lap.Timings?.forEach((timing) => {
      if (!driverLapMap[timing.driverId]) driverLapMap[timing.driverId] = [];
      driverLapMap[timing.driverId].push(timing.time);
    });
  });

  const driverMeta = results.reduce((accumulator, result) => {
    const lapTimes = driverLapMap[result.Driver.driverId] || [];
    const pitStops = detectPitStops(lapTimes);
    accumulator[result.Driver.driverId] = {
      pitStops,
      bestLapSeconds: Math.min(...lapTimes.map(lapTimeToSeconds).filter(Boolean)),
    };
    return accumulator;
  }, {});

  const fastest = results.reduce((best, result) => {
    const candidate = driverMeta[result.Driver.driverId]?.bestLapSeconds;
    if (!Number.isFinite(candidate)) return best;
    if (!best || candidate < best.seconds) {
      return { driverId: result.Driver.driverId, seconds: candidate };
    }
    return best;
  }, null);

  const frames = laps.map((lap, lapIndex) => {
    let leaderCumulative = null;

    return {
      number: String(lap.number),
      entries: (lap.Timings || [])
        .map((timing, positionIndex) => {
          const result = results.find((entry) => entry.Driver.driverId === timing.driverId);
          const lapSeconds = lapTimeToSeconds(timing.time);
          const priorTimes = driverLapMap[timing.driverId] || [];
          const cumulative = priorTimes
            .slice(0, lapIndex + 1)
            .map(lapTimeToSeconds)
            .filter(Boolean)
            .reduce((sum, value) => sum + value, 0);
          if (leaderCumulative === null) leaderCumulative = cumulative;
          const gapToLeader = positionIndex === 0 ? 'LEADER' : `+${(cumulative - leaderCumulative).toFixed(3)}s`;
          const pitStops = driverMeta[timing.driverId]?.pitStops || [];
          const telemetry = generateTelemetry(
            `${race.round}-${timing.driverId}-${lap.number}`,
            Number(timing.position),
            pitStops.includes(lapIndex + 1),
          );

          return {
            ...timing,
            status: result?.status || 'Finished',
            gapToLeader,
            lapSeconds,
            isFastestLap: fastest?.driverId === timing.driverId && fastest.seconds === lapSeconds,
            compound: getCompoundForLap(pitStops, lapIndex + 1),
            pitStops,
            telemetry,
            finishedInPoints: Number(result?.position || 99) <= 10,
          };
        })
        .sort((left, right) => Number(left.position) - Number(right.position)),
    };
  });

  return {
    source,
    note,
    profile,
    results,
    laps,
    frames,
    safetyCarWindows: profile.safetyCarWindows || [],
  };
}

export function generateDemoRaceReplay(race) {
  const profile = getRaceProfile(race);
  const gridOrder = [...DRIVER_FIELD]
    .map((driver) => {
      const qualifyingNoise = seededUnit(`${race.round}-${driver.driverId}-grid`) * 0.42;
      const circuitBonus = profile.constructorBias?.[driver.constructorId] || 0;
      const score = driver.basePace + driver.qualifyingSkill + qualifyingNoise + circuitBonus;
      return { driver, score };
    })
    .sort((left, right) => left.score - right.score);

  const gridMap = new Map(gridOrder.map(({ driver }, index) => [driver.driverId, index + 1]));
  const raceState = DRIVER_FIELD.reduce((accumulator, driver) => {
    accumulator[driver.driverId] = {
      cumulativeTime: 0,
      lapsSinceStop: 0,
      pitStops: getPitPlan(driver, profile, race),
      lapTimes: [],
      status: 'Finished',
      dnfLap: seededUnit(`${race.round}-${driver.driverId}-dnf`) > 0.988 ? Math.round(profile.laps * 0.72) : null,
    };
    return accumulator;
  }, {});

  const laps = [];

  for (let lap = 1; lap <= profile.laps; lap += 1) {
    const lapTimeMap = {};

    DRIVER_FIELD.forEach((driver) => {
      const state = raceState[driver.driverId];
      if (state.dnfLap && lap >= state.dnfLap) {
        state.status = 'DNF';
        return;
      }

      const isPitLap = state.pitStops.includes(lap);
      const baseNoise = (seededUnit(`${race.round}-${driver.driverId}-lap-${lap}`) - 0.5) * 0.52;
      const trafficPenalty = lap <= 4 ? (gridMap.get(driver.driverId) - 1) * (lap === 1 ? 0.28 : 0.1) : 0;
      const constructorBias = profile.constructorBias?.[driver.constructorId] || 0;
      const stintWear =
        Math.pow(state.lapsSinceStop / Math.max(12, profile.laps * 0.32), 1.25) *
        profile.degradation *
        (1.08 - driver.tyreCare * 0.18);
      const latePush = lap > profile.laps * 0.84 ? -driver.aggression * 0.18 : 0;
      const pitLoss = isPitLap ? profile.pitLoss + seededUnit(`${race.round}-${driver.driverId}-pitloss`) * 2.1 : 0;

      const lapSeconds =
        profile.baseLap +
        driver.basePace +
        constructorBias +
        trafficPenalty +
        stintWear +
        baseNoise +
        latePush +
        pitLoss;

      lapTimeMap[driver.driverId] = lapSeconds;
      state.cumulativeTime += lapSeconds;
      state.lapTimes.push(lapSeconds);
      state.lapsSinceStop = isPitLap ? 0 : state.lapsSinceStop + 1;
    });

    const order = [...DRIVER_FIELD]
      .filter((driver) => raceState[driver.driverId].status !== 'DNF')
      .sort(
        (left, right) =>
          raceState[left.driverId].cumulativeTime - raceState[right.driverId].cumulativeTime,
      );

    laps.push({
      number: String(lap),
      Timings: order.map((driver, index) => ({
        driverId: driver.driverId,
        position: String(index + 1),
        time: secondsToLapTime(lapTimeMap[driver.driverId]),
      })),
    });
  }

  const classified = [...DRIVER_FIELD].sort((left, right) => {
    const leftState = raceState[left.driverId];
    const rightState = raceState[right.driverId];
    if (leftState.status === 'DNF' && rightState.status !== 'DNF') return 1;
    if (leftState.status !== 'DNF' && rightState.status === 'DNF') return -1;
    return leftState.cumulativeTime - rightState.cumulativeTime;
  });

  const results = classified.map((driver, index) => ({
    number: driver.permanentNumber,
    position: String(index + 1),
    positionText: String(index + 1),
    points: String(F1_POINTS[index] || 0),
    grid: String(gridMap.get(driver.driverId)),
    laps: String(profile.laps),
    status: raceState[driver.driverId].status === 'DNF' ? 'DNF' : 'Finished',
    Driver: {
      driverId: driver.driverId,
      permanentNumber: driver.permanentNumber,
      code: driver.code,
      givenName: driver.givenName,
      familyName: driver.familyName,
      nationality: driver.nationality,
    },
    Constructor: {
      constructorId: driver.constructorId,
      name: driver.constructorName,
      nationality: 'Unknown',
    },
  }));

  return normalizeReplay(
    race,
    results,
    laps,
    'demo',
    'Using a deterministic showcase replay so the dashboard remains fully interactive offline.',
  );
}

export async function fetchSeasonCalendar(season, signal) {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/season/${season}`, { signal });
    const payload = await response.json();
    const races = payload?.MRData?.RaceTable?.Races || [];

    if (!races.length) {
      throw new Error('Calendar response did not include race data.');
    }

    return {
      source: 'live',
      note: 'Connected to live season calendar data.',
      races: races.map((race) => {
        const demoRace = DEMO_RACES.find((item) => item.round === race.round);
        return enrichRace({ ...demoRace, ...race, flag: demoRace?.flag, winnerName: demoRace?.winnerName, winnerNumber: demoRace?.winnerNumber }, 'live');
      }),
    };
  } catch (error) {
    if (signal?.aborted) throw error;

    return {
      source: 'demo',
      note: 'Live calendar unavailable, switched to a curated showcase season.',
      races: DEMO_RACES.map((race) => enrichRace(race, 'demo')),
    };
  }
}

export async function fetchRaceReplay(season, race, signal) {
  try {
    const replayResponse = await fetchWithRetry(`${API_BASE_URL}/replay/${season}/${race.round}`, { signal });
    const { results: resultsPayload, laps: lapsPayload } = await replayResponse.json();
    const results = resultsPayload?.MRData?.RaceTable?.Races?.[0]?.Results || [];
    const laps = lapsPayload?.MRData?.RaceTable?.Races?.[0]?.Laps || [];

    if (!results.length || !laps.length) {
      throw new Error('Replay payload was incomplete.');
    }

    return normalizeReplay(race, results, laps, 'live', 'Race replay powered by live API timing data.');
  } catch (error) {
    if (signal?.aborted) throw error;
    return generateDemoRaceReplay(race);
  }
}

export function buildDriverStats(replay, driverId) {
  const lapTimes = replay.laps
    .map((lap) => lap.Timings?.find((entry) => entry.driverId === driverId)?.time)
    .map(lapTimeToSeconds)
    .filter(Boolean);

  if (!lapTimes.length) {
    return { average: '--', best: '--', laps: 0, pitStops: 0 };
  }

  const average = lapTimes.reduce((sum, value) => sum + value, 0) / lapTimes.length;
  const best = Math.min(...lapTimes);
  const pitStops = detectPitStops(lapTimes.map(secondsToLapTime)).length;

  return {
    average: secondsToLapTime(average),
    best: secondsToLapTime(best),
    laps: lapTimes.length,
    pitStops,
  };
}

export function getDefaultSelectedDrivers(results = []) {
  return results.slice(0, 5).map((result) => result.Driver.driverId);
}

export function getDriverMeta(driverId) {
  return DRIVER_BY_ID[driverId];
}
