import { motion } from "framer-motion";
import { Users, Code, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";

const experiences = [
  {
    role: "Industry Outreach Volunteer",
    org: "IEEE Robotics & Automation Society",
    description: "Connected students with industry professionals. Organized workshops bridging academic theory with real-world engineering.",
    icon: Users,
    year: "2024",
    status: "COMPLETED",
  },
  {
    role: "Event Organizer",
    org: "University Tech Events",
    description: "Planned and executed tech conferences and hackathons for 200+ attendees. Logistics is its own kind of engineering.",
    icon: Code,
    year: "2025",
    status: "COMPLETED",
  },
  {
    role: "Student Leadership",
    org: "Campus Activities",
    description: "Led cross-functional teams, mentored juniors, and drove initiatives that shipped — not just slide decks.",
    icon: Lightbulb,
    year: "2026",
    status: "ACTIVE",
  },
];

const PitWall = () => {
  const [pitTime, setPitTime] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById("pit-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setPitTime((t) => { if (t >= 2.4) return 2.4; return +(t + 0.1).toFixed(1); });
    }, 100);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <section id="pit-section" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-secondary" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 04</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Pit Wall
        </h2>
        <p className="font-body text-muted-foreground mt-3">Experience beyond code. The strategy side.</p>
      </motion.div>

      {/* Pit stop timer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-card border border-border p-6 mb-10 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="flex-1">
          <span className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/60 uppercase block mb-2">Pit Stop</span>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl font-black text-f1-cyan tabular-nums">{pitTime.toFixed(1)}</span>
            <span className="font-mono text-sm text-muted-foreground">seconds</span>
          </div>
        </div>
        <div className="flex gap-3">
          {["FL", "FR", "RL", "RR"].map((tire, i) => (
            <motion.div
              key={tire}
              animate={{
                borderColor: pitTime > (i + 1) * 0.5 ? "hsl(155 80% 45%)" : "hsl(220 12% 16%)",
                backgroundColor: pitTime > (i + 1) * 0.5 ? "hsl(155 80% 45% / 0.15)" : "transparent",
              }}
              className="w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center transition-all"
            >
              <span className="font-mono text-[8px] text-muted-foreground">{tire}</span>
              <span className={`font-mono text-[10px] font-bold ${pitTime > (i + 1) * 0.5 ? "text-f1-green" : "text-muted-foreground/30"}`}>
                {pitTime > (i + 1) * 0.5 ? "✓" : "—"}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience timeline */}
      <div className="relative pl-8 border-l-2 border-border space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            {/* Timeline dot */}
            <div className={`absolute -left-[calc(2rem+5px)] w-2.5 h-2.5 rounded-full border-2 ${
              exp.status === "ACTIVE" ? "bg-f1-green border-f1-green" : "bg-card border-border group-hover:border-primary"
            } transition-colors`} />

            <div className="bg-card/50 border border-border/50 hover:border-primary/30 p-5 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <exp.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-body text-sm text-primary/70 mt-0.5">{exp.org}</p>
                    <p className="font-body text-sm text-muted-foreground/60 leading-relaxed mt-2">{exp.description}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-mono text-xs text-muted-foreground/50">{exp.year}</span>
                  <div className={`font-mono text-[8px] tracking-wider mt-1 px-2 py-0.5 rounded ${
                    exp.status === "ACTIVE" ? "bg-f1-green/15 text-f1-green" : "bg-muted/50 text-muted-foreground/40"
                  }`}>
                    {exp.status}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PitWall;
