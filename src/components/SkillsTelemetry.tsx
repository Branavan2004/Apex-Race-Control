import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const skills = [
  { name: "Programming", metric: "Engine Power", value: 95, color: "from-primary to-f1-yellow" },
  { name: "Web Development", metric: "Aerodynamics", value: 90, color: "from-f1-cyan to-f1-blue" },
  { name: "Problem Solving", metric: "Race Strategy", value: 92, color: "from-f1-green to-f1-cyan" },
  { name: "Leadership", metric: "Team Coordination", value: 88, color: "from-f1-purple to-primary" },
  { name: "Public Speaking", metric: "Radio Communication", value: 85, color: "from-f1-yellow to-primary" },
];

const CircularGauge = ({ value, label, metric, color, delay }: {
  value: number; label: string; metric: string; color: string; delay: number;
}) => {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none"
            stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={`g-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--f1-cyan))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-bold text-foreground">{value}</span>
          <span className="font-body text-[10px] text-muted-foreground">RPM</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display text-xs text-foreground">{label}</p>
        <p className="font-body text-[11px] text-f1-cyan">{metric}</p>
      </div>
    </motion.div>
  );
};

const SkillsTelemetry = () => (
  <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
    <SectorHeader sector="Sector 2" title="CAR PERFORMANCE" subtitle="Real-time telemetry analysis" />

    <div className="border border-border bg-card/60 backdrop-blur-md p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse-glow" />
        <span className="font-display text-xs tracking-widest text-f1-green uppercase">Live Telemetry</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center">
        {skills.map((skill, i) => (
          <CircularGauge
            key={skill.name}
            value={skill.value}
            label={skill.name}
            metric={skill.metric}
            color={skill.color}
            delay={i * 0.1}
          />
        ))}
      </div>

      {/* Telemetry graph simulation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 h-24 border border-border bg-background/50 rounded-sm overflow-hidden relative"
      >
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
          />
        </svg>
        <div className="absolute bottom-2 right-3 font-display text-[10px] text-f1-cyan/60">THROTTLE TRACE</div>
      </motion.div>
    </div>
  </section>
);

export default SkillsTelemetry;
