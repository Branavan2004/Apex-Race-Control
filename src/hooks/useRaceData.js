import { useEffect, useMemo, useState } from 'react';

import { api } from '../lib/api';
import {
  RACE_RESULTS_2024,
  getRaceDatasetBySlug,
  normalizeRaceSummary,
} from '../lib/raceResults2024';

function buildChartData(laps = []) {
  const chartMap = new Map();
  const telemetryByLap = {};

  laps.forEach((row) => {
    if (!chartMap.has(row.lap)) {
      chartMap.set(row.lap, { lap: row.lap });
    }
    chartMap.get(row.lap)[row.driver] = row.lapTimeSeconds;
    if (!telemetryByLap[row.lap]) {
      telemetryByLap[row.lap] = {};
    }
    telemetryByLap[row.lap][row.driver] = row.telemetry;
  });

  return {
    chartData: Array.from(chartMap.values()),
    telemetryByLap,
  };
}

function buildLocalState(race) {
  const selectedRace = normalizeRaceSummary(race || RACE_RESULTS_2024[0]);
  const dataset = getRaceDatasetBySlug(selectedRace.slug);
  const { chartData, telemetryByLap } = buildChartData(dataset.laps);

  return {
    loading: false,
    refreshing: false,
    error: '',
    warning: 'Live timing unavailable. Showing curated demo data.',
    demoMode: true,
    isDemoMode: true,
    sessions: RACE_RESULTS_2024,
    session: dataset.session,
    drivers: dataset.drivers,
    chartData,
    positionsByLap: dataset.positionsByLap,
    telemetryByLap,
    fastestOverall: dataset.fastestOverall,
    safetyCarPeriods: dataset.session.safetyCarPeriods || [],
  };
}

function normalizeSessionsResponse(payload) {
  const raceList = payload?.races || payload?.sessions || payload?.data || payload;

  if (!Array.isArray(raceList) || raceList.length === 0) {
    throw new Error('Empty response');
  }

  return raceList.map((race) => normalizeRaceSummary(race));
}

export function useRaceData(selectedRace) {
  const selectedSummary = normalizeRaceSummary(selectedRace || RACE_RESULTS_2024[0]);
  const [state, setState] = useState(() => buildLocalState(selectedSummary));

  useEffect(() => {
    setState((current) => ({
      ...buildLocalState(selectedSummary),
      sessions: current.sessions?.length ? current.sessions : RACE_RESULTS_2024,
    }));
  }, [selectedSummary.round, selectedSummary.slug]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4000);

    async function loadSessions() {
      try {
        const response = await fetch('/api/sessions', {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('API failed');

        const sessions = normalizeSessionsResponse(await response.json());

        if (active) {
          setState((current) => ({
            ...current,
            sessions,
            warning: '',
            demoMode: false,
            isDemoMode: false,
          }));
        }
      } catch (error) {
        if (active) {
          console.warn('Using mock data:', error.message);
          setState((current) => ({
            ...current,
            sessions: RACE_RESULTS_2024,
            warning: 'Live race list unavailable. Showing the built-in 2024 season.',
            demoMode: true,
            isDemoMode: true,
          }));
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadSessions();

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const raceSlug = selectedSummary.slug;

    setState((current) => ({
      ...current,
      loading: !current.session,
      refreshing: Boolean(current.session),
      error: '',
    }));

    async function loadRace() {
      try {
        const [sessionRes, driversRes, lapsRes, positionsRes] = await Promise.all([
          api.getSession(raceSlug),
          api.getDrivers(raceSlug),
          api.getLaps(raceSlug),
          api.getPositions(raceSlug),
        ]);

        if (!active) {
          return;
        }

        const { chartData, telemetryByLap } = buildChartData(lapsRes.laps);

        setState((current) => ({
          ...current,
          loading: false,
          refreshing: false,
          error: '',
          warning: Boolean(sessionRes.demoMode)
            ? 'Live timing unavailable. Showing curated demo data.'
            : '',
          demoMode: Boolean(sessionRes.demoMode),
          isDemoMode: Boolean(sessionRes.demoMode),
          session: sessionRes.session,
          drivers: driversRes.drivers,
          chartData,
          positionsByLap: positionsRes.positions,
          telemetryByLap,
          fastestOverall: lapsRes.fastestOverall,
          safetyCarPeriods: lapsRes.safetyCarPeriods || sessionRes.session?.safetyCarPeriods || [],
        }));
      } catch (error) {
        if (!active) {
          return;
        }

        console.warn('Using mock data:', error.message);
        setState((current) => ({
          ...current,
          ...buildLocalState(selectedSummary),
          loading: false,
          refreshing: false,
          warning: 'Live timing request failed. Dashboard switched to local demo data.',
          sessions: current.sessions?.length ? current.sessions : RACE_RESULTS_2024,
        }));
      }
    }

    loadRace();

    return () => {
      active = false;
    };
  }, [selectedSummary.round, selectedSummary.slug]);

  const currentStandings = useMemo(
    () => (lap) => {
      if (!state.positionsByLap.length) {
        return [];
      }

      const byLap = state.positionsByLap.find((entry) => entry.lap === lap) || state.positionsByLap[0];

      return byLap.standings.map((standing) => ({
        ...standing,
        ...(state.drivers.find((driver) => driver.code === standing.driver) || {}),
        fastestLap: state.fastestOverall?.driver === standing.driver,
      }));
    },
    [state.positionsByLap, state.drivers, state.fastestOverall],
  );

  return {
    ...state,
    currentStandings,
  };
}
