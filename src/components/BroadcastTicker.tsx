import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  "DRS ENABLED — Zone Active",
  "FASTEST LAP — BRA 1:18.432",
  "TRACK TEMP 42°C — AIR 28°C",
  "PIT WINDOW OPEN — Lap 18-24",
  "ERS DEPLOY — Full Power",
  "TYRE STRATEGY — Soft → Medium",
  "SECTOR 1 — Personal Best",
  "CHAMPIONSHIP PTS — 97/125",
];

const BroadcastTicker = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 h-7 bg-card/70 backdrop-blur-md border-b border-border/20 overflow-hidden"
    >
      <div className="flex items-center h-full">
        <div className="flex items-center gap-2 px-3 h-full border-r border-border/15 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-f1-green/60 animate-pulse" />
          <span className="font-mono text-[7px] tracking-[0.3em] text-muted-foreground/30 uppercase">LIVE</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...messages, ...messages].map((msg, i) => (
              <span key={i} className="font-mono text-[9px] text-muted-foreground/35 tracking-wide">
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BroadcastTicker;
