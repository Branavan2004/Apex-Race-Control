import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    category: "Programming Languages & Paradigms",
    skills: [
      { name: "Java (OOP, Concurrency)", value: 94, color: "hsl(var(--f1-blue))", detail: "Advanced OOP, multithreading, JVM internals, design patterns (GoF)" },
      { name: "Python (ML, Scripting)", value: 92, color: "hsl(var(--f1-blue))", detail: "NumPy, Pandas, Scikit-learn, TensorFlow, Flask, data pipelines" },
      { name: "TypeScript / JavaScript", value: 93, color: "hsl(var(--f1-cyan))", detail: "Strict typing, generics, async/await, V8 event loop, React ecosystem" },
      { name: "C++ / C (Systems)", value: 80, color: "hsl(var(--f1-cyan))", detail: "Memory management, pointers, STL, OS-level programming" },
      { name: "SQL & Database Query", value: 90, color: "hsl(var(--f1-blue))", detail: "Complex joins, indexing, query optimization, normalization (3NF/BCNF)" },
    ],
  },
  {
    category: "Frameworks, Libraries & Web Technologies",
    skills: [
      { name: "React / Next.js", value: 95, color: "hsl(var(--f1-green))", detail: "SSR, ISR, state management (Redux, Zustand), React Query, hooks" },
      { name: "Node.js / Express.js", value: 90, color: "hsl(var(--f1-green))", detail: "REST & GraphQL APIs, middleware, JWT auth, WebSocket, rate limiting" },
      { name: "Spring Boot (Java)", value: 85, color: "hsl(var(--f1-gold))", detail: "Dependency injection, JPA/Hibernate, Spring Security, microservices" },
      { name: "Django / Flask (Python)", value: 85, color: "hsl(var(--f1-gold))", detail: "ORM, REST framework, template engine, admin interface, migrations" },
      { name: "Tailwind CSS / SCSS", value: 90, color: "hsl(var(--f1-green))", detail: "Responsive design systems, utility-first CSS, theming, accessibility" },
    ],
  },
  {
    category: "Computer Science Fundamentals",
    skills: [
      { name: "Data Structures & Algorithms", value: 93, color: "hsl(var(--f1-purple))", detail: "Trees, graphs, DP, greedy, divide-and-conquer, time/space complexity" },
      { name: "System Design & Architecture", value: 88, color: "hsl(var(--f1-purple))", detail: "Microservices, CQRS, event sourcing, CAP theorem, load balancing" },
      { name: "Database Systems (RDBMS/NoSQL)", value: 90, color: "hsl(var(--f1-red))", detail: "PostgreSQL, MongoDB, Redis, ACID, transactions, sharding, replication" },
      { name: "Operating Systems & Networks", value: 82, color: "hsl(var(--f1-red))", detail: "Process scheduling, TCP/IP, HTTP/2, DNS, concurrency, deadlock handling" },
      { name: "Software Engineering Principles", value: 90, color: "hsl(var(--f1-purple))", detail: "SOLID, DRY, TDD, CI/CD, Agile/Scrum, UML, requirement engineering" },
    ],
  },
  {
    category: "DevOps, Cloud & Tooling",
    skills: [
      { name: "Docker & Kubernetes", value: 82, color: "hsl(var(--f1-gold))", detail: "Containerization, orchestration, Helm, service mesh, health probes" },
      { name: "AWS / GCP Cloud Services", value: 80, color: "hsl(var(--f1-gold))", detail: "EC2, S3, Lambda, RDS, CloudFront, IAM, GCP Cloud Functions" },
      { name: "Git & CI/CD Pipelines", value: 92, color: "hsl(var(--f1-green))", detail: "GitHub Actions, GitLab CI, branching strategies, code review workflows" },
      { name: "Testing (Unit/Integration/E2E)", value: 87, color: "hsl(var(--f1-green))", detail: "Jest, JUnit, Cypress, Pytest, coverage analysis, mutation testing" },
    ],
  },
];

const WaveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 80;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, 800, 80);
      ctx.strokeStyle = "hsla(220, 12%, 20%, 0.3)";
      ctx.lineWidth = 0.3;
      for (let y = 0; y < 80; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke(); }

      ctx.beginPath();
      ctx.strokeStyle = "hsla(186, 100%, 50%, 0.5)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < 800; x++) {
        const y = 40 + Math.sin((x + frame) * 0.02) * 20 + Math.sin((x + frame * 1.5) * 0.05) * 10;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "hsla(0, 85%, 52%, 0.3)";
      ctx.lineWidth = 1;
      for (let x = 0; x < 800; x++) {
        const y = 40 + Math.cos((x + frame * 0.8) * 0.03) * 15 + Math.sin((x - frame) * 0.04) * 8;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      frame++;
      requestAnimationFrame(draw);
    };
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-20 opacity-60" />;
};

const SkillsTelemetry = () => (
  <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-secondary" />
        <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 02</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">
        Technical Proficiency
      </h2>
      <p className="font-body text-muted-foreground mt-3 max-w-2xl">
        A comprehensive overview of my technical skill set, categorized by domain. 
        Proficiency levels are based on project experience, depth of knowledge, and production usage.
      </p>
    </motion.div>

    {/* Skill categories */}
    <div className="space-y-12 mb-16">
      {skillCategories.map((cat, ci) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: ci * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.skills[0].color }} />
            <h3 className="font-display text-lg font-bold text-foreground">{cat.category}</h3>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
            {cat.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 + i * 0.06 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <p className="font-mono text-[8px] text-muted-foreground/40 mt-0.5">{skill.detail}</p>
                  </div>
                  <span className="font-mono text-sm font-semibold tabular-nums" style={{ color: skill.color }}>
                    {skill.value}%
                  </span>
                </div>
                <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: ci * 0.1 + i * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${skill.color}44, ${skill.color})` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Live trace */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border p-4 rounded-lg overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">Live Performance Trace</span>
        <div className="ml-auto flex gap-4">
          <span className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-f1-cyan/60 rounded" /><span className="font-mono text-[8px] text-muted-foreground">Throughput</span></span>
          <span className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-primary/60 rounded" /><span className="font-mono text-[8px] text-muted-foreground">Latency</span></span>
        </div>
      </div>
      <WaveCanvas />
    </motion.div>
  </section>
);

export default SkillsTelemetry;
