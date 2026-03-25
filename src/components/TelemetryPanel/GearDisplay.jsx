import './TelemetryPanel.css';

function gearColor(gear) {
  if (gear === 1) return '#e10600';
  if (gear === 2) return '#ff8c00';
  if (gear === 3) return '#ffd700';
  if (gear >= 6) return '#54d9ff';
  return '#ffffff';
}

function GearDisplay({ gear = 0, drs = false }) {
  return (
    <div className="telemetry__gear">
      <span className="telemetry__gearValue" style={{ color: gearColor(gear) }}>{gear}</span>
      <span className="telemetry__gearLabel">GEAR</span>
      <span className={`telemetry__drs ${drs ? 'telemetry__drs--open' : ''}`}>
        {drs ? 'DRS OPEN' : 'DRS CLOSED'}
      </span>
    </div>
  );
}

export default GearDisplay;
