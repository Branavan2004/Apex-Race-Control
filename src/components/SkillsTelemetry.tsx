import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const skills = [
  { name: "Programming", metric: "Engine Power", value: 95 },
  { name: "Web Development", metric: "Aerodynamics", value: 90 },
  { name: "Problem Solving", metric: "Race Strategy", value: 92 },
  { name: "Leadership", metric: "Team Coordination", value: 88 },
  { name: "Public Speaking", metric: "Radio Comms", value: 85 },
];

const CircularGauge = ({ value, label, metric, delay }: {
  value: number; label: string; metric: string; delay: number;
}) => {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none"
            strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
            style={{
              stroke: value >= 90 ? "hsl(var(--f1-green))" : value >= 85 ? "hsl(var(--f1-cyan))" : "hsl(var(--f1-yellow))",
              filter: `drop-shadow(0 0 6px ${value >= 90 ? "hsl(145 100% 45% / 0.5)" : "hsl(186 100% 50% / 0.5)"})`,
            }}
          />
          {/* Tick marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + 36 * Math.cos(rad);
            const y1 = 50 + 36 * Math.sin(rad);
            const x2 = 50 + 38 * Math.cos(rad);
            const y2 = 50 + 38 * Math.sin(rad);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-bold text-foreground">{value}</span>
          <span className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">perf</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display text-xs text-foreground group-hover:text-f1-cyan transition-colors">{label}</p>
        <p className="font-body text-[10px] text-f1-cyan/60">{metric}</p>
      </div>
    </motion.div>
  );
};

const SkillsTelemetry = () => (
  <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
    <SectorHeader sector="Sector 2" title="CAR PERFORMANCE" subtitle="Real-time telemetry analysis" />

    <div className="border border-border bg-card/60 backdrop-blur-md p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-f1-green via-f1-cyan to-f1-green" />

      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse-glow" />
        <span className="font-display text-xs tracking-widest text-f1-green uppercase">Live Telemetry</span>
        <div className="ml-auto flex items-center gap-1">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-f1-cyan/40 rounded-full"
              animate={{ height: [2, 8 + Math.random() * 6, 2] }}
              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.08 }}
            />
          ))}
          <span className="font-display text-[9px] text-f1-cyan/40 ml-2">STREAMING</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center">
        {skills.map((skill, i) => (
          <CircularGauge
            key={skill.name}
            value={skill.value}
            label={skill.name}
            metric={skill.metric}
            delay={i * 0.1}
          />
        ))}
      </div>

      {/* Telemetry graph */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 h-28 border border-border bg-background/50 rounded-sm overflow-hidden relative"
      >
        {/* Grid lines */}
        {[25, 50, 75].map((y) => (
          <div key={y} className="absolute w-full h-px bg-border/20" style={{ top: `${y}%` }} />
        ))}

        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
          <motion.path
            d="M0,80 L20,75 L40,60 L60,65 L80,40 L100,45 L120,30 L140,35 L160,20 L180,25 L200,15 L220,30 L240,25 L260,35 L280,20 L300,30 L320,15 L340,25 L360,10 L380,20 L400,15"
            fill="none"
            stroke="hsl(var(--f1-cyan))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 4px hsl(186 100% 50% / 0.4))" }}
          />
          {/* Second trace */}
          <motion.path
            d="M0,70 L20,68 L40,55 L60,60 L80,45 L100,50 L120,38 L140,42 L160,30 L180,35 L200,25 L220,38 L240,32 L260,40 L280,28 L300,35 L320,22 L340,30 L360,18 L380,25 L400,20"
            fill="none"
            stroke="hsl(var(--f1-green))"
            strokeWidth="1"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
        <div className="absolute bottom-2 left-3 font-display text-[9px] text-f1-cyan/40">THROTTLE TRACE</div>
        <div className="absolute bottom-2 right-3 font-display text-[9px] text-f1-green/40">BRAKE TRACE</div>
      </motion.div>
    </div>
  </section>
);

export default SkillsTelemetry;
