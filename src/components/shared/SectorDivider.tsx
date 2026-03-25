import { motion } from 'framer-motion';

type SectorDividerProps = {
  number: number;
  name: string;
};

export default function SectorDivider({ number, name }: SectorDividerProps) {
  return (
    <motion.div
      className="sector-divider"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <span className="sector-divider__line" />
      <div className="sector-divider__pill">
        <span>{`SECTOR ${number}`}</span>
        <strong>{name}</strong>
      </div>
      <span className="sector-divider__line" />
    </motion.div>
  );
}
