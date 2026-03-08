import { motion } from "framer-motion";

const FinishLine = () => (
  <section className="relative py-24 px-4 md:px-8 flex flex-col items-center text-center">
    {/* Checkered flag pattern */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="grid grid-cols-8 w-32 h-16 mx-auto mb-6">
        {[...Array(32)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isBlack = (row + col) % 2 === 0;
          return (
            <div
              key={i}
              className={isBlack ? "bg-foreground" : "bg-background"}
            />
          );
        })}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">RACE COMPLETE</h2>
      <div className="space-y-1 mb-8">
        <p className="font-body text-lg text-muted-foreground">
          Driver: <span className="text-foreground font-semibold">Branavan</span>
        </p>
        <p className="font-body text-lg text-f1-green">Status: Ready for the next challenge.</p>
      </div>
    </motion.div>

    {/* Podium lights */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="flex gap-6"
    >
      {[
        { pos: "P2", h: "h-16", color: "bg-muted" },
        { pos: "P1", h: "h-24", color: "bg-primary" },
        { pos: "P3", h: "h-12", color: "bg-muted" },
      ].map((p) => (
        <div key={p.pos} className="flex flex-col items-center gap-2">
          <span className="font-display text-xs text-muted-foreground">{p.pos}</span>
          <motion.div
            className={`w-16 ${p.h} ${p.color} rounded-t-sm`}
            initial={{ height: 0 }}
            whileInView={{ height: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      ))}
    </motion.div>

    <p className="mt-16 font-body text-xs text-muted-foreground/50 tracking-widest">
      © 2026 BRANAVAN · ALL RIGHTS RESERVED
    </p>
  </section>
);

export default FinishLine;
