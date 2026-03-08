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
    className="relative py-8 overflow-hidden"
  >
    {/* Main line */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    
    {/* Sector badge */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-background px-6 py-2">
      {/* Timing dot */}
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <div className="w-1 h-1 rounded-full bg-f1-yellow/50" />
        <div className="w-1 h-1 rounded-full bg-f1-green/50" />
      </div>
      
      {/* Sector number */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/30 uppercase">
          Sector
        </span>
        <span className="font-display text-sm font-black text-primary tabular-nums">
          {String(sector).padStart(2, "0")}
        </span>
      </div>
      
      {/* Divider */}
      <div className="w-px h-4 bg-border/50" />
      
      {/* Label */}
      <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/40 uppercase">
        {label}
      </span>
    </div>

    {/* Speed lines on scroll */}
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
      <div className="w-12 h-px bg-gradient-to-r from-primary/20 to-transparent" />
      <div className="flex-1" />
      <div className="w-12 h-px bg-gradient-to-l from-primary/20 to-transparent" />
    </div>
  </motion.div>
);

export default SectorDivider;
