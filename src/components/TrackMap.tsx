import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TrackMap = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? top / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackPath = "M 50,15 C 80,15 90,30 90,50 C 90,70 80,85 50,85 C 20,85 10,70 10,50 C 10,30 20,15 50,15 Z";

  return (
    <div className="fixed left-4 bottom-4 z-40 hidden xl:block">
      <div className="w-24 h-24 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d={trackPath} fill="none" stroke="hsl(220 12% 20%)" strokeWidth="3" />
          <motion.path
            d={trackPath}
            fill="none"
            stroke="hsl(var(--f1-red))"
            strokeWidth="2"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            pathLength={1}
            style={{ filter: "drop-shadow(0 0 3px hsl(var(--f1-red) / 0.6))" }}
          />
          <motion.circle r="2.5" fill="hsl(var(--f1-gold))">
            <animateMotion dur="1s" repeatCount="1" fill="freeze" keyPoints={`${progress};${progress}`} keyTimes="0;1" path={trackPath} />
          </motion.circle>
        </svg>
      </div>
    </div>
  );
};

export default TrackMap;
