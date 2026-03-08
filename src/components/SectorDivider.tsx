import { motion } from "framer-motion";

interface SectorDividerProps {
  sector: number;
  label: string;
}

const SectorDivider = ({ sector, label }: SectorDividerProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative py-12 overflow-hidden"
  >
    {/* Main gradient line */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    
    {/* Center badge — minimal and elegant */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 bg-background px-8">
      <span className="font-display text-[11px] font-semibold text-primary/50 tabular-nums tracking-wider">
        {String(sector).padStart(2, "0")}
      </span>
      <div className="w-4 h-px bg-primary/20" />
      <span className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/30 uppercase">
        {label}
      </span>
    </div>
  </motion.div>
);

export default SectorDivider;
