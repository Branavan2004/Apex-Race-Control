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
  },
  {
    race: "Project Beta",
    circuit: "Python · TensorFlow · Flask",
    summary: "Machine learning pipeline for predictive analysis with automated reporting.",
    result: "P2 – High performance",
    tire: "Medium",
    fastestLap: false,
  },
  {
    race: "Project Gamma",
    circuit: "React Native · Firebase",
    summary: "Cross-platform mobile application with real-time notifications and user auth.",
    result: "P1 – Top rated",
    tire: "Hard",
    fastestLap: true,
  },
  {
    race: "Project Delta",
    circuit: "Java · Spring Boot · PostgreSQL",
    summary: "Enterprise-grade REST API with microservices architecture and CI/CD pipeline.",
    result: "P3 – Solid delivery",
    tire: "Medium",
    fastestLap: false,
  },
];

const tireColors: Record<string, string> = {
  Soft: "bg-primary",
  Medium: "bg-f1-yellow",
  Hard: "bg-foreground",
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
          className="border border-border bg-card/60 backdrop-blur-md p-6 relative overflow-hidden group hover:border-primary/40 transition-colors"
        >
          {/* Position stripe */}
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">{project.race}</h3>
              <p className="font-mono text-xs text-f1-cyan">{project.circuit}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Tire compound */}
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${tireColors[project.tire]} border border-foreground/20`} />
                <span className="font-body text-[10px] text-muted-foreground">{project.tire}</span>
              </div>
              {project.fastestLap && (
                <span className="font-display text-[10px] text-f1-purple bg-f1-purple/10 px-2 py-0.5 rounded-sm">
                  FASTEST LAP
                </span>
              )}
            </div>
          </div>

          <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">{project.summary}</p>

          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
            <span className="font-display text-xs text-f1-green">{project.result}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RaceHistory;
