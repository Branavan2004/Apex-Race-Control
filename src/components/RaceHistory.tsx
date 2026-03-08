import { motion } from "framer-motion";
import { ExternalLink, Clock, Fuel } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    name: "Distributed Event-Driven Analytics Platform",
    tech: ["React", "TypeScript", "Node.js", "Apache Kafka", "PostgreSQL", "D3.js"],
    description: "Final-year dissertation project: designed and implemented a scalable, event-driven analytics platform following CQRS and event-sourcing patterns. The system ingests telemetry data via Apache Kafka, processes it through a Node.js consumer pipeline, and persists aggregated metrics in PostgreSQL. The React frontend renders real-time visualizations using D3.js with server-sent events for live updates. Applied CAP theorem considerations, implemented idempotent consumers, and conducted load testing with k6 to validate throughput under concurrent load. Documented architecture using C4 model diagrams and evaluated against NFR benchmarks (latency <200ms p99, availability 99.9%).",
    position: "P1", points: 26, fastestLap: true, tire: "S", tireColor: "bg-primary",
    lapTime: "1:18.432", gap: "WINNER", status: "Dissertation",
    metrics: "10K events/sec · <200ms p99 latency · 99.9% availability target",
    pitstops: 3, laps: 58, gridPos: "P1", tyreStrategy: ["S", "M", "H"],
  },
  {
    name: "Neural Network-Based Predictive Model",
    tech: ["Python", "TensorFlow", "Scikit-learn", "Flask", "PostgreSQL", "Docker"],
    description: "Developed an end-to-end machine learning pipeline for time-series prediction as part of a Machine Learning module project. Implemented data preprocessing with Pandas, feature engineering using rolling-window statistics, and trained LSTM and GRU models using TensorFlow/Keras. Applied cross-validation, hyperparameter tuning (Bayesian optimization via Optuna), and model interpretability techniques (SHAP values). Deployed the trained model via a Flask REST API containerized with Docker. Achieved 94.2% accuracy (RMSE: 0.037) on the held-out test set. Project report followed IEEE conference paper format.",
    position: "P2", points: 18, fastestLap: false, tire: "M", tireColor: "bg-f1-yellow",
    lapTime: "1:19.001", gap: "+1.569", status: "Submitted",
    metrics: "94.2% accuracy · RMSE 0.037 · SHAP interpretability · Dockerized",
    pitstops: 2, laps: 52, gridPos: "P3", tyreStrategy: ["S", "S", "M"],
  },
  {
    name: "Cross-Platform Health & Wellness Application",
    tech: ["React Native", "TypeScript", "Firebase", "Redux Toolkit", "Expo"],
    description: "Built a cross-platform mobile application as part of a Mobile Computing coursework project. Implemented offline-first architecture using AsyncStorage with background sync to Firebase Firestore. Features include biometric authentication (FaceID/TouchID), push notifications via FCM, real-time data synchronization with conflict resolution, and accessibility compliance (WCAG 2.1 AA). Achieved 85% shared codebase between iOS and Android. Conducted usability testing with 20 participants using the System Usability Scale (SUS), scoring 82.5.",
    position: "P1", points: 26, fastestLap: true, tire: "S", tireColor: "bg-primary",
    lapTime: "1:17.998", gap: "WINNER", status: "Published",
    metrics: "85% code sharing · SUS score 82.5 · WCAG 2.1 AA · 5K+ downloads",
    pitstops: 2, laps: 55, gridPos: "P1", tyreStrategy: ["S", "M", "M"],
  },
  {
    name: "Microservices E-Commerce Backend",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kafka", "Kubernetes"],
    description: "Architected a cloud-native e-commerce backend using microservices decomposition (Domain-Driven Design) for a Distributed Systems module. Implemented service discovery (Consul), API gateway (Spring Cloud Gateway), inter-service communication via Apache Kafka, and distributed transactions using the Saga pattern. Each service follows hexagonal architecture with separate domain, application, and infrastructure layers. Deployed to Kubernetes with Helm charts, horizontal pod autoscaling, and Prometheus/Grafana monitoring. Achieved 98% integration test coverage using Testcontainers.",
    position: "P3", points: 15, fastestLap: false, tire: "H", tireColor: "bg-foreground",
    lapTime: "1:20.115", gap: "+2.117", status: "Completed",
    metrics: "12 microservices · DDD · Saga pattern · 98% test coverage · K8s",
    pitstops: 1, laps: 45, gridPos: "P5", tyreStrategy: ["M", "H"],
  },
  {
    name: "Open-Source Developer Workflow CLI",
    tech: ["Rust", "GitHub Actions", "Clap", "Serde"],
    description: "Created and actively maintain an open-source command-line tool written in Rust for automating common developer workflows — project scaffolding, configuration management, and CI/CD pipeline generation. Designed with a plugin architecture for extensibility. Uses Clap for argument parsing, Serde for configuration serialization, and includes comprehensive unit and integration tests. Published to crates.io with semantic versioning and automated releases via GitHub Actions. Currently has 200+ GitHub stars and contributions from 50+ community members.",
    position: "P4", points: 12, fastestLap: false, tire: "M", tireColor: "bg-f1-yellow",
    lapTime: "1:20.887", gap: "+3.455", status: "Open Source",
    metrics: "200+ ★ · 50+ contributors · crates.io published · Plugin architecture",
    pitstops: 2, laps: 40, gridPos: "P7", tyreStrategy: ["S", "M", "M"],
  },
];

const tireColorMap: Record<string, string> = {
  S: "bg-primary",
  M: "bg-f1-yellow",
  H: "bg-foreground",
  I: "bg-f1-green",
  W: "bg-f1-blue",
};

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
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 03 — Race Classification</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">Academic & Research Projects</h2>
            <p className="font-body text-muted-foreground mt-3 max-w-lg">
              A curated selection of coursework, dissertation, and independent projects — each a Grand Prix 
              in my development calendar. Click any project to view full race data, tyre strategy, and 
              technical specifications.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="font-display text-5xl font-black text-primary tabular-nums">
              {projects.reduce((s, p) => s + p.points, 0)}
            </span>
            <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">Championship Points</p>
          </div>
        </div>
      </motion.div>

      {/* Table header — F1 timing screen style */}
      <div className="hidden md:grid grid-cols-[3rem,1fr,5rem,5rem,4rem,3.5rem] gap-4 px-6 py-2 mb-2 bg-muted/10 border border-border/30">
        {["POS", "DRIVER / PROJECT", "TIME", "GAP", "TYRE", "PTS"].map((h) => (
          <span key={h} className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/40 uppercase">{h}</span>
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
              project.position === "P1" ? "bg-f1-gold" : project.position === "P2" ? "bg-muted-foreground" : project.position === "P3" ? "bg-f1-yellow/60" : "bg-border"
            }`} />

            <div className="grid grid-cols-[3rem,1fr,auto] md:grid-cols-[3rem,1fr,5rem,5rem,4rem,3.5rem] gap-4 items-center p-5 pl-6">
              <span className={`font-display text-2xl font-black ${
                project.position === "P1" ? "text-f1-gold" : project.position === "P2" ? "text-foreground/60" : project.position === "P3" ? "text-f1-yellow/60" : "text-muted-foreground/30"
              }`}>{project.position}</span>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {project.name}
                  </h3>
                  {project.fastestLap && (
                    <span className="shrink-0 font-mono text-[8px] tracking-wider bg-f1-purple/15 text-f1-purple px-2 py-0.5 rounded">
                      FASTEST LAP
                    </span>
                  )}
                  <span className="shrink-0 font-mono text-[8px] tracking-wider bg-f1-green/15 text-f1-green px-2 py-0.5 rounded hidden md:inline">
                    {project.status}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary/60 shrink-0 ml-auto hidden md:block" />
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
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

            {/* Expandable details — full race data */}
            <motion.div
              initial={false}
              animate={{ height: expandedIndex === i ? "auto" : 0, opacity: expandedIndex === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pl-[4.5rem]">
                <p className="font-body text-sm text-muted-foreground/70 leading-relaxed mb-4">{project.description}</p>
                
                {/* Race data grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-muted/15 border border-border/30 p-2.5">
                    <span className="font-display text-lg font-black text-foreground tabular-nums">{project.laps}</span>
                    <p className="font-mono text-[7px] text-muted-foreground/40 uppercase tracking-wider mt-0.5">Laps Completed</p>
                  </div>
                  <div className="bg-muted/15 border border-border/30 p-2.5">
                    <span className="font-display text-lg font-black text-foreground tabular-nums">{project.pitstops}</span>
                    <p className="font-mono text-[7px] text-muted-foreground/40 uppercase tracking-wider mt-0.5">Pit Stops</p>
                  </div>
                  <div className="bg-muted/15 border border-border/30 p-2.5 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground/30" />
                    <div>
                      <span className="font-mono text-sm text-foreground/70 tabular-nums">{project.lapTime}</span>
                      <p className="font-mono text-[7px] text-muted-foreground/40 uppercase tracking-wider">Best Lap</p>
                    </div>
                  </div>
                  <div className="bg-muted/15 border border-border/30 p-2.5 flex items-center gap-2">
                    <Fuel className="w-3 h-3 text-muted-foreground/30" />
                    <div>
                      <span className="font-mono text-sm text-foreground/70">{project.gridPos}</span>
                      <p className="font-mono text-[7px] text-muted-foreground/40 uppercase tracking-wider">Grid Start</p>
                    </div>
                  </div>
                </div>

                {/* Key metrics */}
                <div className="bg-muted/20 border border-border/30 rounded p-3 mb-4">
                  <span className="font-mono text-[8px] text-muted-foreground/40 tracking-wider uppercase block mb-1.5">Race Performance Metrics</span>
                  <span className="font-mono text-xs text-f1-cyan">{project.metrics}</span>
                </div>

                {/* Tyre strategy visualization */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[8px] text-muted-foreground/30 uppercase tracking-wider shrink-0">Tyre Strategy</span>
                  <div className="flex-1 h-5 flex rounded overflow-hidden gap-0.5">
                    {project.tyreStrategy.map((compound, ci) => (
                      <div
                        key={ci}
                        className={`flex-1 ${tireColorMap[compound]} flex items-center justify-center`}
                      >
                        <span className="font-display text-[8px] font-black text-background">{compound}</span>
                      </div>
                    ))}
                  </div>
                  <span className="font-mono text-[7px] text-muted-foreground/30 shrink-0">
                    {project.tyreStrategy.join(" → ")}
                  </span>
                </div>

                {/* Dev phases strategy bar */}
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

      {/* Constructor standings summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 bg-card/50 border border-border/50 p-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
          <div>
            <p className="font-display text-sm font-bold text-foreground">Constructor Championship Standing</p>
            <p className="font-mono text-[8px] text-muted-foreground/50">5 races completed · {projects.filter(p => p.gap === "WINNER").length} wins · {projects.filter(p => p.fastestLap).length} fastest laps</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-display text-2xl font-black text-f1-gold tabular-nums">{projects.reduce((s, p) => s + p.points, 0)}</span>
          <p className="font-mono text-[7px] text-muted-foreground/40 uppercase">Total Points</p>
        </div>
      </motion.div>
    </section>
  );
};

export default RaceHistory;
