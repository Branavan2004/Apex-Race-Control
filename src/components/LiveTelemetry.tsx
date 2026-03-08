import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const LiveTelemetry = () => {
  const [rpm, setRpm] = useState(8400);
  const [speed, setSpeed] = useState(312);
  const [gear, setGear] = useState(7);
  const [throttle, setThrottle] = useState(85);
  const [brake, setBrake] = useState(0);
  const [ers, setErs] = useState(72);
  const graphRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef({ throttle: Array(200).fill(50), brake: Array(200).fill(10) });

  useEffect(() => {
    const interval = setInterval(() => {
      const t = 60 + Math.random() * 40;
      const b = Math.random() > 0.7 ? Math.random() * 60 : 0;
      setRpm(8000 + Math.random() * 4000);
      setSpeed(Math.floor(280 + Math.random() * 50));
      setGear(Math.floor(5 + Math.random() * 4));
      setThrottle(Math.round(t));
      setBrake(Math.round(b));
      setErs(Math.round(50 + Math.random() * 50));
      dataRef.current.throttle.shift();
      dataRef.current.throttle.push(t);
      dataRef.current.brake.shift();
      dataRef.current.brake.push(b);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = graphRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 100;

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, 800, 100);

      // Grid
      ctx.strokeStyle = "hsla(220, 12%, 20%, 0.5)";
      ctx.lineWidth = 0.5;
      for (let y = 0; y < 100; y += 25) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke();
      }

      // Throttle
      ctx.beginPath();
      ctx.strokeStyle = "hsla(155, 80%, 45%, 0.7)";
      ctx.lineWidth = 1.5;
      dataRef.current.throttle.forEach((v, i) => {
        const x = (i / 200) * 800;
        const y = 100 - (v / 100) * 95;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Brake
      ctx.beginPath();
      ctx.strokeStyle = "hsla(0, 85%, 52%, 0.6)";
      ctx.lineWidth = 1.5;
      dataRef.current.brake.forEach((v, i) => {
        const x = (i / 200) * 800;
        const y = 100 - (v / 100) * 95;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  const rpmPct = ((rpm - 6000) / 6000) * 100;

  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-secondary" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 05</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Live Telemetry
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card border border-border overflow-hidden rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-muted/20">
          <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">Live — BRA #01</span>
          <div className="ml-auto flex gap-4">
            <span className="font-mono text-[9px] text-f1-purple tabular-nums">Best: 1:18.432</span>
            <span className="font-mono text-[9px] text-f1-green tabular-nums">Last: 1:19.103</span>
          </div>
        </div>

        <div className="p-6">
          {/* Main readouts */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
            {[
              { label: "RPM", value: Math.floor(rpm), color: "text-foreground" },
              { label: "KM/H", value: speed, color: "text-f1-cyan" },
              { label: "GEAR", value: gear, color: "text-foreground" },
              { label: "THROTTLE", value: `${throttle}%`, color: "text-f1-green" },
              { label: "BRAKE", value: `${brake}%`, color: brake > 0 ? "text-primary" : "text-muted-foreground/30" },
              { label: "ERS", value: `${ers}%`, color: "text-f1-cyan" },
            ].map((item) => (
              <div key={item.label}>
                <span className={`font-display text-3xl md:text-4xl font-black tabular-nums ${item.color}`}>
                  {item.value}
                </span>
                <p className="font-mono text-[8px] text-muted-foreground/50 tracking-wider uppercase mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* RPM bar */}
          <div className="mb-6">
            <div className="flex items-center gap-0.5 h-5">
              {Array.from({ length: 40 }).map((_, i) => {
                const filled = (i / 40) * 100 < rpmPct;
                return (
                  <div
                    key={i}
                    className={`flex-1 h-full rounded-sm transition-all duration-75 ${
                      filled
                        ? i >= 34 ? "bg-primary" : i >= 28 ? "bg-f1-yellow" : i >= 20 ? "bg-f1-green/80" : "bg-f1-green/50"
                        : "bg-muted/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Bars */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">Throttle</span>
                <span className="font-mono text-xs text-f1-green tabular-nums">{throttle}%</span>
              </div>
              <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${throttle}%` }} transition={{ duration: 0.15 }} className="h-full bg-f1-green/70 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">Brake</span>
                <span className="font-mono text-xs text-primary tabular-nums">{brake}%</span>
              </div>
              <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${brake}%` }} transition={{ duration: 0.15 }} className="h-full bg-primary/70 rounded-full" />
              </div>
            </div>
          </div>

          {/* Graph */}
          <div className="bg-background/50 border border-border/50 rounded overflow-hidden relative">
            <canvas ref={graphRef} className="w-full h-24" />
            <div className="absolute top-2 left-3 flex gap-3">
              <span className="flex items-center gap-1"><div className="w-2.5 h-0.5 bg-f1-green/70 rounded" /><span className="font-mono text-[7px] text-muted-foreground/50">THR</span></span>
              <span className="flex items-center gap-1"><div className="w-2.5 h-0.5 bg-primary/60 rounded" /><span className="font-mono text-[7px] text-muted-foreground/50">BRK</span></span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LiveTelemetry;
