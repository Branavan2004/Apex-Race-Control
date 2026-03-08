import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const tireIcons: Record<string, { color: string; label: string }> = {
  soft: { color: "bg-primary", label: "S" },
  medium: { color: "bg-f1-yellow", label: "M" },
  hard: { color: "bg-foreground", label: "H" },
};

const projects = [
  {
    name: "Real-Time Analytics Dashboard",
    tech: "React · TypeScript · Node.js",
    description:
      "Built a live data visualization platform that processes and displays metrics in real-time. Focused on performance optimization and clean component architecture.",
    result: "P1",
    tag: "Fastest Lap",
    tagColor: "text-f1-purple bg-f1-purple/10",
    tire: "soft",
    gap: "+0.000",
    laps: 58,
    points: 26,
  },
  {
    name: "ML Prediction Pipeline",
    tech: "Python · TensorFlow · Flask",
    description:
      "Designed a machine learning pipeline for predictive analysis. Automated the reporting flow and improved prediction accuracy through iterative model tuning.",
    result: "P2",
    tag: null,
    tagColor: "",
    tire: "medium",
    gap: "+3.204",
    laps: 58,
    points: 18,
  },
  {
    name: "Cross-Platform Mobile App",
    tech: "React Native · Firebase",
    description:
      "Developed a mobile app with real-time sync, push notifications, and seamless auth. Shipped to both iOS and Android from a single codebase.",
    result: "P1",
    tag: "Fastest Lap",
    tagColor: "text-f1-purple bg-f1-purple/10",
    tire: "soft",
    gap: "+0.000",
    laps: 52,
    points: 26,
  },
  {
    name: "Microservices API",
    tech: "Java · Spring Boot · PostgreSQL",
    description:
      "Architected a scalable REST API using microservices patterns. Set up CI/CD pipelines and wrote comprehensive integration tests.",
    result: "P3",
    tag: null,
    tagColor: "",
    tire: "hard",
    gap: "+8.891",
    laps: 58,
    points: 15,
  },
];

const RaceHistory = () => (
  <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
    <SectorHeader
      sector="Sector 3"
      title="Race Results"
      subtitle="Projects I've shipped. Each one taught me something the last one didn't."
    />

    {/* Championship standing header */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-8 pb-3 border-b border-border/30"
    >
      <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground/30 uppercase w-8">Pos</span>
      <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground/30 uppercase flex-1">Race</span>
      <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground/30 uppercase w-10 text-center">Tire</span>
      <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground/30 uppercase w-16 text-right">Gap</span>
      <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground/30 uppercase w-10 text-right">Pts</span>
    </motion.div>

    <div className="space-y-1">
      {projects.map((project, i) => {
        const tire = tireIcons[project.tire];
        return (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group"
          >
            {/* Race result row */}
            <div className="flex items-center gap-4 py-3 px-2 hover:bg-muted/20 transition-colors cursor-pointer border-l-2 border-transparent hover:border-primary/60">
              {/* Position */}
              <span className={`font-display text-lg font-black w-8 tabular-nums ${
                project.result === "P1" ? "text-f1-yellow" : project.result === "P2" ? "text-foreground/70" : "text-f1-yellow/40"
              }`}>
                {project.result}
              </span>

              {/* Race info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-f1-cyan transition-colors truncate">
                    {project.name}
                  </h3>
                  {project.tag && (
                    <span className={`font-display text-[8px] tracking-wider px-1.5 py-0.5 shrink-0 ${project.tagColor}`}>
                      {project.tag}
                    </span>
                  )}
                </div>
                <p className="font-body text-[11px] text-muted-foreground/40 mt-0.5">{project.tech}</p>
              </div>

              {/* Tire */}
              <div className="w-10 flex justify-center">
                <div className={`w-5 h-5 rounded-full border-2 border-border/50 flex items-center justify-center ${tire.color}`}>
                  <span className="font-display text-[7px] font-bold text-background">{tire.label}</span>
                </div>
              </div>

              {/* Gap */}
              <span className={`font-mono text-[11px] w-16 text-right tabular-nums ${
                project.gap === "+0.000" ? "text-f1-green" : "text-muted-foreground/50"
              }`}>
                {project.gap}
              </span>

              {/* Points */}
              <span className="font-display text-xs font-bold text-f1-cyan w-10 text-right tabular-nums">
                {project.points}
              </span>
            </div>

            {/* Expandable description */}
            <div className="pl-14 pr-4 pb-3 hidden group-hover:block">
              <p className="font-body text-sm text-muted-foreground/60 leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="font-body text-[10px] text-muted-foreground/30">{project.laps} laps completed</span>
                <span className="font-body text-[10px] text-muted-foreground/30">Reliability: 100%</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Championship points total */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center justify-between mt-6 pt-4 border-t border-border/30"
    >
      <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">
        Championship Points
      </span>
      <span className="font-display text-xl font-black text-f1-cyan tabular-nums">
        {projects.reduce((sum, p) => sum + p.points, 0)}
      </span>
    </motion.div>
  </section>
);

export default RaceHistory;
