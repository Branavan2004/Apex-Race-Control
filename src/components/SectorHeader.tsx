import { motion } from "framer-motion";

interface SectorHeaderProps {
  sector: string;
  title: string;
  subtitle?: string;
}

const SectorHeader = ({ sector, title, subtitle }: SectorHeaderProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8 }}
    className="mb-16"
  >
    <span className="font-display text-[10px] tracking-[0.4em] text-primary/50 uppercase block mb-3">
      {sector}
    </span>
    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="font-body text-base text-muted-foreground/60 max-w-lg">{subtitle}</p>
    )}
  </motion.div>
);

export default SectorHeader;
