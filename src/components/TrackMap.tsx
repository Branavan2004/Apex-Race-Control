import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TrackMap = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simple oval-ish F1 track path
  const trackPath = "M 50,15 C 80,15 90,30 90,50 C 90,70 80,85 50,85 C 20,85 10,70 10,50 C 10,30 20,15 50,15 Z";

  return (
    <div className="fixed left-4 bottom-4 z-40 hidden lg:block">
      <div className="w-28 h-28 border border-border bg-card/80 backdrop-blur-md p-2">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1 h-1 rounded-full bg-f1-green animate-pulse-glow" />
          <span className="font-display text-[7px] tracking-widest text-muted-foreground">TRACK MAP</span>
        </div>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Track outline */}
          <path
            d={trackPath}
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth="3"
          />
          {/* Glowing track progress */}
          <motion.path
            d={trackPath}
            fill="none"
            stroke="hsl(186 100% 50%)"
            strokeWidth="2"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            pathLength={1}
            style={{ filter: "drop-shadow(0 0 4px hsl(186 100% 50% / 0.8))" }}
          />
          {/* Car dot */}
          <motion.circle
            r="3"
            fill="hsl(1 97% 44%)"
            style={{ filter: "drop-shadow(0 0 6px hsl(1 97% 44% / 0.8))" }}
          >
            <animateMotion
              dur="1s"
              repeatCount="1"
              fill="freeze"
              keyPoints={`${progress};${progress}`}
              keyTimes="0;1"
              path={trackPath}
            />
          </motion.circle>
          {/* Sector markers */}
          {[
            { x: 70, y: 18, label: "S1" },
            { x: 88, y: 65, label: "S2" },
            { x: 15, y: 65, label: "S3" },
          ].map((s) => (
            <text
              key={s.label}
              x={s.x}
              y={s.y}
              fill="hsl(0 0% 45%)"
              fontSize="5"
              fontFamily="Orbitron"
            >
              {s.label}
            </text>
          ))}
          {/* Start/Finish line */}
          <line x1="48" y1="13" x2="52" y2="13" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

export default TrackMap;
