import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const drivers = [
  { pos: 1, name: "BRA", fullName: "Branavan", team: "Software Racing", gap: "LEADER", color: "hsl(var(--f1-red))", tire: "S", bestLap: "1:18.432", lastLap: "1:19.103", pits: 1 },
  { pos: 2, name: "VER", fullName: "Verstappen", team: "Red Bull Racing", gap: "+1.2s", color: "hsl(var(--f1-blue))", tire: "M", bestLap: "1:18.901", lastLap: "1:19.445", pits: 2 },
  { pos: 3, name: "HAM", fullName: "Hamilton", team: "Mercedes AMG", gap: "+3.9s", color: "hsl(180 100% 40%)", tire: "H", bestLap: "1:19.102", lastLap: "1:19.678", pits: 2 },
  { pos: 4, name: "LEC", fullName: "Leclerc", team: "Scuderia Ferrari", gap: "+5.4s", color: "hsl(var(--f1-red))", tire: "S", bestLap: "1:19.330", lastLap: "1:20.001", pits: 1 },
  { pos: 5, name: "NOR", fullName: "Norris", team: "McLaren F1", gap: "+8.1s", color: "hsl(25 100% 50%)", tire: "M", bestLap: "1:19.556", lastLap: "1:19.987", pits: 2 },
  { pos: 6, name: "PIA", fullName: "Piastri", team: "McLaren F1", gap: "+10.3s", color: "hsl(25 100% 50%)", tire: "H", bestLap: "1:19.789", lastLap: "1:20.234", pits: 1 },
  { pos: 7, name: "SAI", fullName: "Sainz", team: "Williams Racing", gap: "+12.7s", color: "hsl(210 80% 55%)", tire: "M", bestLap: "1:19.901", lastLap: "1:20.445", pits: 2 },
  { pos: 8, name: "RUS", fullName: "Russell", team: "Mercedes AMG", gap: "+15.1s", color: "hsl(180 100% 40%)", tire: "H", bestLap: "1:20.102", lastLap: "1:20.678", pits: 1 },
];

const TimingTower = () => {
  const [visible, setVisible] = useState(false);
  const [lap, setLap] = useState(1);
  const [gaps, setGaps] = useState(drivers.map((d) => d.gap));
  const [expanded, setExpanded] = useState(false);
  const [fastestLapIdx, setFastestLapIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 8500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      setLap((l) => Math.min(l + 1, 58));
      setGaps((prev) => prev.map((g, idx) => {
        if (idx === 0) return "LEADER";
        const base = parseFloat(g.replace("+", "").replace("s", "")) || idx * 2;
        const change = (Math.random() - 0.4) * 0.5;
        return `+${Math.max(0.1, base + change).toFixed(1)}s`;
      }));
      // Occasionally change fastest lap
      if (Math.random() > 0.8) setFastestLapIdx(Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  const tireColor = (t: string) =>
    t === "S" ? "bg-primary" : t === "M" ? "bg-f1-yellow" : "bg-foreground/50";

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-14 z-40 hidden xl:block"
    >
      <div
        className="bg-card/90 backdrop-blur-sm border-r border-border/50 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-border/30 flex items-center gap-2 bg-muted/10">
          <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/50 uppercase">
            Lap {lap}/58
          </span>
          <span className="font-mono text-[7px] text-muted-foreground/20 ml-auto">
            {expanded ? "▾" : "▸"}
          </span>
        </div>

        {/* Drivers */}
        {drivers.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.3 }}
            className={`flex items-center border-b border-border/20 hover:bg-muted/20 transition-colors group ${
              i === 0 ? "bg-primary/5" : ""
            }`}
          >
            {/* Team color bar */}
            <div className="w-0.5 h-8 shrink-0" style={{ backgroundColor: d.color }} />
            
            {/* Position */}
            <span className={`font-mono text-[10px] font-bold w-5 text-center ${
              i === 0 ? "text-f1-gold" : i === 1 ? "text-foreground/60" : i === 2 ? "text-f1-yellow/50" : "text-foreground/30"
            }`}>{d.pos}</span>
            
            {/* Name */}
            <span className={`font-mono text-[9px] font-semibold w-8 ${
              i === 0 ? "text-primary" : "text-foreground/60"
            }`}>{d.name}</span>
            
            {/* Tyre */}
            <div className={`w-2.5 h-2.5 rounded-full ${tireColor(d.tire)} mx-1`} />
            
            {/* Gap */}
            <span className={`font-mono text-[8px] tabular-nums pr-2 ${
              gaps[i] === "LEADER" ? "text-f1-green font-bold w-12 text-right" : "text-muted-foreground/40 w-12 text-right"
            }`}>{gaps[i]}</span>

            {/* Fastest lap indicator */}
            {i === fastestLapIdx && (
              <div className="w-1 h-1 rounded-full bg-f1-purple mr-1" />
            )}

            {/* Expanded info */}
            {expanded && (
              <div className="flex items-center gap-2 pr-2">
                <span className="font-mono text-[7px] text-muted-foreground/25 tabular-nums">{d.bestLap}</span>
                <span className="font-mono text-[7px] text-muted-foreground/20">P{d.pits}</span>
              </div>
            )}
          </motion.div>
        ))}

        {/* Footer */}
        <div className="px-3 py-1.5 flex items-center gap-2 bg-muted/5">
          <div className="w-1 h-1 rounded-full bg-f1-purple" />
          <span className="font-mono text-[7px] text-f1-purple/50">
            FL: {drivers[fastestLapIdx].name} {drivers[fastestLapIdx].bestLap}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TimingTower;
