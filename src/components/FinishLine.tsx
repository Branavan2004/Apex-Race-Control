import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";

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
        <div className="grid grid-cols-16 w-56 h-14 mx-auto overflow-hidden rounded-lg opacity-40">
          {[...Array(64)].map((_, i) => {
            const row = Math.floor(i / 16);
            const col = i % 16;
            const isBlack = (row + col) % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.008, duration: 0.3 }}
                className={isBlack ? "bg-foreground" : "bg-muted"}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Podium */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        className="flex items-end justify-center gap-3 mb-14">
        {[
          { pos: "2", h: "h-16", color: "glass", emoji: "🥈" },
          { pos: "1", h: "h-24", color: "glass glow-primary", emoji: "🏆" },
          { pos: "3", h: "h-12", color: "glass", emoji: "🥉" },
        ].map((p, i) => (
          <motion.div
            key={p.pos}
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "auto", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.8, type: "spring" }}
            className={`w-24 ${p.h} ${p.color} rounded-t-xl flex flex-col items-center justify-start pt-3`}
          >
            <span className="text-lg mb-1">{p.emoji}</span>
            <span className={`font-display text-sm font-bold ${
              p.pos === "1" ? "text-f1-gold/70" : "text-muted-foreground/30"
            }`}>P{p.pos}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight mb-5">
          Thank You
        </h2>
        <p className="font-body text-lg text-muted-foreground/55 mb-2 max-w-lg mx-auto leading-relaxed">
          I appreciate you reviewing my portfolio. If my experience aligns with your needs, 
          I'd welcome the opportunity to discuss collaborations or positions.
        </p>

        {/* Race result */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="inline-block glass rounded-xl p-5 mt-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-3.5 h-3.5 text-f1-gold/40" />
            <span className="font-mono text-[9px] text-muted-foreground/30 tracking-wider uppercase">Final Classification</span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <span className="font-display text-2xl font-black text-f1-gold/60">P1</span>
              <p className="font-mono text-[8px] text-muted-foreground/25 mt-0.5">FINISH</p>
            </div>
            <div>
              <span className="font-mono text-lg text-f1-green/50 tabular-nums font-bold">{raceTime}</span>
              <p className="font-mono text-[8px] text-muted-foreground/25 mt-0.5">SESSION</p>
            </div>
            <div>
              <span className="font-display text-2xl font-black text-primary/50">97</span>
              <p className="font-mono text-[8px] text-muted-foreground/25 mt-0.5">POINTS</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-4">
          <p className="font-display text-sm font-semibold text-primary/60">Branavan</p>
          <p className="font-mono text-xs text-muted-foreground/35 mt-1">BSc (Hons) Software Engineering · IIT / University of Westminster</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}
        className="mt-20 pt-8 border-t border-border/20">
        <p className="font-mono text-[10px] text-muted-foreground/20 tracking-wider">
          © 2026 Branavan · Built with React, TypeScript & Framer Motion
        </p>
      </motion.div>
    </section>
  );
};

export default FinishLine;
