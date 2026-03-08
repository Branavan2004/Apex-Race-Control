import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const drivers = [
  { pos: 1, name: "BRA", gap: "LEADER", color: "hsl(var(--f1-red))" },
  { pos: 2, name: "VER", gap: "+1.2s", color: "hsl(var(--f1-blue))" },
  { pos: 3, name: "HAM", gap: "+3.9s", color: "hsl(180 100% 40%)" },
  { pos: 4, name: "LEC", gap: "+5.4s", color: "hsl(var(--f1-red))" },
  { pos: 5, name: "NOR", gap: "+8.1s", color: "hsl(25 100% 50%)" },
];

const TimingTower = () => {
  const [visible, setVisible] = useState(false);
  const [lap, setLap] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 8500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => setLap((l) => Math.min(l + 1, 58)), 5000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-14 z-40 hidden xl:block"
    >
      <div className="bg-card/90 backdrop-blur-sm border-r border-border/50">
        <div className="px-3 py-2 border-b border-border/30 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/50 uppercase">
            Lap {lap}/58
          </span>
        </div>
        {drivers.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.3 }}
            className="flex items-center border-b border-border/20 hover:bg-muted/20 transition-colors"
          >
            <div className="w-0.5 h-7 shrink-0" style={{ backgroundColor: d.color }} />
            <span className="font-mono text-[10px] font-bold text-foreground/70 w-5 text-center">{d.pos}</span>
            <span className="font-mono text-[9px] font-semibold text-foreground/60 w-8">{d.name}</span>
            <span className={`font-mono text-[8px] w-12 text-right pr-2 tabular-nums ${
              d.gap === "LEADER" ? "text-f1-green font-bold" : "text-muted-foreground/40"
            }`}>
              {d.gap}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TimingTower;
