import { motion } from "framer-motion";

interface SectorHeaderProps {
  sector: string;
  title: string;
  subtitle?: string;
}

const SectorHeader = ({ sector, title, subtitle }: SectorHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <div className="flex items-center gap-4 mb-3">
      <span className="font-display text-xs tracking-[0.3em] text-f1-cyan uppercase">{sector}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-f1-cyan/40 to-transparent" />
    </div>
    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">{title}</h2>
    {subtitle && <p className="font-body text-lg text-muted-foreground mt-2">{subtitle}</p>}
  </motion.div>
);

export default SectorHeader;
