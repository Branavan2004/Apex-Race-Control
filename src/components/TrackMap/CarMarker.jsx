import './TrackMap.css';

function CarMarker({ driverNumber, teamColor, x, y, angle, isLeader, position }) {
  const pointsPosition = typeof position === 'number' && position <= 10;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`} className="trackMap__markerGroup">
      {pointsPosition ? <circle r="11" fill="none" stroke={teamColor} strokeWidth="1" opacity="0.5" /> : null}
      <circle
        r={isLeader ? 9 : 7}
        fill={teamColor}
        stroke="#fff"
        strokeWidth={isLeader ? 2 : 1.5}
        className={isLeader ? 'trackMap__markerLeader' : ''}
        style={isLeader ? { color: teamColor } : undefined}
      />
      <polygon points="9,0 15,-4 15,4" fill={teamColor} opacity="0.85" />
      <text
        x="0"
        y="1"
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="7"
        fontFamily="Rajdhani"
        fontWeight="700"
      >
        {driverNumber}
      </text>
    </g>
  );
}

export default CarMarker;
