import './TelemetryPanel.css';

function polar(cx, cy, radius, angle) {
  const radians = (angle - 180) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function arc(cx, cy, radius, start, end) {
  const from = polar(cx, cy, radius, start);
  const to = polar(cx, cy, radius, end);
  return `M ${from.x} ${from.y} A ${radius} ${radius} 0 0 1 ${to.x} ${to.y}`;
}

function SpeedGauge({ speed = 0 }) {
  const rotation = -180 + (Math.min(speed, 380) / 380) * 180;

  return (
    <div className="telemetry__gauge">
      <svg viewBox="0 0 240 140">
        <path d={arc(120, 120, 82, 0, 56)} stroke="#00d2be" strokeWidth="12" fill="none" />
        <path d={arc(120, 120, 82, 56, 119)} stroke="#ffd700" strokeWidth="12" fill="none" />
        <path d={arc(120, 120, 82, 119, 180)} stroke="#e10600" strokeWidth="12" fill="none" />
        <line
          x1="120"
          y1="120"
          x2="120"
          y2="46"
          className="telemetry__needle"
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '120px 120px' }}
        />
        <circle cx="120" cy="120" r="6" fill="#fff" />
        <text x="120" y="90" textAnchor="middle" className="telemetry__speedValue">{speed}</text>
        <text x="120" y="108" textAnchor="middle" className="telemetry__speedLabel">KM/H</text>
      </svg>
    </div>
  );
}

export default SpeedGauge;
