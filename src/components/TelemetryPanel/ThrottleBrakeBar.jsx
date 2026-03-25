import './TelemetryPanel.css';

function Bar({ value, label, color }) {
  return (
    <div className="telemetry__barGroup">
      <span className="telemetry__barValue">{value}%</span>
      <div className="telemetry__barShell">
        <div className="telemetry__barFill" style={{ height: `${value}%`, background: color }} />
      </div>
      <span className="telemetry__barLabel">{label}</span>
    </div>
  );
}

function ThrottleBrakeBar({ throttle = 0, brake = 0 }) {
  return (
    <div className="telemetry__bars">
      <Bar value={throttle} label="THR" color="var(--color-green)" />
      <Bar value={brake} label="BRK" color="var(--f1-red)" />
    </div>
  );
}

export default ThrottleBrakeBar;
