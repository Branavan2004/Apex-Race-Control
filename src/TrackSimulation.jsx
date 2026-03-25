import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { resolveCircuitLayout } from './lib/trackLayouts.js';
import { TEAM_COLORS } from './lib/teamColors.js';

const CarMarker = memo(function CarMarker({ driver, isHighlighted }) {
  const color = TEAM_COLORS[driver.constructor?.constructorId] || '#fff';
  return (
    <g>
      <circle
        cx={driver.x}
        cy={driver.y}
        r={isHighlighted ? 8.5 : 6}
        fill={color}
        stroke="#fff"
        strokeWidth={isHighlighted ? 1.8 : 0.8}
        style={{
          transition: 'var(--transition)',
          filter: isHighlighted ? 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' : 'none',
        }}
      />
      <text x={driver.x} y={driver.y - 12} textAnchor="middle" className="track-marker-label">
        {driver.driverInfo?.code || 'DRV'}
      </text>
    </g>
  );
});

function buildSegmentPath(pathRef, totalLength, startPercent, endPercent) {
  const start = Math.floor(totalLength * startPercent);
  const end = Math.floor(totalLength * endPercent);
  let path = '';
  for (let length = start; length <= end; length += 8) {
    const point = pathRef.getPointAtLength(length);
    path += `${length === start ? 'M' : 'L'}${point.x},${point.y} `;
  }
  return path.trim();
}

export default function TrackSimulation({
  race,
  standings = [],
  currentLap,
  hoveredDriverId,
  selectedDriverId,
  loading,
}) {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const layout = resolveCircuitLayout(race?.Circuit?.circuitId || 'default');

  useEffect(() => {
    if (!pathRef.current) return;
    setPathLength(pathRef.current.getTotalLength());
  }, [layout.path]);

  const drsPaths = useMemo(() => {
    if (!pathRef.current || !pathLength) return [];
    return (race?.profile?.drsZones || []).map(([start, end]) =>
      buildSegmentPath(pathRef.current, pathLength, start, end),
    );
  }, [pathLength, race]);

  const markers = useMemo(() => {
    if (!pathRef.current || !pathLength) return [];
    return standings.map((driver, index) => {
      const progress = ((currentLap - 1) / Math.max(race?.profile?.laps || 1, 1) + (1 - index / 24)) % 1;
      const point = pathRef.current.getPointAtLength(progress * pathLength);
      return { ...driver, x: point.x, y: point.y };
    });
  }, [currentLap, pathLength, race, standings]);

  const pitLane = useMemo(() => {
    const { x, y, angle } = layout.startFinish;
    const radians = (angle * Math.PI) / 180;
    const dx = Math.cos(radians) * 50;
    const dy = Math.sin(radians) * 50;
    return {
      x1: x - dx - 10,
      y1: y - dy + 14,
      x2: x + dx - 10,
      y2: y + dy + 14,
    };
  }, [layout]);

  if (loading) {
    return <div className="track-skeleton" />;
  }

  return (
    <div className="track-card" title={race?.Circuit?.circuitName}>
      <div className="track-card__stats">
        <span>{race?.profile?.lengthKm}</span>
        <span>{race?.profile?.laps} LAPS</span>
        <span>REC {race?.profile?.lapRecord}</span>
      </div>

      <svg viewBox="0 0 520 360" className="track-card__svg">
        <path ref={pathRef} d={layout.path} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="34" strokeLinecap="round" />
        <path d={layout.path} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
        {drsPaths.map((segment, index) => (
          <path key={index} d={segment} fill="none" stroke="var(--accent-green)" strokeWidth="7" strokeLinecap="round" />
        ))}
        <line x1={pitLane.x1} y1={pitLane.y1} x2={pitLane.x2} y2={pitLane.y2} stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeDasharray="4 6" />
        {markers.map((driver) => (
          <CarMarker
            key={driver.driverId}
            driver={driver}
            isHighlighted={driver.driverId === hoveredDriverId || driver.driverId === selectedDriverId}
          />
        ))}
      </svg>

      <span className="track-card__watermark">{race?.Circuit?.circuitName}</span>
    </div>
  );
}
