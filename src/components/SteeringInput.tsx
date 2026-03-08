import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SteeringInput = () => {
  const [angle, setAngle] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 9000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleMouse = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const offset = (e.clientX - centerX) / centerX;
      setAngle(offset * 45);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden xl:block"
    >
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 flex items-center gap-4">
        {/* Mini steering wheel */}
        <div className="relative w-12 h-12">
          <svg viewBox="0 0 48 48" className="w-full h-full">
            <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
            <motion.g
              animate={{ rotate: angle }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformOrigin: "24px 24px" }}
            >
              <circle cx="24" cy="24" r="18" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" opacity="0.3" />
              <line x1="6" y1="24" x2="18" y2="24" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <line x1="30" y1="24" x2="42" y2="24" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <line x1="24" y1="6" x2="24" y2="16" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <circle cx="24" cy="24" r="4" fill="hsl(var(--primary))" opacity="0.8" />
            </motion.g>
          </svg>
        </div>
        <div>
          <span className="font-mono text-[7px] tracking-[0.2em] text-muted-foreground/40 uppercase block">Steering</span>
          <span className="font-mono text-xs text-foreground/70 tabular-nums">{angle > 0 ? "+" : ""}{angle.toFixed(1)}°</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SteeringInput;
