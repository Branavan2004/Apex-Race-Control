import { motion } from "framer-motion";

const FinishLine = () => (
  <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto text-center relative overflow-hidden">
    {/* Checkered pattern */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="grid grid-cols-12 w-48 h-12 mx-auto overflow-hidden rounded">
        {[...Array(48)].map((_, i) => {
          const row = Math.floor(i / 12);
          const col = i % 12;
          const isBlack = (row + col) % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.015, duration: 0.2 }}
              className={isBlack ? "bg-foreground" : "bg-muted"}
            />
          );
        })}
      </div>
    </motion.div>

    {/* Podium */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="flex items-end justify-center gap-2 mb-12"
    >
      {[
        { pos: "2", h: "h-16", color: "bg-muted border-border" },
        { pos: "1", h: "h-24", color: "bg-f1-gold/10 border-f1-gold/30" },
        { pos: "3", h: "h-12", color: "bg-muted/50 border-border" },
      ].map((p, i) => (
        <motion.div
          key={p.pos}
          initial={{ height: 0 }}
          whileInView={{ height: "auto" }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
          className={`w-20 ${p.h} ${p.color} border flex items-start justify-center pt-3 rounded-t`}
        >
          <span className={`font-display text-sm font-bold ${
            p.pos === "1" ? "text-f1-gold" : "text-muted-foreground/50"
          }`}>
            P{p.pos}
          </span>
        </motion.div>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1 }}
    >
      <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
        Chequered Flag
      </h2>
      <p className="font-body text-lg text-muted-foreground mb-2">
        Thanks for completing the lap.
      </p>
      <p className="font-mono text-sm text-f1-green">Race Complete — Driver: Branavan</p>
      <p className="font-mono text-xs text-muted-foreground/40 mt-1">Status: Ready for the next challenge.</p>
    </motion.div>

    {/* Footer */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.3 }}
      className="mt-20 pt-8 border-t border-border/30"
    >
      <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider">
        © 2026 Branavan · Engineered with precision
      </p>
    </motion.div>
  </section>
);

export default FinishLine;
