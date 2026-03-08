import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TrackMap = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 9000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? top / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  // Monza-inspired circuit
  const trackPath = "M 25,50 C 25,20 40,10 55,10 C 70,10 85,20 85,35 C 85,45 75,55 65,55 C 55,55 50,45 55,38 C 60,31 70,32 70,40 C 70,50 60,65 50,75 C 40,85 25,85 20,70 C 15,55 25,50 25,50 Z";

  const sectorPoints = [
    { x: 55, y: 10, label: "S1" },
    { x: 70, y: 40, label: "S2" },
    { x: 50, y: 75, label: "S3" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed left-4 bottom-4 z-40 hidden xl:block"
    >
      <div className="w-28 h-28 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2">
        <div className="flex items-center gap-1 mb-1">
          <span className="font-mono text-[6px] tracking-[0.2em] text-muted-foreground/40 uppercase">Circuit</span>
          <span className="font-mono text-[6px] text-f1-green ml-auto tabular-nums">{Math.round(progress * 100)}%</span>
        </div>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Track outline */}
          <path d={trackPath} fill="none" stroke="hsl(var(--border))" strokeWidth="4" strokeLinecap="round" />
          {/* Completed portion */}
          <motion.path
            d={trackPath}
            fill="none"
            stroke="hsl(var(--f1-red))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            pathLength={1}
            style={{ filter: "drop-shadow(0 0 4px hsl(var(--f1-red) / 0.6))" }}
          />
          {/* Sector markers */}
          {sectorPoints.map((sp) => (
            <g key={sp.label}>
              <circle cx={sp.x} cy={sp.y} r="2" fill="hsl(var(--muted-foreground))" opacity="0.3" />
              <text x={sp.x + 4} y={sp.y + 1} fill="hsl(var(--muted-foreground))" opacity="0.3" fontSize="5" fontFamily="monospace">{sp.label}</text>
            </g>
          ))}
          {/* Driver dot */}
          <motion.circle r="3" fill="hsl(var(--f1-gold))" style={{ filter: "drop-shadow(0 0 4px hsl(var(--f1-gold) / 0.8))" }}>
            <animateMotion dur="1s" repeatCount="1" fill="freeze" keyPoints={`${progress};${progress}`} keyTimes="0;1" path={trackPath} />
          </motion.circle>
        </svg>
      </div>
    </motion.div>
  );
};

export default TrackMap;
