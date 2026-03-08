import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const ERSBar = () => {
  const [energy, setEnergy] = useState(85);
  const [mode, setMode] = useState<"DEPLOY" | "HARVEST" | "BALANCED">("BALANCED");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      const newMode = Math.random() > 0.6 ? "DEPLOY" : Math.random() > 0.3 ? "BALANCED" : "HARVEST";
      setMode(newMode);
      setEnergy((prev) => {
        if (newMode === "DEPLOY") return Math.max(10, prev - Math.random() * 8);
        if (newMode === "HARVEST") return Math.min(100, prev + Math.random() * 6);
        return prev + (Math.random() - 0.5) * 3;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const modeColors = {
    DEPLOY: "text-f1-cyan",
    HARVEST: "text-f1-green",
    BALANCED: "text-f1-yellow",
  };

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-6 bottom-6 z-40 hidden lg:block"
    >
      <div className="bg-card/90 backdrop-blur-sm border border-border/50 p-3 w-48">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-3 h-3 text-f1-cyan" />
          <span className="font-display text-[8px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            ERS
          </span>
          <span className={`font-display text-[8px] tracking-[0.2em] ml-auto ${modeColors[mode]}`}>
            {mode}
          </span>
        </div>

        {/* Energy bar */}
        <div className="relative h-4 bg-muted/30 overflow-hidden mb-2">
          <motion.div
            animate={{ width: `${energy}%` }}
            transition={{ duration: 0.5 }}
            className="h-full"
            style={{
              background: energy > 60
                ? "linear-gradient(90deg, hsl(186 100% 50% / 0.6), hsl(186 100% 50% / 0.9))"
                : energy > 30
                ? "linear-gradient(90deg, hsl(48 100% 50% / 0.6), hsl(48 100% 50% / 0.9))"
                : "linear-gradient(90deg, hsl(1 97% 44% / 0.6), hsl(1 97% 44% / 0.9))",
            }}
          />
          {/* Grid lines */}
          {[25, 50, 75].map((p) => (
            <div key={p} className="absolute top-0 h-full w-px bg-border/30" style={{ left: `${p}%` }} />
          ))}
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-foreground/80 tabular-nums">
            {Math.round(energy)}%
          </span>
        </div>

        {/* MGU-K / MGU-H indicators */}
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-[7px] text-muted-foreground/30 tracking-wider uppercase">MGU-K</span>
              <span className="font-mono text-[8px] text-f1-cyan/70 tabular-nums">120kW</span>
            </div>
            <div className="h-0.5 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: mode === "DEPLOY" ? "90%" : mode === "HARVEST" ? "30%" : "60%" }}
                className="h-full bg-f1-cyan/50 rounded-full"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-[7px] text-muted-foreground/30 tracking-wider uppercase">MGU-H</span>
              <span className="font-mono text-[8px] text-f1-green/70 tabular-nums">80kW</span>
            </div>
            <div className="h-0.5 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: mode === "HARVEST" ? "85%" : mode === "DEPLOY" ? "40%" : "55%" }}
                className="h-full bg-f1-green/50 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ERSBar;
