import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const LiveTelemetry = () => {
  const [rpm, setRpm] = useState(8400);
  const [speed, setSpeed] = useState(312);
  const [gear, setGear] = useState(7);
  const [throttle, setThrottle] = useState(85);
  const [brake, setBrake] = useState(0);
  const [ers, setErs] = useState(72);
  const [drs, setDrs] = useState(false);
  const [fuelLaps, setFuelLaps] = useState(24);
  const graphRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef({ throttle: Array(200).fill(50), brake: Array(200).fill(10), speed: Array(200).fill(280) });

  useEffect(() => {
    const interval = setInterval(() => {
      const t = 60 + Math.random() * 40;
      const b = Math.random() > 0.7 ? Math.random() * 60 : 0;
      const s = Math.floor(280 + Math.random() * 50);
      setRpm(8000 + Math.random() * 4000);
      setSpeed(s);
      setGear(Math.floor(5 + Math.random() * 4));
      setThrottle(Math.round(t));
      setBrake(Math.round(b));
      setErs(Math.round(50 + Math.random() * 50));
      setDrs(Math.random() > 0.6);
      setFuelLaps((f) => Math.max(0, f - 0.05));
      dataRef.current.throttle.shift(); dataRef.current.throttle.push(t);
      dataRef.current.brake.shift(); dataRef.current.brake.push(b);
      dataRef.current.speed.shift(); dataRef.current.speed.push(s);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = graphRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 800; canvas.height = 120;

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, 800, 120);
      ctx.strokeStyle = "hsla(220, 12%, 20%, 0.3)"; ctx.lineWidth = 0.3;
      for (let y = 0; y < 120; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke(); }
      for (let x = 0; x < 800; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 120); ctx.stroke(); }

      // Speed trace
      ctx.beginPath(); ctx.strokeStyle = "hsla(186, 100%, 50%, 0.3)"; ctx.lineWidth = 1;
      dataRef.current.speed.forEach((v, i) => { const x = (i/200)*800; const y = 120 - ((v-200)/200)*115; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();

      // Throttle
      ctx.beginPath(); ctx.strokeStyle = "hsla(155, 80%, 45%, 0.7)"; ctx.lineWidth = 1.5;
      dataRef.current.throttle.forEach((v, i) => { const x=(i/200)*800; const y=120-(v/100)*115; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();

      // Brake
      ctx.beginPath(); ctx.strokeStyle = "hsla(0, 85%, 52%, 0.6)"; ctx.lineWidth = 1.5;
      dataRef.current.brake.forEach((v, i) => { const x=(i/200)*800; const y=120-(v/100)*115; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();

      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  const rpmPct = ((rpm - 6000) / 6000) * 100;

  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-secondary" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 05</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">Live Telemetry</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="bg-card border border-border overflow-hidden rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-muted/20">
          <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">Live — BRA #01</span>
          <div className="ml-auto flex gap-4">
            {drs && <span className="font-mono text-[9px] bg-f1-green/20 text-f1-green px-2 py-0.5 rounded tracking-wider">DRS OPEN</span>}
            <span className="font-mono text-[9px] text-f1-purple tabular-nums">Best: 1:18.432</span>
            <span className="font-mono text-[9px] text-f1-green tabular-nums">Last: 1:19.103</span>
          </div>
        </div>

        <div className="p-6">
          {/* Main readouts */}
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mb-8">
            {[
              { label: "RPM", value: Math.floor(rpm), color: "text-foreground" },
              { label: "KM/H", value: speed, color: "text-f1-cyan" },
              { label: "GEAR", value: gear, color: "text-foreground" },
              { label: "THROTTLE", value: `${throttle}%`, color: "text-f1-green" },
              { label: "BRAKE", value: `${brake}%`, color: brake > 0 ? "text-primary" : "text-muted-foreground/30" },
              { label: "ERS", value: `${ers}%`, color: "text-f1-cyan" },
              { label: "FUEL", value: `${fuelLaps.toFixed(1)}L`, color: fuelLaps < 5 ? "text-primary" : "text-f1-yellow" },
            ].map((item) => (
              <div key={item.label}>
                <span className={`font-display text-2xl md:text-3xl font-black tabular-nums ${item.color}`}>{item.value}</span>
                <p className="font-mono text-[8px] text-muted-foreground/50 tracking-wider uppercase mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* RPM bar with shift light */}
          <div className="mb-6">
            <div className="flex items-center gap-0.5 h-4">
              {Array.from({ length: 40 }).map((_, i) => {
                const filled = (i / 40) * 100 < rpmPct;
                return (
                  <div key={i} className={`flex-1 h-full rounded-sm transition-all duration-75 ${
                    filled ? i >= 34 ? "bg-primary animate-pulse" : i >= 28 ? "bg-f1-yellow" : i >= 20 ? "bg-f1-green/80" : "bg-f1-green/50" : "bg-muted/20"
                  }`} />
                );
              })}
            </div>
            {rpmPct > 90 && (
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 0.2 }}
                className="text-center mt-1">
                <span className="font-mono text-[8px] text-primary tracking-[0.3em] uppercase">↑ SHIFT ↑</span>
              </motion.div>
            )}
          </div>

          {/* Throttle/Brake bars */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">Throttle</span>
                <span className="font-mono text-xs text-f1-green tabular-nums">{throttle}%</span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${throttle}%` }} transition={{ duration: 0.15 }}
                  className="h-full bg-gradient-to-r from-f1-green/50 to-f1-green rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">Brake</span>
                <span className="font-mono text-xs text-primary tabular-nums">{brake}%</span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${brake}%` }} transition={{ duration: 0.15 }}
                  className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full" />
              </div>
            </div>
          </div>

          {/* Graph */}
          <div className="bg-background/50 border border-border/50 rounded overflow-hidden relative">
            <canvas ref={graphRef} className="w-full h-28" />
            <div className="absolute top-2 left-3 flex gap-3">
              <span className="flex items-center gap-1"><div className="w-2.5 h-0.5 bg-f1-green/70 rounded" /><span className="font-mono text-[7px] text-muted-foreground/50">THR</span></span>
              <span className="flex items-center gap-1"><div className="w-2.5 h-0.5 bg-primary/60 rounded" /><span className="font-mono text-[7px] text-muted-foreground/50">BRK</span></span>
              <span className="flex items-center gap-1"><div className="w-2.5 h-0.5 bg-f1-cyan/40 rounded" /><span className="font-mono text-[7px] text-muted-foreground/50">SPD</span></span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LiveTelemetry;
