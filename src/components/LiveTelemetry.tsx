import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const lineData = Array.from({ length: 24 }, (_, index) => ({
  lap: index + 1,
  speed: 55 + Math.sin(index / 2.6) * 20 + Math.random() * 6,
  throttle: 78 + Math.sin(index / 2.1) * 12,
  brake: Math.max(0, 25 + Math.cos(index / 1.7) * 20),
}));

const TraceCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 640;
    canvas.height = 240;

    const drawLine = (values: number[], color: string) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      values.forEach((value, index) => {
        const x = (index / (values.length - 1)) * 640;
        const y = 210 - (value / 100) * 170;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, 640, 240);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= 640; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 24);
        ctx.lineTo(x, 220);
        ctx.stroke();
      }
      for (let y = 24; y <= 220; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(640, y);
        ctx.stroke();
      }

      drawLine(lineData.map((d) => d.speed), "rgba(0,210,255,0.9)");
      drawLine(lineData.map((d) => d.throttle), "rgba(57,255,20,0.85)");
      drawLine(lineData.map((d) => d.brake), "rgba(232,0,45,0.85)");
    };

    render();
  }, []);

  return <canvas ref={ref} role="img" aria-label="Telemetry trace showing speed, throttle, and brake trends across 24 laps" className="h-64 w-full" />;
};

const LiveTelemetry = () => {
  const [rpm, setRpm] = useState(13840);
  const [gear, setGear] = useState(6);
  const [drsOpen, setDrsOpen] = useState(true);
  const [gForceAngle, setGForceAngle] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRpm(12000 + Math.random() * 4500);
      setGear(1 + Math.floor(Math.random() * 8));
      setDrsOpen((current) => !current);
      setGForceAngle((current) => current + 0.24);
    }, 1700);

    return () => window.clearInterval(interval);
  }, []);

  const gForceDot = useMemo(() => ({
    x: 60 + Math.cos(gForceAngle) * 32,
    y: 60 + Math.sin(gForceAngle) * 22,
  }), [gForceAngle]);

  const rpmRotation = -120 + ((rpm - 12000) / 6000) * 240;

  return (
    <section id="live-telemetry" className="mx-auto max-w-7xl px-6 py-28 md:px-12">
      <div className="mb-12">
        <p className="font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">Sector 7</p>
        <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.03em] text-[var(--f1-white)] md:text-6xl">
          LIVE TELEMETRY
        </h2>
      </div>

      <div className="glass rounded-[32px] p-6">
        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.9fr,0.8fr]">
          <div className="rounded-[24px] border border-white/8 bg-black/15 p-4">
            <div className="mb-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-[var(--f1-cyan)]/12 px-3 py-1 font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-cyan)]">Speed</span>
              <span className="rounded-full bg-[var(--f1-green)]/12 px-3 py-1 font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-green)]">Throttle</span>
              <span className="rounded-full bg-[var(--f1-red)]/12 px-3 py-1 font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-red)]">Brake</span>
            </div>
            <TraceCanvas />
            <div className="mt-3 flex justify-between font-data text-[10px] uppercase tracking-[0.16em] text-[var(--f1-muted)]">
              <span>Lap 1</span>
              <span>Lap 24</span>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/8 bg-black/15 p-4">
            <p className="font-data text-[10px] uppercase tracking-[0.32em] text-[var(--f1-muted)]">RPM Gauge</p>
            <div className="mt-5 flex justify-center">
              <svg viewBox="0 0 240 220" className="h-64 w-full max-w-[320px]" role="img" aria-label={`RPM gauge showing ${Math.round(rpm)} RPM and gear ${gear}`}>
                <path d="M30 160 A90 90 0 0 1 210 160" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
                <path d="M30 160 A90 90 0 0 1 210 160" fill="none" stroke="var(--f1-red)" strokeWidth="14" strokeLinecap="round" />
                <g transform={`rotate(${rpmRotation} 120 160)`} style={{ transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                  <line x1="120" y1="160" x2="120" y2="70" stroke="var(--f1-white)" strokeWidth="4" strokeLinecap="round" />
                </g>
                <circle cx="120" cy="160" r="8" fill="var(--f1-red)" />
                <text x="120" y="118" textAnchor="middle" className="fill-[var(--f1-white)] font-display text-[34px] font-black">
                  {Math.round(rpm)}
                </text>
                <text x="120" y="138" textAnchor="middle" className="fill-[var(--f1-muted)] font-data text-[11px] uppercase tracking-[0.26em]">
                  RPM
                </text>
                <text x="120" y="176" textAnchor="middle" className="fill-[var(--f1-gold)] font-display text-[30px] font-black">
                  {gear}
                </text>
              </svg>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-full border border-white/8 bg-white/4 px-4 py-2">
              <span className="font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">DRS Status</span>
              <span className="font-data text-xs uppercase tracking-[0.18em]" style={{ color: drsOpen ? "var(--f1-green)" : "var(--f1-red)" }}>
                {drsOpen ? "DRS OPEN" : "DRS CLOSED"}
              </span>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/8 bg-black/15 p-4">
            <p className="font-data text-[10px] uppercase tracking-[0.32em] text-[var(--f1-muted)]">G-Force Meter</p>
            <div className="mt-8 flex justify-center">
              <svg viewBox="0 0 120 120" className="h-56 w-56" role="img" aria-label="G-force meter showing lateral and longitudinal force balance">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="8" y1="60" x2="112" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="60" y1="8" x2="60" y2="112" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <motion.circle
                  cx={gForceDot.x}
                  cy={gForceDot.y}
                  r="8"
                  fill="var(--f1-blue)"
                  animate={{ cx: gForceDot.x, cy: gForceDot.y }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 0 12px rgba(30,144,255,0.8))" }}
                />
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/4 p-3">
                <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">Lateral</p>
                <p className="mt-2 font-display text-2xl font-black text-[var(--f1-white)]">±4.5G</p>
              </div>
              <div className="rounded-2xl bg-white/4 p-3">
                <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">Longitudinal</p>
                <p className="mt-2 font-display text-2xl font-black text-[var(--f1-white)]">±5.0G</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-full border border-[var(--f1-red)]/18 bg-[var(--f1-red)]/8 px-5 py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            className="flex w-[200%] gap-6 whitespace-nowrap font-data text-[11px] uppercase tracking-[0.16em] text-white/85"
          >
            <span>LAP 23/24</span>
            <span>GAP TO LEADER: 0.347s</span>
            <span>TYRE: SOFT LAP 12</span>
            <span>FUEL LOAD: 23.4kg</span>
            <span>ERS DEPLOYED: 87%</span>
            <span>SECTOR 1: 28.341</span>
            <span>SECTOR 2: 31.004</span>
            <span>SECTOR 3: 24.502</span>
            <span>LAP 23/24</span>
            <span>GAP TO LEADER: 0.347s</span>
            <span>TYRE: SOFT LAP 12</span>
            <span>FUEL LOAD: 23.4kg</span>
            <span>ERS DEPLOYED: 87%</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveTelemetry;
