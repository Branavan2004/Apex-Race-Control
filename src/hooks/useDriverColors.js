import { useMemo } from 'react';

export function useDriverColors(drivers) {
  return useMemo(
    () => Object.fromEntries(drivers.map((driver) => [driver.code, driver.teamColor])),
    [drivers],
  );
}
