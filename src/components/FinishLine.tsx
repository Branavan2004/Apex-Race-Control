import { motion } from "framer-motion";

const FinishLine = () => (
  <section className="py-32 px-6 md:px-8 flex flex-col items-center text-center max-w-3xl mx-auto">
    {/* Checkered flag — small, tasteful */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      <div className="grid grid-cols-8 w-24 h-12 mx-auto opacity-20">
        {[...Array(32)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isBlack = (row + col) % 2 === 0;
          return (
            <div key={i} className={isBlack ? "bg-foreground" : "bg-background"} />
          );
        })}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="font-display text-2xl font-bold text-foreground mb-3">
        Chequered Flag
      </h2>
      <p className="font-body text-muted-foreground/60 mb-2">
        Thanks for scrolling through the whole lap.
      </p>
      <p className="font-body text-sm text-f1-green/70">
        Ready for the next challenge.
      </p>
    </motion.div>

    <div className="mt-20 w-8 h-px bg-border/30" />
    <p className="mt-6 font-body text-[11px] text-muted-foreground/25 tracking-wider">
      © 2026 Branavan
    </p>
  </section>
);

export default FinishLine;
