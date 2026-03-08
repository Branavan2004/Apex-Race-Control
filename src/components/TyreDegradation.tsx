import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TyreDegradation = () => {
  const [visible, setVisible] = useState(false);
  const [wear, setWear] = useState({ fl: 100, fr: 100, rl: 100, rr: 100 });
  const [compound, setCompound] = useState<"SOFT" | "MEDIUM" | "HARD">("SOFT");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 12000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      setWear((w) => ({
        fl: Math.max(5, w.fl - Math.random() * 1.5 - 0.3),
        fr: Math.max(5, w.fr - Math.random() * 1.8 - 0.2),
        rl: Math.max(5, w.rl - Math.random() * 1.2 - 0.1),
        rr: Math.max(5, w.rr - Math.random() * 1.4 - 0.3),
      }));
    }, 3000);

    // Pit stop — change compound
    const pit = setInterval(() => {
      setWear({ fl: 100, fr: 100, rl: 100, rr: 100 });
      setCompound((c) => c === "SOFT" ? "MEDIUM" : c === "MEDIUM" ? "HARD" : "SOFT");
    }, 45000);

    return () => { clearInterval(i); clearInterval(pit); };
  }, [visible]);

  if (!visible) return null;

  const getColor = (val: number) =>
    val > 60 ? "hsl(var(--f1-green))" : val > 30 ? "hsl(var(--f1-yellow))" : "hsl(var(--f1-red))";

  const compoundColor = compound === "SOFT" ? "bg-primary" : compound === "MEDIUM" ? "bg-f1-yellow" : "bg-foreground";

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-20 left-6 z-40 hidden lg:block"
    >
      <div className="bg-card/90 backdrop-blur-sm border border-border p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-4 h-4 rounded-full ${compoundColor} flex items-center justify-center`}>
            <span className="font-mono text-[6px] font-bold text-background">{compound[0]}</span>
          </div>
          <span className="font-mono text-[7px] tracking-[0.2em] text-muted-foreground/40 uppercase">Tyre Wear</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 w-20">
          {(["fl", "fr", "rl", "rr"] as const).map((pos) => (
            <div key={pos} className="text-center">
              <div className="relative h-1 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${wear[pos]}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getColor(wear[pos]) }}
                />
              </div>
              <span className="font-mono text-[7px] text-muted-foreground/40">{Math.round(wear[pos])}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TyreDegradation;
