import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const FinishLine = () => (
  <section className="py-32 px-6 md:px-8 flex flex-col items-center text-center max-w-3xl mx-auto relative overflow-hidden">
    {/* Animated checkered flag */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="relative">
        <div className="grid grid-cols-10 w-32 h-16 mx-auto overflow-hidden">
          {[...Array(40)].map((_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            const isBlack = (row + col) % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.2 }}
                className={isBlack ? "bg-foreground" : "bg-background border border-border/20"}
              />
            );
          })}
        </div>
        {/* Waving effect overlay */}
        <motion.div
          animate={{ x: [-160, 160] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent pointer-events-none"
        />
      </div>
    </motion.div>

    {/* Podium */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-end justify-center gap-3 mb-8">
        {/* P2 */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 48 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-16 bg-foreground/10 border border-border/30 flex items-start justify-center pt-2"
        >
          <span className="font-display text-[10px] text-muted-foreground/50">P2</span>
        </motion.div>
        {/* P1 */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 72 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-20 bg-f1-yellow/10 border border-f1-yellow/30 flex flex-col items-center justify-start pt-2 relative"
        >
          <Trophy className="w-4 h-4 text-f1-yellow mb-1" />
          <span className="font-display text-xs font-bold text-f1-yellow">P1</span>
          {/* Glow */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-f1-yellow/10 blur-xl" />
        </motion.div>
        {/* P3 */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 36 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-16 bg-f1-yellow/5 border border-border/30 flex items-start justify-center pt-2"
        >
          <span className="font-display text-[10px] text-muted-foreground/40">P3</span>
        </motion.div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1.2 }}
    >
      <h2 className="font-display text-3xl font-bold text-foreground mb-3">
        Chequered Flag
      </h2>
      <p className="font-body text-muted-foreground/60 mb-2">
        Thanks for scrolling through the whole lap.
      </p>
      <p className="font-body text-sm text-f1-green/70 mb-1">
        Race Complete — Driver: Branavan
      </p>
      <p className="font-body text-xs text-f1-cyan/50">
        Status: Ready for the next challenge.
      </p>
    </motion.div>

    {/* Race classification */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.5 }}
      className="mt-12 border border-border/30 p-4 w-full max-w-xs"
    >
      <span className="font-display text-[8px] tracking-[0.3em] text-muted-foreground/30 uppercase block mb-3">
        Race Classification
      </span>
      {[
        { pos: "1", name: "BRA", time: "1:28:32.441", color: "text-f1-yellow" },
        { pos: "2", name: "VER", time: "+3.204", color: "text-foreground/60" },
        { pos: "3", name: "HAM", time: "+8.891", color: "text-foreground/40" },
      ].map((r) => (
        <div key={r.pos} className="flex items-center gap-3 py-1.5 border-b border-border/20 last:border-0">
          <span className={`font-display text-xs font-bold ${r.color} w-4`}>{r.pos}</span>
          <span className="font-display text-[11px] font-semibold text-foreground/70 w-8">{r.name}</span>
          <span className="font-mono text-[10px] text-muted-foreground/40 ml-auto tabular-nums">{r.time}</span>
        </div>
      ))}
    </motion.div>

    <div className="mt-20 w-8 h-px bg-border/30" />
    <p className="mt-6 font-body text-[11px] text-muted-foreground/25 tracking-wider">
      © 2026 Branavan · Built with precision engineering
    </p>
  </section>
);

export default FinishLine;
