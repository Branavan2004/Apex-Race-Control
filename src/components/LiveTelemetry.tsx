import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";
import { useEffect, useState, useRef } from "react";

const LiveTelemetry = () => {
  const [rpm, setRpm] = useState(8400);
  const [speed, setSpeed] = useState(312);
  const [gear, setGear] = useState(7);
  const [throttle, setThrottle] = useState(85);
  const [brake, setBrake] = useState(0);
  const [ersDeployment, setErsDeployment] = useState(72);
  const [fuelRemaining, setFuelRemaining] = useState(68);
  const graphRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef({ throttle: Array(150).fill(50), brake: Array(150).fill(10), speed: Array(150).fill(200) });

  useEffect(() => {
    const interval = setInterval(() => {
      const newThrottle = 60 + Math.random() * 40;
      const newBrake = Math.random() > 0.7 ? Math.random() * 60 : 0;
      setRpm(8000 + Math.random() * 4000);
      setSpeed(Math.floor(280 + Math.random() * 50));
      setGear(Math.floor(5 + Math.random() * 4));
      setThrottle(Math.round(newThrottle));
      setBrake(Math.round(newBrake));
      setErsDeployment(Math.round(50 + Math.random() * 50));
      setFuelRemaining((prev) => Math.max(0, prev - 0.1));

      dataRef.current.throttle.shift();
      dataRef.current.throttle.push(newThrottle);
      dataRef.current.brake.shift();
      dataRef.current.brake.push(newBrake);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Live graph rendering
  useEffect(() => {
    const canvas = graphRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 700;
    canvas.height = 100;

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, 700, 100);

      // Grid
      ctx.strokeStyle = "rgba(0,200,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let y = 0; y < 100; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(700, y); ctx.stroke();
      }

      // Throttle
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 200, 255, 0.7)";
      ctx.lineWidth = 1.5;
      dataRef.current.throttle.forEach((v, i) => {
        const x = (i / 150) * 700;
        const y = 100 - (v / 100) * 95;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Brake
      ctx.beginPath();
      ctx.strokeStyle = "rgba(225, 6, 0, 0.6)";
      ctx.lineWidth = 1.5;
      dataRef.current.brake.forEach((v, i) => {
        const x = (i / 150) * 700;
        const y = 100 - (v / 100) * 95;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  const rpmPercent = ((rpm - 6000) / 6000) * 100;

  return (
    <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
      <SectorHeader
        sector="Sector 5"
        title="Telemetry"
        subtitle="A little live dashboard — because what's an F1 portfolio without one?"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border/50 bg-card/30 overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-border/30 bg-card/50">
          <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
          <span className="font-display text-[9px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            Live Session — BRA
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-[9px] text-f1-purple tabular-nums">Best: 1:18.432</span>
            <span className="font-mono text-[9px] text-f1-green tabular-nums">Last: 1:19.103</span>
          </div>
        </div>

        <div className="p-6">
          {/* Main readings */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
            {[
              { label: "RPM", value: Math.floor(rpm), color: "text-foreground" },
              { label: "KM/H", value: speed, color: "text-f1-cyan" },
              { label: "GEAR", value: gear, color: "text-foreground" },
              { label: "THROTTLE", value: `${throttle}%`, color: "text-f1-green" },
              { label: "BRAKE", value: `${brake}%`, color: brake > 0 ? "text-primary" : "text-muted-foreground/30" },
              { label: "ERS", value: `${ersDeployment}%`, color: "text-f1-cyan" },
            ].map((item) => (
              <div key={item.label}>
                <span className={`font-display text-2xl md:text-3xl font-bold tabular-nums ${item.color}`}>
                  {item.value}
                </span>
                <p className="font-body text-[9px] text-muted-foreground/30 tracking-widest uppercase mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* RPM bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">RPM Band</span>
              <span className="font-mono text-[9px] text-muted-foreground/40 tabular-nums">{Math.floor(rpm)} / 12000</span>
            </div>
            <div className="flex items-center gap-0.5 h-4">
              {Array.from({ length: 30 }).map((_, i) => {
                const filled = (i / 30) * 100 < rpmPercent;
                return (
                  <motion.div
                    key={i}
                    animate={{ scaleY: filled ? 1 : 0.3 }}
                    transition={{ duration: 0.1 }}
                    className={`flex-1 h-full rounded-[1px] ${
                      filled
                        ? i >= 26
                          ? "bg-primary"
                          : i >= 22
                          ? "bg-f1-yellow"
                          : i >= 16
                          ? "bg-f1-green/70"
                          : "bg-f1-green/50"
                        : "bg-muted/20"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Throttle & Brake bars */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">Throttle</span>
                <span className="font-mono text-[9px] text-f1-green tabular-nums">{throttle}%</span>
              </div>
              <div className="h-3 bg-muted/20 overflow-hidden">
                <motion.div
                  animate={{ width: `${throttle}%` }}
                  transition={{ duration: 0.15 }}
                  className="h-full bg-f1-green/70"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">Brake</span>
                <span className="font-mono text-[9px] text-primary tabular-nums">{brake}%</span>
              </div>
              <div className="h-3 bg-muted/20 overflow-hidden">
                <motion.div
                  animate={{ width: `${brake}%` }}
                  transition={{ duration: 0.15 }}
                  className="h-full bg-primary/70"
                />
              </div>
            </div>
          </div>

          {/* Live graph */}
          <div className="border border-border/20 bg-background/30 overflow-hidden relative">
            <canvas ref={graphRef} className="w-full h-24" style={{ imageRendering: "auto" }} />
            <div className="absolute top-1 left-2 flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-0.5 bg-f1-cyan/70" />
                <span className="font-body text-[7px] text-muted-foreground/30 uppercase">Throttle</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-0.5 bg-primary/60" />
                <span className="font-body text-[7px] text-muted-foreground/30 uppercase">Brake</span>
              </div>
            </div>
          </div>

          {/* Fuel & Tire info */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">Fuel Remaining</span>
                <span className="font-mono text-[9px] text-f1-yellow tabular-nums">{fuelRemaining.toFixed(1)} kg</span>
              </div>
              <div className="h-1.5 bg-muted/20 overflow-hidden">
                <div className="h-full bg-f1-yellow/60" style={{ width: `${fuelRemaining}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">Tire Life</span>
                <span className="font-mono text-[9px] text-f1-green tabular-nums">Lap 12/28</span>
              </div>
              <div className="h-1.5 bg-muted/20 overflow-hidden">
                <div className="h-full bg-f1-green/60" style={{ width: "57%" }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LiveTelemetry;
