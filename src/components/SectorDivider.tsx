import { motion } from "framer-motion";

interface SectorDividerProps {
  number: string;
  name: string;
}

const SectorDivider = ({ number, name }: SectorDividerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-10 md:px-12"
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/18 to-white/5" />
    <div className="glass flex items-center gap-3 rounded-full px-4 py-2">
      <span className="font-data text-[10px] uppercase tracking-[0.35em] text-[var(--f1-red)]">{number}</span>
      <span className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-white)]/70">{name}</span>
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-white/5 via-white/18 to-transparent" />
  </motion.div>
);

export default SectorDivider;
