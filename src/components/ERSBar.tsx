import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const ERSBar = () => {
  const [energy, setEnergy] = useState(85);
  const [mode, setMode] = useState<"DEPLOY" | "HARVEST" | "BALANCED">("BALANCED");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      const m = Math.random() > 0.6 ? "DEPLOY" : Math.random() > 0.3 ? "BALANCED" : "HARVEST";
      setMode(m);
      setEnergy((p) => {
        if (m === "DEPLOY") return Math.max(10, p - Math.random() * 8);
        if (m === "HARVEST") return Math.min(100, p + Math.random() * 6);
        return p + (Math.random() - 0.5) * 3;
      });
    }, 2000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-6 bottom-6 z-40 hidden lg:block"
    >
      <div className="bg-card/90 backdrop-blur-sm border border-border p-3 rounded-lg w-40">
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="w-3 h-3 text-f1-cyan" />
          <span className="font-mono text-[7px] tracking-[0.2em] text-muted-foreground/50 uppercase">ERS</span>
          <span className={`font-mono text-[7px] ml-auto ${
            mode === "DEPLOY" ? "text-f1-cyan" : mode === "HARVEST" ? "text-f1-green" : "text-f1-yellow"
          }`}>{mode}</span>
        </div>
        <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${energy}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: energy > 60
                ? "linear-gradient(90deg, hsl(186 100% 50% / 0.5), hsl(186 100% 50%))"
                : energy > 30
                ? "linear-gradient(90deg, hsl(48 100% 55% / 0.5), hsl(48 100% 55%))"
                : "linear-gradient(90deg, hsl(0 85% 52% / 0.5), hsl(0 85% 52%))",
            }}
          />
        </div>
        <span className="font-mono text-[8px] text-muted-foreground/40 tabular-nums">{Math.round(energy)}%</span>
      </div>
    </motion.div>
  );
};

export default ERSBar;
