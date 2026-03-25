import SpeedGauge from './SpeedGauge';
import ThrottleBrakeBar from './ThrottleBrakeBar';
import GearDisplay from './GearDisplay';
import './TelemetryPanel.css';

function TelemetryPanel({ driver, telemetry, isRefreshing = false }) {
  return (
    <section className="telemetry">
      <header className="telemetry__header">
        <div className="section-title">Telemetry</div>
        <span className="telemetry__driver">
          {isRefreshing
            ? 'Updating feed...'
            : driver
              ? `${driver.name} / ${driver.code}`
              : 'Select driver'}
        </span>
      </header>
      <div className="telemetry__body">
        <SpeedGauge speed={telemetry?.speed || 0} />
        <div className="telemetry__right">
          <ThrottleBrakeBar throttle={telemetry?.throttle || 0} brake={telemetry?.brake || 0} />
          <GearDisplay gear={telemetry?.gear || 0} drs={telemetry?.drs || false} />
        </div>
      </div>
    </section>
  );
}

export default TelemetryPanel;
