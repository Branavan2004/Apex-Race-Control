import { useEffect, useMemo, useRef, useState } from 'react';

import { useInView } from '../../hooks/useInView';

type ArcGaugeProps = {
  label: string;
  subtitle?: string;
  value: number;
  color: string;
  max?: number;
  size?: number;
  unit?: string;
};

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export default function ArcGauge({
  label,
  subtitle,
  value,
  color,
  max = 100,
  size = 220,
  unit = '/100',
}: ArcGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  const [animatedValue, setAnimatedValue] = useState(0);
  const center = size / 2;
  const radius = size * 0.35;
  const startAngle = -120;
  const endAngle = 120;
  const trackPath = useMemo(
    () => describeArc(center, center, radius, startAngle, endAngle),
    [center, radius],
  );

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const duration = 1100;

    const tick = (time: number) => {
      if (!start) {
        start = time;
      }

      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const clamped = Math.min(animatedValue / max, 1);
  const angle = startAngle + (endAngle - startAngle) * clamped;
  const needle = polarToCartesian(center, center, radius - 10, angle);

  return (
    <div ref={ref} className="arc-gauge glass">
      <div className="arc-gauge__heading">
        <p>{label}</p>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="arc-gauge__svg" aria-hidden="true">
        <path d={trackPath} className="arc-gauge__track" />
        <path
          d={trackPath}
          className="arc-gauge__progress"
          style={{
            stroke: color,
            strokeDasharray: 1,
            strokeDashoffset: 1 - clamped,
            pathLength: 1,
          }}
        />
        <line
          x1={center}
          y1={center}
          x2={needle.x}
          y2={needle.y}
          className="arc-gauge__needle"
          style={{ stroke: color }}
        />
        <circle cx={center} cy={center} r={8} fill={color} />
      </svg>
      <div className="arc-gauge__value">
        <strong>{Math.round(animatedValue)}</strong>
        <span>{unit}</span>
      </div>
    </div>
  );
}
