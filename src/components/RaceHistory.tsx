import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const projects = [
  {
    name: "Real-Time Analytics Dashboard",
    tech: "React · TypeScript · Node.js",
    description:
      "Built a live data visualization platform that processes and displays metrics in real-time. Focused on performance optimization and clean component architecture.",
    result: "P1",
    tag: "Fastest Lap",
    tagColor: "text-f1-purple bg-f1-purple/10",
  },
  {
    name: "ML Prediction Pipeline",
    tech: "Python · TensorFlow · Flask",
    description:
      "Designed a machine learning pipeline for predictive analysis. Automated the reporting flow and improved prediction accuracy through iterative model tuning.",
    result: "P2",
    tag: null,
    tagColor: "",
  },
  {
    name: "Cross-Platform Mobile App",
    tech: "React Native · Firebase",
    description:
      "Developed a mobile app with real-time sync, push notifications, and seamless auth. Shipped to both iOS and Android from a single codebase.",
    result: "P1",
    tag: "Fastest Lap",
    tagColor: "text-f1-purple bg-f1-purple/10",
  },
  {
    name: "Microservices API",
    tech: "Java · Spring Boot · PostgreSQL",
    description:
      "Architected a scalable REST API using microservices patterns. Set up CI/CD pipelines and wrote comprehensive integration tests.",
    result: "P3",
    tag: null,
    tagColor: "",
  },
];

const RaceHistory = () => (
  <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
    <SectorHeader
      sector="Sector 3"
      title="Race Results"
      subtitle="Projects I've shipped. Each one taught me something the last one didn't."
    />

    <div className="space-y-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="group border-l-2 border-border hover:border-primary/60 pl-6 py-4 transition-colors duration-300"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-display text-base font-semibold text-foreground group-hover:text-f1-cyan transition-colors duration-300">
                {project.name}
              </h3>
              <p className="font-body text-xs text-muted-foreground/50 mt-0.5">{project.tech}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {project.tag && (
                <span className={`font-display text-[9px] tracking-wider px-2 py-0.5 ${project.tagColor}`}>
                  {project.tag}
                </span>
              )}
              <span className="font-display text-xs font-bold text-f1-green">{project.result}</span>
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground/70 leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RaceHistory;
