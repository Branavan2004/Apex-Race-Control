import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Real-Time Analytics Dashboard",
    tech: ["React", "TypeScript", "Node.js"],
    description: "Live data visualization platform with real-time metrics processing. Built for performance and clean architecture.",
    position: "P1",
    points: 26,
    fastestLap: true,
    tire: "S",
    tireColor: "bg-primary",
  },
  {
    name: "ML Prediction Pipeline",
    tech: ["Python", "TensorFlow", "Flask"],
    description: "Predictive analysis pipeline with automated reporting. Improved accuracy through iterative model tuning.",
    position: "P2",
    points: 18,
    fastestLap: false,
    tire: "M",
    tireColor: "bg-f1-yellow",
  },
  {
    name: "Cross-Platform Mobile App",
    tech: ["React Native", "Firebase"],
    description: "Mobile app with real-time sync, push notifications, and seamless authentication. One codebase, both platforms.",
    position: "P1",
    points: 26,
    fastestLap: true,
    tire: "S",
    tireColor: "bg-primary",
  },
  {
    name: "Microservices Architecture",
    tech: ["Java", "Spring Boot", "PostgreSQL"],
    description: "Scalable REST API with microservices patterns. CI/CD pipelines and comprehensive integration testing.",
    position: "P3",
    points: 15,
    fastestLap: false,
    tire: "H",
    tireColor: "bg-foreground",
  },
];

const RaceHistory = () => (
  <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-secondary" />
        <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 03</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Race Results
          </h2>
          <p className="font-body text-muted-foreground mt-3">
            Projects I've shipped. Each lap faster than the last.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <span className="font-display text-5xl font-black text-primary tabular-nums">
            {projects.reduce((s, p) => s + p.points, 0)}
          </span>
          <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">Total Points</p>
        </div>
      </div>
    </motion.div>

    <div className="space-y-4">
      {projects.map((project, i) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="group relative bg-card border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden"
        >
          {/* Position color bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${
            project.position === "P1" ? "bg-f1-gold" : project.position === "P2" ? "bg-muted-foreground" : "bg-f1-yellow/40"
          }`} />

          <div className="flex items-center gap-6 p-5 pl-6">
            {/* Position */}
            <div className="shrink-0 w-16 text-center">
              <span className={`font-display text-3xl font-black ${
                project.position === "P1" ? "text-f1-gold" : project.position === "P2" ? "text-foreground/60" : "text-f1-yellow/50"
              }`}>
                {project.position}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {project.name}
                </h3>
                {project.fastestLap && (
                  <span className="shrink-0 font-mono text-[8px] tracking-wider bg-f1-purple/15 text-f1-purple px-2 py-0.5 rounded">
                    FASTEST LAP
                  </span>
                )}
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary/60 transition-colors shrink-0 ml-auto" />
              </div>
              <p className="font-body text-sm text-muted-foreground/60 mt-1 hidden md:block">{project.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-[9px] text-muted-foreground/50 bg-muted/50 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Tire */}
            <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${project.tireColor} border-2 border-background`}>
              <span className="font-display text-[8px] font-bold text-background">{project.tire}</span>
            </div>

            {/* Points */}
            <div className="shrink-0 w-12 text-right">
              <span className="font-display text-lg font-black text-f1-cyan tabular-nums">{project.points}</span>
              <p className="font-mono text-[7px] text-muted-foreground/40 tracking-wider uppercase">PTS</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RaceHistory;
