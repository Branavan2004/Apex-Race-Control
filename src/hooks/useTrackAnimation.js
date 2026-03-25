import { useEffect, useState } from 'react';

function normalizeProgress(progress) {
  if (progress < 0) {
    return 1 + progress;
  }

  if (progress > 1) {
    return progress - 1;
  }

  return progress;
}

function getVisualGap(driver, index) {
  if (index === 0) {
    return 0;
  }

  const gapSeconds = Number(driver.gapSeconds || 0);
  const lapsBehind = Number(driver.lapsBehind || 0);
  const rankSpacing = index * 0.02;
  const timeSpacing = Math.log1p(gapSeconds) * 0.018;
  const lapPenalty = lapsBehind * 0.12;

  return Math.min(0.82, rankSpacing + timeSpacing + lapPenalty);
}

export function useTrackAnimation(pathRef, standings) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || standings.length === 0) {
      setMarkers([]);
      return;
    }

    const totalLength = path.getTotalLength();
    const leaderProgress = standings[0]?.progress || 0.01;
    setMarkers(
      standings.map((driver, index) => {
        const displayProgress = normalizeProgress(leaderProgress - getVisualGap(driver, index));
        const length = totalLength * displayProgress;
        const current = path.getPointAtLength(length);
        const ahead = path.getPointAtLength(Math.min(totalLength, length + 4));
        const angle = Math.atan2(ahead.y - current.y, ahead.x - current.x) * (180 / Math.PI);
        return {
          ...driver,
          displayProgress,
          x: current.x,
          y: current.y,
          angle,
          isLeader: index === 0,
        };
      }),
    );
  }, [pathRef, standings]);

  return markers;
}
