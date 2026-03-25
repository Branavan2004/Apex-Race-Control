import { useMemo } from 'react';

export function useTelemetry({ telemetryByLap, currentLap, selectedDriver }) {
  return useMemo(() => {
    if (!telemetryByLap?.[currentLap] || !selectedDriver) {
      return null;
    }
    return telemetryByLap[currentLap][selectedDriver] || null;
  }, [telemetryByLap, currentLap, selectedDriver]);
}
