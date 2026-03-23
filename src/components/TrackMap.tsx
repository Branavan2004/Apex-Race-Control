import { memo, useEffect, useRef, useState } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const PATH = "M18,70 C14,30 36,18 64,16 C96,14 118,34 118,56 C118,73 98,78 86,72 C73,65 74,48 84,44 C97,39 106,48 103,61 C98,83 75,92 56,88 C38,84 20,92 18,70 Z";

const TrackMap = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const { progress } = useScrollVelocity();
  const [point, setPoint] = useState({ x: 18, y: 70 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const nextPoint = path.getPointAtLength(length * progress);
    setPoint({ x: nextPoint.x, y: nextPoint.y });
  }, [progress]);

  return (
    <div className="pointer-events-none fixed bottom-16 left-5 z-[54] hidden xl:block">
      <div className="hud-panel rounded-[18px] p-3">
        <p className="mb-2 font-data text-[9px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">Circuit Map</p>
        <svg viewBox="0 0 140 96" className="h-[90px] w-[140px]">
          <path ref={pathRef} d={PATH} fill="none" stroke="rgba(240,240,240,0.24)" strokeWidth="4" strokeLinecap="round" />
          <circle cx={point.x} cy={point.y} r="5" fill="var(--f1-red)" style={{ filter: "drop-shadow(0 0 8px rgba(232,0,45,0.8))" }} />
        </svg>
      </div>
    </div>
  );
};

export default memo(TrackMap);
