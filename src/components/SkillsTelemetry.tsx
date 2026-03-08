import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SectorHeader from "./SectorHeader";

const skills = [
  { name: "Programming", note: "Engine Power", value: 95, icon: "⚡" },
  { name: "Web Development", note: "Aerodynamics", value: 90, icon: "🌊" },
  { name: "Problem Solving", note: "Race Strategy", value: 92, icon: "🧠" },
  { name: "Leadership", note: "Team Coordination", value: 88, icon: "🏁" },
  { name: "Communication", note: "Radio Comms", value: 85, icon: "📡" },
];

const TelemetryGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>(Array(100).fill(30));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 120;

    const animate = () => {
      // Shift data and add new point
      dataRef.current.shift();
      dataRef.current.push(20 + Math.random() * 80);

      ctx.clearRect(0, 0, 600, 120);

      // Grid
      ctx.strokeStyle = "rgba(0, 200, 255, 0.05)";
      ctx.lineWidth = 0.5;
      for (let y = 0; y < 120; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(600, y);
        ctx.stroke();
      }

      // Throttle line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 200, 255, 0.6)";
      ctx.lineWidth = 1.5;
      dataRef.current.forEach((v, i) => {
        const x = (i / 100) * 600;
        const y = 120 - (v / 100) * 110;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Fill under
      ctx.lineTo(600, 120);
      ctx.lineTo(0, 120);
      ctx.closePath();
      ctx.fillStyle = "rgba(0, 200, 255, 0.05)";
      ctx.fill();

      // Brake line (inverse)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(225, 6, 0, 0.4)";
      ctx.lineWidth = 1;
      dataRef.current.forEach((v, i) => {
        const x = (i / 100) * 600;
        const y = (v / 100) * 110 + 5;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="border border-border/30 bg-background/30 overflow-hidden relative mt-10">
      <canvas ref={canvasRef} className="w-full h-28" style={{ imageRendering: "auto" }} />
      <div className="absolute top-2 left-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-f1-cyan/60" />
          <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">Throttle</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-primary/40" />
          <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">Brake</span>
        </div>
      </div>
      <span className="absolute bottom-1 right-2 font-display text-[7px] text-muted-foreground/15 tracking-wider">
        LIVE TRACE
      </span>
    </div>
  );
};

const CircularGauge = ({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) => {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(0 0% 12%)" strokeWidth="3" />
          <motion.circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-sm font-bold text-foreground tabular-nums">{value}</span>
        </div>
      </div>
      <span className="font-body text-[9px] text-muted-foreground/50 tracking-wider uppercase mt-2">{label}</span>
    </motion.div>
  );
};

const SkillsTelemetry = () => (
  <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
    <SectorHeader
      sector="Sector 2"
      title="Performance Data"
      subtitle="Skills mapped to car telemetry — because everything's better as a racing metaphor."
    />

    {/* Circular gauges */}
    <div className="flex flex-wrap justify-center gap-6 mb-12">
      {skills.map((skill, i) => (
        <CircularGauge
          key={skill.name}
          value={skill.value}
          label={skill.note}
          color={
            skill.value >= 92
              ? "hsl(145 100% 45%)"
              : skill.value >= 88
              ? "hsl(186 100% 50%)"
              : "hsl(1 97% 44%)"
          }
          delay={i * 0.1}
        />
      ))}
    </div>

    {/* Bar telemetry */}
    <div className="space-y-6">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{skill.icon}</span>
              <span className="font-body text-foreground text-sm">{skill.name}</span>
              <span className="font-body text-[10px] text-muted-foreground/30">{skill.note}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground/50 tabular-nums">{skill.value}%</span>
          </div>
          <div className="h-2 bg-muted/30 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.08 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full relative"
              style={{
                background: skill.value >= 92
                  ? "linear-gradient(90deg, hsl(145 100% 45% / 0.7), hsl(145 100% 45%))"
                  : skill.value >= 88
                  ? "linear-gradient(90deg, hsl(186 100% 50% / 0.7), hsl(186 100% 50%))"
                  : "linear-gradient(90deg, hsl(1 97% 44% / 0.7), hsl(1 97% 44%))",
              }}
            />
            {/* Segment marks */}
            {[25, 50, 75].map((p) => (
              <div key={p} className="absolute top-0 h-full w-px bg-background/30" style={{ left: `${p}%` }} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Live telemetry graph */}
    <TelemetryGraph />
  </section>
);

export default SkillsTelemetry;
