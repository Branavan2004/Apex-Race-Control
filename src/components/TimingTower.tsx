import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const drivers = [
  { pos: 1, name: "BRA", team: "IIT", gap: "LEADER", color: "var(--primary)" },
  { pos: 2, name: "VER", team: "RBR", gap: "+1.204", color: "hsl(220 100% 50%)" },
  { pos: 3, name: "HAM", team: "MER", gap: "+3.891", color: "hsl(180 100% 50%)" },
  { pos: 4, name: "LEC", team: "FER", gap: "+5.442", color: "hsl(1 97% 44%)" },
  { pos: 5, name: "NOR", team: "MCL", gap: "+8.103", color: "hsl(25 100% 50%)" },
  { pos: 6, name: "PIA", team: "MCL", gap: "+9.671", color: "hsl(25 100% 50%)" },
  { pos: 7, name: "SAI", team: "FER", gap: "+12.330", color: "hsl(1 97% 44%)" },
  { pos: 8, name: "RUS", team: "MER", gap: "+14.882", color: "hsl(180 100% 50%)" },
];

const TimingTower = () => {
  const [visible, setVisible] = useState(false);
  const [fastestLap, setFastestLap] = useState(0);
  const [currentLap, setCurrentLap] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setFastestLap((prev) => (prev + 1) % drivers.length);
      setCurrentLap((prev) => Math.min(prev + 1, 58));
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 top-16 z-40 hidden lg:block"
    >
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-r border-b border-border/50 px-3 py-2 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse" />
        <span className="font-display text-[9px] tracking-[0.3em] text-muted-foreground/60 uppercase">
          Race — Lap {currentLap}/58
        </span>
      </div>

      {/* Drivers */}
      <div className="bg-card/90 backdrop-blur-sm border-r border-border/50">
        {drivers.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.3 }}
            className={`flex items-center gap-0 border-b border-border/20 hover:bg-muted/30 transition-colors group ${
              i === fastestLap ? "bg-f1-purple/10" : ""
            }`}
          >
            {/* Team color bar */}
            <div className="w-1 h-8 shrink-0" style={{ backgroundColor: d.color }} />

            {/* Position */}
            <span className="font-display text-[11px] font-bold text-foreground/80 w-6 text-center tabular-nums">
              {d.pos}
            </span>

            {/* Name */}
            <span className={`font-display text-[10px] font-semibold w-10 tracking-wider ${
              d.pos === 1 ? "text-foreground" : "text-foreground/70"
            }`}>
              {d.name}
            </span>

            {/* Gap */}
            <span className={`font-mono text-[9px] tabular-nums w-16 text-right pr-3 ${
              d.gap === "LEADER" 
                ? "text-f1-green font-bold" 
                : i === fastestLap 
                ? "text-f1-purple" 
                : "text-muted-foreground/50"
            }`}>
              {d.gap}
            </span>

            {/* Fastest lap indicator */}
            {i === fastestLap && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-1.5 h-1.5 rounded-full bg-f1-purple mr-2"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Interval toggle hint */}
      <div className="bg-card/80 backdrop-blur-sm border-r border-b border-border/50 px-3 py-1.5">
        <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">
          Interval · Gap to leader
        </span>
      </div>
    </motion.div>
  );
};

export default TimingTower;
