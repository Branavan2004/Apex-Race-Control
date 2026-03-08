import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    name: "Enterprise Analytics Dashboard",
    tech: ["React", "TypeScript", "D3.js", "Node.js"],
    description: "Designed and developed a comprehensive real-time analytics platform capable of processing 10,000+ data points per second. Implemented server-sent events for live updates, custom D3 visualizations, and role-based access control. Reduced reporting latency by 60% compared to the previous solution.",
    position: "P1", points: 26, fastestLap: true, tire: "S", tireColor: "bg-primary",
    lapTime: "1:18.432", gap: "WINNER", status: "Production",
    metrics: "10K+ events/sec · 99.9% uptime · 60% faster reports",
  },
  {
    name: "ML-Powered Prediction Engine",
    tech: ["Python", "TensorFlow", "Flask", "PostgreSQL"],
    description: "Built an end-to-end machine learning pipeline for predictive analytics with automated model training, evaluation, and deployment. Integrated feature engineering, hyperparameter tuning, and A/B testing frameworks. Achieved 94% prediction accuracy on production data with sub-200ms inference time.",
    position: "P2", points: 18, fastestLap: false, tire: "M", tireColor: "bg-f1-yellow",
    lapTime: "1:19.001", gap: "+1.569", status: "Production",
    metrics: "94% accuracy · <200ms inference · 50K+ predictions/day",
  },
  {
    name: "Cross-Platform Mobile Application",
    tech: ["React Native", "Firebase", "Redux", "TypeScript"],
    description: "Developed a cross-platform mobile application with offline-first architecture, real-time data synchronization, push notifications, and biometric authentication. Implemented code-sharing between iOS and Android with 85% shared codebase. Published on both App Store and Google Play.",
    position: "P1", points: 26, fastestLap: true, tire: "S", tireColor: "bg-primary",
    lapTime: "1:17.998", gap: "WINNER", status: "Published",
    metrics: "85% code shared · 4.7★ rating · 5K+ downloads",
  },
  {
    name: "Microservices E-Commerce Platform",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kafka"],
    description: "Architected a scalable e-commerce backend using microservices patterns with event-driven communication via Apache Kafka. Implemented CQRS, saga patterns for distributed transactions, and comprehensive integration testing. Deployed on Kubernetes with auto-scaling and health monitoring.",
    position: "P3", points: 15, fastestLap: false, tire: "H", tireColor: "bg-foreground",
    lapTime: "1:20.115", gap: "+2.117", status: "Production",
    metrics: "12 microservices · 98% test coverage · Auto-scaling",
  },
  {
    name: "Open-Source CLI Tool",
    tech: ["Rust", "GitHub Actions"],
    description: "Created and maintain an open-source command-line tool for automating development workflows. Features include project scaffolding, configuration management, and CI/CD pipeline generation. Over 200 GitHub stars and active community contributions.",
    position: "P4", points: 12, fastestLap: false, tire: "M", tireColor: "bg-f1-yellow",
    lapTime: "1:20.887", gap: "+3.455", status: "Open Source",
    metrics: "200+ ★ GitHub · 50+ contributors · 10K+ installs",
  },
];

const RaceHistory = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
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
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">Project Portfolio</h2>
            <p className="font-body text-muted-foreground mt-3 max-w-lg">
              A selection of key projects demonstrating technical depth, architectural thinking, 
              and end-to-end delivery. Click any project to view detailed specifications.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="font-display text-5xl font-black text-primary tabular-nums">
              {projects.reduce((s, p) => s + p.points, 0)}
            </span>
            <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">Impact Score</p>
          </div>
        </div>
      </motion.div>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-[3rem,1fr,5rem,5rem,4rem,3.5rem] gap-4 px-6 py-2 mb-2">
        {["POS", "PROJECT", "TIME", "GAP", "TYPE", "PTS"].map((h) => (
          <span key={h} className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/30 uppercase">{h}</span>
        ))}
      </div>

      <div className="space-y-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative bg-card border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            {/* Position bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              project.position === "P1" ? "bg-f1-gold" : project.position === "P2" ? "bg-muted-foreground" : "bg-f1-yellow/40"
            }`} />

            <div className="grid grid-cols-[3rem,1fr,auto] md:grid-cols-[3rem,1fr,5rem,5rem,4rem,3.5rem] gap-4 items-center p-5 pl-6">
              <span className={`font-display text-2xl font-black ${
                project.position === "P1" ? "text-f1-gold" : project.position === "P2" ? "text-foreground/60" : "text-f1-yellow/50"
              }`}>{project.position}</span>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {project.name}
                  </h3>
                  {project.fastestLap && (
                    <span className="shrink-0 font-mono text-[8px] tracking-wider bg-f1-purple/15 text-f1-purple px-2 py-0.5 rounded">
                      FEATURED
                    </span>
                  )}
                  <span className="shrink-0 font-mono text-[8px] tracking-wider bg-f1-green/15 text-f1-green px-2 py-0.5 rounded hidden md:inline">
                    {project.status}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary/60 shrink-0 ml-auto hidden md:block" />
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[9px] text-muted-foreground/50 bg-muted/50 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </div>

              <span className="font-mono text-sm text-foreground/70 tabular-nums hidden md:block">{project.lapTime}</span>
              <span className={`font-mono text-sm tabular-nums hidden md:block ${
                project.gap === "WINNER" ? "text-f1-green font-bold" : "text-muted-foreground/50"
              }`}>{project.gap}</span>

              <div className="hidden md:flex justify-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${project.tireColor} border-2 border-background`}>
                  <span className="font-display text-[8px] font-bold text-background">{project.tire}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display text-lg font-black text-f1-cyan tabular-nums">{project.points}</span>
              </div>
            </div>

            {/* Expandable details */}
            <motion.div
              initial={false}
              animate={{ height: expandedIndex === i ? "auto" : 0, opacity: expandedIndex === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pl-[4.5rem]">
                <p className="font-body text-sm text-muted-foreground/70 leading-relaxed mb-4">{project.description}</p>
                
                {/* Key metrics */}
                <div className="bg-muted/20 border border-border/30 rounded p-3 mb-3">
                  <span className="font-mono text-[8px] text-muted-foreground/40 tracking-wider uppercase block mb-1.5">Key Metrics</span>
                  <span className="font-mono text-xs text-f1-cyan">{project.metrics}</span>
                </div>

                {/* Strategy bar */}
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[7px] text-muted-foreground/30 uppercase tracking-wider mr-2">Dev Phases</span>
                  <div className="flex-1 h-3 flex rounded overflow-hidden">
                    <div className="bg-f1-blue/70 flex-[2]" title="Research" />
                    <div className="bg-primary/70 flex-[3]" title="Development" />
                    <div className="bg-f1-yellow/70 flex-[2]" title="Testing" />
                    <div className="bg-f1-green/70 flex-[1]" title="Deployment" />
                  </div>
                  <span className="font-mono text-[7px] text-muted-foreground/30 ml-2">R→D→T→P</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RaceHistory;
