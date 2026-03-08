import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const projects = [
  {
    race: "Project Alpha",
    circuit: "React · TypeScript · Node.js",
    summary: "Full-stack web application for real-time data visualization and analytics dashboard.",
    result: "P1 – Delivered on schedule",
    tire: "Soft",
    fastestLap: true,
    laps: "56/56",
  },
  {
    race: "Project Beta",
    circuit: "Python · TensorFlow · Flask",
    summary: "Machine learning pipeline for predictive analysis with automated reporting.",
    result: "P2 – High performance",
    tire: "Medium",
    fastestLap: false,
    laps: "48/48",
  },
  {
    race: "Project Gamma",
    circuit: "React Native · Firebase",
    summary: "Cross-platform mobile application with real-time notifications and user auth.",
    result: "P1 – Top rated",
    tire: "Hard",
    fastestLap: true,
    laps: "62/62",
  },
  {
    race: "Project Delta",
    circuit: "Java · Spring Boot · PostgreSQL",
    summary: "Enterprise-grade REST API with microservices architecture and CI/CD pipeline.",
    result: "P3 – Solid delivery",
    tire: "Medium",
    fastestLap: false,
    laps: "44/44",
  },
];

const tireColors: Record<string, { bg: string; ring: string }> = {
  Soft: { bg: "bg-primary", ring: "ring-primary/30" },
  Medium: { bg: "bg-f1-yellow", ring: "ring-f1-yellow/30" },
  Hard: { bg: "bg-foreground", ring: "ring-foreground/30" },
};

const RaceHistory = () => (
  <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
    <SectorHeader sector="Sector 3" title="RACE HISTORY" subtitle="Championship results and podium finishes" />

    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.race}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="border border-border bg-card/60 backdrop-blur-md relative overflow-hidden group hover:border-primary/40 transition-all duration-300"
        >
          {/* Top accent bar */}
          <div className="h-0.5 bg-gradient-to-r from-primary via-f1-cyan to-transparent" />
          
          {/* Position stripe */}
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

          <div className="p-6 pl-5">
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-xl font-bold text-foreground group-hover:text-f1-cyan transition-colors">{project.race}</span>
                </div>
                <p className="font-mono text-xs text-f1-cyan/70">{project.circuit}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {/* Tire compound */}
                <div className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded-full ${tireColors[project.tire].bg} ring-2 ${tireColors[project.tire].ring}`} />
                  <span className="font-display text-[10px] text-muted-foreground">{project.tire}</span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">LAPS {project.laps}</span>
              </div>
            </div>

            <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">{project.summary}</p>

            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <span className="font-display text-xs text-f1-green">{project.result}</span>
              {project.fastestLap && (
                <div className="flex items-center gap-1.5 bg-f1-purple/10 border border-f1-purple/20 px-2 py-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-f1-purple" />
                  <span className="font-display text-[10px] text-f1-purple">FASTEST LAP</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RaceHistory;
