import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, BatteryCharging } from "lucide-react";

const ERSBar = () => {
  const [energy, setEnergy] = useState(85);
  const [mode, setMode] = useState<"DEPLOY" | "HARVEST" | "BALANCED" | "OVERTAKE">("BALANCED");
  const [visible, setVisible] = useState(false);
  const [deployLaps, setDeployLaps] = useState(4.0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      const r = Math.random();
      const m = r > 0.8 ? "OVERTAKE" : r > 0.5 ? "DEPLOY" : r > 0.2 ? "BALANCED" : "HARVEST";
      setMode(m);
      setEnergy((p) => {
        if (m === "DEPLOY" || m === "OVERTAKE") return Math.max(5, p - Math.random() * 10);
        if (m === "HARVEST") return Math.min(100, p + Math.random() * 8);
        return Math.min(100, Math.max(0, p + (Math.random() - 0.5) * 4));
      });
      setDeployLaps((l) => Math.max(0, l - 0.1));
    }, 2000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  const modeColor = mode === "OVERTAKE" ? "text-primary" : mode === "DEPLOY" ? "text-f1-cyan" : mode === "HARVEST" ? "text-f1-green" : "text-f1-yellow";

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-6 bottom-6 z-40 hidden lg:block"
    >
      <div className="bg-card/90 backdrop-blur-sm border border-border p-3 rounded-lg w-44">
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="w-3 h-3 text-f1-cyan" />
          <span className="font-mono text-[7px] tracking-[0.2em] text-muted-foreground/50 uppercase">ERS</span>
          <span className={`font-mono text-[7px] ml-auto font-bold ${modeColor}`}>{mode}</span>
        </div>

        {/* Main energy bar */}
        <div className="h-3 bg-muted/30 rounded-full overflow-hidden mb-1.5">
          <motion.div
            animate={{ width: `${energy}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full relative"
            style={{
              background: energy > 60
                ? "linear-gradient(90deg, hsl(186 100% 50% / 0.5), hsl(186 100% 50%))"
                : energy > 30
                ? "linear-gradient(90deg, hsl(48 100% 55% / 0.5), hsl(48 100% 55%))"
                : "linear-gradient(90deg, hsl(0 85% 52% / 0.5), hsl(0 85% 52%))",
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] text-muted-foreground/40 tabular-nums">{Math.round(energy)}%</span>
          <div className="flex items-center gap-1">
            <BatteryCharging className="w-2.5 h-2.5 text-muted-foreground/25" />
            <span className="font-mono text-[7px] text-muted-foreground/30 tabular-nums">{deployLaps.toFixed(1)} laps</span>
          </div>
        </div>

        {/* MGU-K and MGU-H indicators */}
        <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-border/30">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-mono text-[6px] text-muted-foreground/30">MGU-K</span>
              <span className="font-mono text-[6px] text-f1-cyan/50 tabular-nums">{mode === "HARVEST" ? "↑" : "↓"}</span>
            </div>
            <div className="h-1 bg-muted/20 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${mode === "HARVEST" ? 80 : mode === "DEPLOY" ? 30 : 55}%` }}
                className="h-full bg-f1-cyan/50 rounded-full"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-mono text-[6px] text-muted-foreground/30">MGU-H</span>
              <span className="font-mono text-[6px] text-f1-purple/50 tabular-nums">{mode === "HARVEST" ? "↑" : "↓"}</span>
            </div>
            <div className="h-1 bg-muted/20 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${mode === "HARVEST" ? 70 : mode === "OVERTAKE" ? 95 : 45}%` }}
                className="h-full bg-f1-purple/50 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ERSBar;
