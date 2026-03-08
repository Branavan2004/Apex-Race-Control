import { motion } from "framer-motion";

const tickerItems = [
  { label: "FASTEST LAP", value: "BRANAVAN 1:23.456", color: "text-f1-purple" },
  { label: "GAP TO P2", value: "+12.345s", color: "text-f1-green" },
  { label: "TIRE", value: "SOFT — LAP 23/56", color: "text-primary" },
  { label: "DRS", value: "ENABLED", color: "text-f1-green" },
  { label: "TRACK TEMP", value: "42°C", color: "text-f1-yellow" },
  { label: "WIND", value: "3.2 km/h NW", color: "text-f1-cyan" },
  { label: "SECTOR 1", value: "PERSONAL BEST", color: "text-f1-green" },
  { label: "ERS DEPLOY", value: "98%", color: "text-f1-cyan" },
  { label: "FUEL", value: "+0.2 LAPS", color: "text-f1-yellow" },
  { label: "POSITION", value: "P1", color: "text-f1-green" },
];

const RaceTicker = () => (
  <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-background/90 backdrop-blur-md border-b border-border overflow-hidden">
    <motion.div
      className="flex items-center h-full whitespace-nowrap gap-8"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...tickerItems, ...tickerItems].map((item, i) => (
        <div key={i} className="flex items-center gap-2 shrink-0">
          <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">{item.label}</span>
          <span className={`font-display text-[10px] font-bold ${item.color}`}>{item.value}</span>
          <span className="text-border">│</span>
        </div>
      ))}
    </motion.div>
  </div>
);

export default RaceTicker;
