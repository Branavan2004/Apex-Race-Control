import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import GlassCard from '../shared/GlassCard';

function createWave(seed: number, offset = 0) {
  return Array.from({ length: 24 }, (_, index) => {
    const x = (index / 23) * 100;
    const base = 50 + Math.sin(index * 0.38 + seed + offset) * 22;
    return `${index === 0 ? 'M' : 'L'} ${x} ${Math.max(8, Math.min(92, base))}`;
  }).join(' ');
}

function createOrbitPath(value: number) {
  const angle = value * Math.PI * 2;
  const x = 50 + Math.cos(angle) * 28;
  const y = 50 + Math.sin(angle) * 28;
  return { x, y };
}

export default function LiveTelemetry() {
  const [rpm, setRpm] = useState(13850);
  const [gear, setGear] = useState(6);
  const [drsOpen, setDrsOpen] = useState(true);
  const [gForcePhase, setGForcePhase] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRpm((current) => {
        const next = current + (Math.random() * 1800 - 900);
        return Math.max(12000, Math.min(16500, Math.round(next)));
      });
      setGear((current) => (current % 8) + 1);
      setDrsOpen((current) => !current);
      setGForcePhase((current) => (current + 0.04) % 1);
    }, 1400);

    return () => window.clearInterval(interval);
  }, []);

  const lines = useMemo(
    () => ({
      speed: createWave(0.5),
      throttle: createWave(1.2, 0.8),
      brake: createWave(2.1, 1.4),
    }),
    [],
  );

  const arcOffset = 1 - (rpm - 12000) / 4500;
  const gDot = createOrbitPath(gForcePhase);

  return (
    <section className="content-section section-shell telemetry-section">
      <motion.div
        className="section-heading-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">SECTOR 7</p>
        <h2 className="section-title">Live Telemetry</h2>
      </motion.div>

      <div className="telemetry-grid">
        <GlassCard className="telemetry-panel">
          <div className="telemetry-panel__legend">
            <span className="legend-pill legend-pill--cyan">Speed</span>
            <span className="legend-pill legend-pill--green">Throttle</span>
            <span className="legend-pill legend-pill--red">Brake</span>
          </div>
          <svg viewBox="0 0 100 100" className="trace-chart">
            <path d={lines.speed} />
            <path d={lines.throttle} />
            <path d={lines.brake} />
          </svg>
          <div className="trace-chart__axes">
            <span>LAPS 1–24</span>
            <span>0–100%</span>
          </div>
        </GlassCard>

        <GlassCard className="telemetry-panel telemetry-panel--center">
          <svg viewBox="0 0 240 240" className="rpm-gauge">
            <path d="M 50 180 A 70 70 0 0 1 190 180" className="rpm-gauge__track" />
            <path
              d="M 50 180 A 70 70 0 0 1 190 180"
              className="rpm-gauge__progress"
              pathLength="1"
              style={{ strokeDasharray: 1, strokeDashoffset: arcOffset }}
            />
          </svg>
          <div className="rpm-gauge__center">
            <span>RPM</span>
            <strong>{rpm}</strong>
            <div className="rpm-gauge__gear">{gear}</div>
            <p className={drsOpen ? 'drs-open' : 'drs-closed'}>
              {drsOpen ? 'DRS OPEN' : 'DRS CLOSED'}
            </p>
          </div>
        </GlassCard>

        <GlassCard className="telemetry-panel telemetry-panel--gforce">
          <div className="gforce-meter">
            <div className="gforce-meter__grid" />
            <div
              className="gforce-meter__dot"
              style={{
                left: `${gDot.x}%`,
                top: `${gDot.y}%`,
                background: `hsl(${gForcePhase * 360}, 90%, 60%)`,
              }}
            />
          </div>
          <div className="gforce-meter__readout">
            <span>Lateral ±4.5G</span>
            <span>Longitudinal ±5G</span>
          </div>
        </GlassCard>
      </div>

      <div className="telemetry-feed glass">
        LAP 23/24 · GAP TO LEADER: 0.347s · TYRE: SOFT LAP 12 · FUEL LOAD: 23.4kg · ERS
        DEPLOYED: 87% · SECTOR 1: 28.341 · SECTOR 2: 31.004 · SECTOR 3: 24.502
      </div>
    </section>
  );
}
