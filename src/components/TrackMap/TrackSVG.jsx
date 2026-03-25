import { TRACK_WIDTH } from '../../lib/constants';
import './TrackMap.css';

function TrackSVG({ layout, pathRef }) {
  return (
    <g>
      <path
        d={layout.path}
        fill="none"
        stroke="var(--bg-elevated)"
        strokeWidth={TRACK_WIDTH + 10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={pathRef}
        d={layout.path}
        fill="none"
        stroke="#2a2a3e"
        strokeWidth={TRACK_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={layout.pitLanePath}
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="4"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      {layout.drsZones.map((zone, index) => (
        <line
          key={`${zone.start.x}-${zone.end.x}-${index}`}
          x1={zone.start.x}
          y1={zone.start.y}
          x2={zone.end.x}
          y2={zone.end.y}
          stroke="var(--color-green)"
          strokeWidth="6"
          opacity="0.6"
          strokeLinecap="round"
        />
      ))}
      <rect
        x={layout.startFinish.x - 4}
        y={layout.startFinish.y - 1}
        width="8"
        height="2"
        fill="#ffffff"
        transform={`rotate(90 ${layout.startFinish.x} ${layout.startFinish.y})`}
      />
      {layout.sectorPoints.map((sector) => (
        <text
          key={sector.label}
          x={sector.x}
          y={sector.y}
          className="trackMap__sector"
          textAnchor="middle"
        >
          {sector.label}
        </text>
      ))}
    </g>
  );
}

export default TrackSVG;
