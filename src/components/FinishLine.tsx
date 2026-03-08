import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy, Star, Medal } from "lucide-react";

const FinishLine = () => {
  const [raceTime, setRaceTime] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShowConfetti(true); },
      { threshold: 0.5 }
    );
    const el = document.getElementById("finish-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="finish-section" className="py-32 px-6 md:px-12 max-w-6xl mx-auto text-center relative overflow-hidden">
      {/* Kerb pattern */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        className="kerb-pattern w-full mb-8 origin-left"
      />

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
          { pos: "2", h: "h-20", color: "bg-muted border-border", emoji: "🥈", icon: Medal },
          { pos: "1", h: "h-28", color: "bg-f1-gold/10 border-f1-gold/30", emoji: "🏆", icon: Trophy },
          { pos: "3", h: "h-16", color: "bg-muted/50 border-border", emoji: "🥉", icon: Star },
        ].map((p, i) => (
          <motion.div
            key={p.pos}
            initial={{ height: 0 }}
            whileInView={{ height: "auto" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.6, type: "spring" }}
            className={`w-28 ${p.h} ${p.color} border flex flex-col items-center justify-start pt-3 rounded-t-lg relative overflow-hidden`}
          >
            {/* Confetti shimmer */}
            {showConfetti && p.pos === "1" && (
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-gradient-to-t from-f1-gold/10 to-transparent"
              />
            )}
            <span className="text-xl mb-1 relative z-10">{p.emoji}</span>
            <span className={`font-display text-sm font-bold relative z-10 ${
              p.pos === "1" ? "text-f1-gold" : "text-muted-foreground/50"
            }`}>P{p.pos}</span>
            {p.pos === "1" && (
              <span className="font-mono text-[7px] text-f1-gold/50 mt-0.5 relative z-10">BRA</span>
            )}
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

        {/* Race result summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="inline-block bg-card border border-border p-5 rounded-lg mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-f1-green" />
            <span className="font-mono text-[9px] text-muted-foreground/50 tracking-wider uppercase">Race Result — Final Classification</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="font-display text-2xl font-black text-f1-gold">P1</span>
              <p className="font-mono text-[8px] text-muted-foreground/40 mt-0.5">FINISH POS</p>
            </div>
            <div>
              <span className="font-mono text-lg text-f1-green tabular-nums font-bold">{raceTime}</span>
              <p className="font-mono text-[8px] text-muted-foreground/40 mt-0.5">SESSION TIME</p>
            </div>
            <div>
              <span className="font-display text-2xl font-black text-primary">97</span>
              <p className="font-mono text-[8px] text-muted-foreground/40 mt-0.5">TOTAL PTS</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-4">
          <p className="font-display text-sm font-semibold text-primary">Branavan</p>
          <p className="font-mono text-xs text-muted-foreground/50 mt-1">BSc (Hons) Software Engineering · IIT / University of Westminster</p>
          <p className="font-mono text-[9px] text-muted-foreground/30 mt-0.5">Distributed Systems · Machine Learning · Cloud-Native Architecture · Full-Stack Development</p>
        </div>
      </motion.div>

      {/* Kerb pattern */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        className="kerb-pattern w-full mt-12 origin-right"
      />

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }}
        className="mt-12 pt-8 border-t border-border/30">
        <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider">
          © 2026 Branavan · Designed & engineered with precision · Built with React, TypeScript & Framer Motion
        </p>
        <p className="font-mono text-[8px] text-muted-foreground/15 mt-1">
          Inspired by the Formula 1® World Championship broadcast graphics
        </p>
      </motion.div>
    </section>
  );
};

export default FinishLine;
