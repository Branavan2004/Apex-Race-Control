import { motion } from "framer-motion";

const FinishLine = () => (
  <section className="relative py-24 px-4 md:px-8 flex flex-col items-center text-center overflow-hidden">
    {/* Animated checkered flag */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mb-8 relative"
    >
      {/* Waving flag animation */}
      <motion.div
        animate={{ rotateY: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="perspective-500"
      >
        <div className="grid grid-cols-10 w-48 h-24 mx-auto border border-border overflow-hidden">
          {[...Array(50)].map((_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            const isBlack = (row + col) % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className={isBlack ? "bg-foreground" : "bg-background"}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Glow under flag */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-foreground/5 blur-xl" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="font-display text-4xl md:text-6xl font-black text-foreground mb-2">RACE COMPLETE</h2>
      <div className="w-32 h-0.5 bg-primary mx-auto mb-6" />
      <div className="space-y-1 mb-10">
        <p className="font-body text-lg text-muted-foreground">
          Driver: <span className="text-foreground font-semibold">Branavan</span>
        </p>
        <p className="font-body text-lg text-f1-green">Status: Ready for the next challenge.</p>
      </div>
    </motion.div>

    {/* Podium */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="flex items-end gap-3"
    >
      {[
        { pos: "P2", h: 64, color: "bg-muted", glow: "" },
        { pos: "P1", h: 96, color: "bg-primary", glow: "glow-red" },
        { pos: "P3", h: 48, color: "bg-muted", glow: "" },
      ].map((p, i) => (
        <div key={p.pos} className="flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.2 }}
            className={`font-display text-sm ${p.pos === "P1" ? "text-primary" : "text-muted-foreground"}`}
          >
            {p.pos}
          </motion.span>
          <motion.div
            className={`w-20 ${p.color} ${p.glow} rounded-t-sm`}
            initial={{ height: 0 }}
            whileInView={{ height: p.h }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 + i * 0.15 }}
          />
        </div>
      ))}
    </motion.div>

    {/* Confetti-like sparkles */}
    <div className="relative mt-8 w-full h-8">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            backgroundColor: i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--f1-cyan))" : "hsl(var(--f1-yellow))",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: i * 0.12,
          }}
        />
      ))}
    </div>

    <p className="mt-12 font-body text-xs text-muted-foreground/40 tracking-widest">
      © 2026 BRANAVAN · ALL RIGHTS RESERVED
    </p>
  </section>
);

export default FinishLine;
