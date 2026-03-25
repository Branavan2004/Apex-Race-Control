import { memo, useEffect, useRef, useState } from 'react';

type TrackMapProps = {
  progress: number;
};

const TRACK_PATH =
  'M 12 54 C 18 24, 44 18, 55 30 C 68 10, 98 14, 104 32 C 126 30, 128 58, 112 66 C 120 82, 104 96, 84 90 C 74 104, 48 100, 40 84 C 20 88, 6 74, 12 54';

const TrackMap = memo(function TrackMap({ progress }: TrackMapProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState({ x: 12, y: 54 });

  useEffect(() => {
    const path = pathRef.current;

    if (!path) {
      return;
    }

    const length = path.getTotalLength();
    const target = path.getPointAtLength(length * progress);
    setPoint({ x: target.x, y: target.y });
  }, [progress]);

  return (
    <div className="overlay-track glass">
      <span>CIRCUIT MAP</span>
      <svg viewBox="0 0 140 90" aria-hidden="true">
        <path ref={pathRef} d={TRACK_PATH} className="overlay-track__path" />
        <circle cx={point.x} cy={point.y} r="4" className="overlay-track__dot" />
      </svg>
    </div>
  );
});

export default TrackMap;
