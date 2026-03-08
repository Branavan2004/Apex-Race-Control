import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TrackMap = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentSector, setCurrentSector] = useState(1);
  const [miniSectorTime, setMiniSectorTime] = useState("--.-");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 9000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? top / total : 0;
      setProgress(p);
      setCurrentSector(p < 0.33 ? 1 : p < 0.66 ? 2 : 3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulated mini-sector updates
  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      const time = (18 + Math.random() * 14).toFixed(1);
      setMiniSectorTime(time);
    }, 3000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  // Monza-inspired circuit
  const trackPath = "M 25,50 C 25,20 40,10 55,10 C 70,10 85,20 85,35 C 85,45 75,55 65,55 C 55,55 50,45 55,38 C 60,31 70,32 70,40 C 70,50 60,65 50,75 C 40,85 25,85 20,70 C 15,55 25,50 25,50 Z";

  const sectorPoints = [
    { x: 55, y: 10, label: "S1", color: currentSector >= 1 ? "hsl(var(--f1-green))" : "hsl(var(--muted-foreground))" },
    { x: 70, y: 40, label: "S2", color: currentSector >= 2 ? "hsl(var(--f1-green))" : "hsl(var(--muted-foreground))" },
    { x: 50, y: 75, label: "S3", color: currentSector >= 3 ? "hsl(var(--f1-green))" : "hsl(var(--muted-foreground))" },
  ];

  // DRS zones
  const drsZones = [
    { x: 40, y: 14 },
    { x: 35, y: 80 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed left-4 bottom-4 z-40 hidden xl:block"
    >
      <div className="w-32 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2">
        <div className="flex items-center gap-1 mb-1">
          <span className="font-mono text-[6px] tracking-[0.2em] text-muted-foreground/40 uppercase">Autodromo</span>
          <span className="font-mono text-[6px] text-f1-green ml-auto tabular-nums">{Math.round(progress * 100)}%</span>
        </div>
        
        <div className="relative h-24">
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
            
            {/* DRS zones */}
            {drsZones.map((dz, i) => (
              <g key={i}>
                <circle cx={dz.x} cy={dz.y} r="2.5" fill="none" stroke="hsl(var(--f1-green))" strokeWidth="0.5" opacity="0.4" strokeDasharray="1 1" />
                <text x={dz.x} y={dz.y + 7} fill="hsl(var(--f1-green))" opacity="0.3" fontSize="3.5" fontFamily="monospace" textAnchor="middle">DRS</text>
              </g>
            ))}
            
            {/* Sector markers */}
            {sectorPoints.map((sp) => (
              <g key={sp.label}>
                <circle cx={sp.x} cy={sp.y} r="2.5" fill={sp.color} opacity="0.5" />
                <text x={sp.x + 5} y={sp.y + 1.5} fill={sp.color} opacity="0.6" fontSize="5" fontFamily="monospace">{sp.label}</text>
              </g>
            ))}
            
            {/* Start/finish line */}
            <line x1="22" y1="48" x2="28" y2="52" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
            
            {/* Driver dot */}
            <motion.circle r="3.5" fill="hsl(var(--f1-gold))" style={{ filter: "drop-shadow(0 0 6px hsl(var(--f1-gold) / 0.8))" }}>
              <animateMotion dur="1s" repeatCount="1" fill="freeze" keyPoints={`${progress};${progress}`} keyTimes="0;1" path={trackPath} />
            </motion.circle>
          </svg>
        </div>

        {/* Mini sector time */}
        <div className="flex items-center justify-between mt-1 pt-1 border-t border-border/30">
          <span className="font-mono text-[6px] text-muted-foreground/30">S{currentSector}</span>
          <span className="font-mono text-[8px] text-f1-green tabular-nums">{miniSectorTime}s</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TrackMap;
