import { useEffect, useState } from 'react';

import { REPLAY_SPEEDS } from '../lib/constants';

export function useReplayEngine({ totalLaps }) {
  const [currentLap, setCurrentLap] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(REPLAY_SPEEDS[0]);

  useEffect(() => {
    setCurrentLap(1);
    setIsPlaying(true);
    setSpeed(REPLAY_SPEEDS[0]);
  }, [totalLaps]);

  useEffect(() => {
    if (!isPlaying || totalLaps <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentLap((lap) => {
        if (lap >= totalLaps) {
          setIsPlaying(false);
          return totalLaps;
        }
        return lap + 1;
      });
    }, Math.max(140, 1200 / speed));

    return () => window.clearInterval(interval);
  }, [isPlaying, speed, totalLaps]);

  return {
    currentLap,
    isPlaying,
    speed,
    setCurrentLap: (lap) => setCurrentLap(Math.max(1, Math.min(totalLaps || 1, lap))),
    setSpeed,
    togglePlayback: () => setIsPlaying((value) => !value),
    restart: () => {
      setCurrentLap(1);
      setIsPlaying(false);
    },
    previousLap: () => {
      setCurrentLap((lap) => Math.max(1, lap - 1));
      setIsPlaying(false);
    },
    nextLap: () => {
      setCurrentLap((lap) => Math.min(totalLaps || 1, lap + 1));
      setIsPlaying(false);
    },
    finalLap: () => {
      setCurrentLap(totalLaps || 1);
      setIsPlaying(false);
    },
    reset: () => {
      setCurrentLap(1);
      setIsPlaying(true);
    },
  };
}
