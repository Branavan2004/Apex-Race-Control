import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const skills = [
  { name: "React / TypeScript", category: "Frontend", value: 95, color: "hsl(var(--f1-blue))" },
  { name: "Node.js / Express", category: "Backend", value: 90, color: "hsl(var(--f1-green))" },
  { name: "Python / ML", category: "Data", value: 85, color: "hsl(var(--f1-purple))" },
  { name: "System Design", category: "Architecture", value: 92, color: "hsl(var(--f1-gold))" },
  { name: "DevOps / CI/CD", category: "Ops", value: 80, color: "hsl(var(--f1-cyan))" },
  { name: "Problem Solving", category: "Core", value: 94, color: "hsl(var(--f1-red))" },
];

const WaveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 80;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, 800, 80);

      // Throttle wave
      ctx.beginPath();
      ctx.strokeStyle = "hsla(186, 100%, 50%, 0.4)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < 800; x++) {
        const y = 40 + Math.sin((x + frame) * 0.02) * 20 + Math.sin((x + frame * 1.5) * 0.05) * 10;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Brake wave
      ctx.beginPath();
      ctx.strokeStyle = "hsla(0, 85%, 52%, 0.3)";
      ctx.lineWidth = 1;
      for (let x = 0; x < 800; x++) {
        const y = 40 + Math.cos((x + frame * 0.8) * 0.03) * 15 + Math.sin((x - frame) * 0.04) * 8;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      frame++;
      requestAnimationFrame(draw);
    };
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-20 opacity-60" />;
};

const SkillsTelemetry = () => (
  <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-secondary" />
        <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 02</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">
        Performance Data
      </h2>
      <p className="font-body text-muted-foreground mt-3 max-w-xl">
        Skills mapped as car performance metrics. Higher values = more deployment time.
      </p>
    </motion.div>

    {/* Skills grid */}
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="group"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {skill.name}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground ml-3 tracking-wider uppercase">
                {skill.category}
              </span>
            </div>
            <span className="font-mono text-sm font-semibold tabular-nums" style={{ color: skill.color }}>
              {skill.value}
            </span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full relative"
              style={{ background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})` }}
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Live telemetry wave */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border p-4 rounded-lg overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">Live Telemetry Trace</span>
        <div className="ml-auto flex gap-4">
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-f1-cyan/60 rounded" />
            <span className="font-mono text-[8px] text-muted-foreground">Throttle</span>
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-primary/60 rounded" />
            <span className="font-mono text-[8px] text-muted-foreground">Brake</span>
          </span>
        </div>
      </div>
      <WaveCanvas />
    </motion.div>
  </section>
);

export default SkillsTelemetry;
