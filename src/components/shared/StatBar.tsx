import { useEffect, useRef, useState } from 'react';

import { useInView } from '../../hooks/useInView';

type StatBarProps = {
  label: string;
  value: number;
};

export default function StatBar({ label, value }: StatBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.5);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const duration = 900;

    const tick = (time: number) => {
      if (!start) {
        start = time;
      }

      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="stat-bar">
      <div className="stat-bar__meta">
        <span>{label}</span>
        <span>{displayValue}</span>
      </div>
      <div className="stat-bar__track">
        <div className="stat-bar__fill" style={{ width: `${displayValue}%` }} />
      </div>
    </div>
  );
}
