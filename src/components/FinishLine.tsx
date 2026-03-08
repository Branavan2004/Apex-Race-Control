import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FinishLine = () => {
  const [raceTime, setRaceTime] = useState("");

  useEffect(() => {
    const start = performance.now();
    const update = () => {
      const elapsed = (performance.now() - start) / 1000;
      const mins = Math.floor(elapsed / 60);
      const secs = Math.floor(elapsed % 60);
      const ms = Math.floor((elapsed % 1) * 1000);
      setRaceTime(`${mins}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`);
      requestAnimationFrame(update);
    };
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto text-center relative overflow-hidden">
      {/* Checkered pattern */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mb-12">
        <div className="grid grid-cols-16 w-64 h-16 mx-auto overflow-hidden rounded">
          {[...Array(64)].map((_, i) => {
            const row = Math.floor(i / 16);
            const col = i % 16;
            const isBlack = (row + col) % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.01, duration: 0.3, type: "spring" }}
                className={isBlack ? "bg-foreground" : "bg-muted"}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Podium */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        className="flex items-end justify-center gap-3 mb-12">
        {[
          { pos: "2", h: "h-20", color: "bg-muted border-border", emoji: "🥈" },
          { pos: "1", h: "h-28", color: "bg-f1-gold/10 border-f1-gold/30", emoji: "🏆" },
          { pos: "3", h: "h-16", color: "bg-muted/50 border-border", emoji: "🥉" },
        ].map((p, i) => (
          <motion.div
            key={p.pos}
            initial={{ height: 0 }}
            whileInView={{ height: "auto" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.6, type: "spring" }}
            className={`w-24 ${p.h} ${p.color} border flex flex-col items-center justify-start pt-3 rounded-t-lg`}
          >
            <span className="text-xl mb-1">{p.emoji}</span>
            <span className={`font-display text-sm font-bold ${
              p.pos === "1" ? "text-f1-gold" : "text-muted-foreground/50"
            }`}>P{p.pos}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 }}>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
          Thank You for Your Time
        </h2>
        <p className="font-body text-lg text-muted-foreground mb-2 max-w-xl mx-auto">
          I sincerely appreciate you reviewing my academic portfolio. If my research interests, technical 
          competencies, and project experience align with your requirements, I would welcome the opportunity 
          to discuss potential collaborations, positions, or research partnerships.
        </p>
        <p className="font-body text-base text-muted-foreground/60 mb-6 max-w-md mx-auto">
          I am committed to continuous learning, rigorous engineering, and meaningful contribution 
          to the field of computer science. I look forward to connecting with you.
        </p>

        {/* Session time */}
        <div className="inline-flex items-center gap-3 bg-card border border-border px-6 py-3 rounded-lg mb-6">
          <div className="w-2 h-2 rounded-full bg-f1-green" />
          <span className="font-mono text-[9px] text-muted-foreground/50 tracking-wider uppercase">Session Duration</span>
          <span className="font-mono text-lg text-f1-green tabular-nums font-bold">{raceTime}</span>
        </div>

        <div className="mt-2">
          <p className="font-display text-sm font-semibold text-primary">Branavan</p>
          <p className="font-mono text-xs text-muted-foreground/50 mt-1">BSc (Hons) Software Engineering · IIT / University of Westminster</p>
          <p className="font-mono text-[9px] text-muted-foreground/30 mt-0.5">Distributed Systems · Machine Learning · Cloud-Native Architecture · Full-Stack Development</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }}
        className="mt-20 pt-8 border-t border-border/30">
        <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider">
          © 2026 Branavan · Designed & engineered with precision · Built with React, TypeScript & Framer Motion
        </p>
      </motion.div>
    </section>
  );
};

export default FinishLine;
