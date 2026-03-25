export function formatLapTime(seconds) {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
    return '--:--.---';
  }
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds - minutes * 60;
  return `${minutes}:${remainder.toFixed(3).padStart(6, '0')}`;
}

export function formatShortLapTime(seconds) {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
    return '--:--';
  }
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds - minutes * 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

export function formatGap(gapSeconds, lapsBehind = 0) {
  if (!gapSeconds || gapSeconds < 0.001) {
    return 'LEADER';
  }
  if (lapsBehind > 0) {
    return `+${lapsBehind} LAP${lapsBehind > 1 ? 'S' : ''}`;
  }
  if (gapSeconds < 60) {
    return `+${gapSeconds.toFixed(3)}`;
  }
  const minutes = Math.floor(gapSeconds / 60);
  const remainder = gapSeconds - minutes * 60;
  return `+${minutes}:${remainder.toFixed(3).padStart(6, '0')}`;
}

export function formatClockUtc(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(date);
}
