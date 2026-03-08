import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const skills = [
  { name: "Programming", note: "Engine Power", value: 95 },
  { name: "Web Development", note: "Aerodynamics", value: 90 },
  { name: "Problem Solving", note: "Race Strategy", value: 92 },
  { name: "Leadership", note: "Team Coordination", value: 88 },
  { name: "Communication", note: "Radio Comms", value: 85 },
];

const SkillsTelemetry = () => (
  <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
    <SectorHeader
      sector="Sector 2"
      title="Performance Data"
      subtitle="Skills mapped to car telemetry — because everything's better as a racing metaphor."
    />

    <div className="space-y-8">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-3">
              <span className="font-body text-foreground text-base">{skill.name}</span>
              <span className="font-body text-[11px] text-muted-foreground/40">{skill.note}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground/50 tabular-nums">{skill.value}</span>
          </div>
          <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full rounded-full"
              style={{
                background: skill.value >= 92
                  ? "hsl(var(--f1-green))"
                  : skill.value >= 88
                  ? "hsl(var(--f1-cyan))"
                  : "hsl(var(--primary))",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SkillsTelemetry;
