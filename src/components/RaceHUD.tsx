import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = ["S1", "S2", "S3", "S4", "PIT", "FIN"];
const sectionNames = ["Profile", "Skills", "Projects", "Experience", "Contact", "Finish"];

const RaceHUD = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSector, setCurrentSector] = useState(0);
  const [lap, setLap] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      const sectorIndex = Math.min(Math.floor(progress * sections.length), sections.length - 1);
      setCurrentSector(sectorIndex);
      setLap(Math.floor(progress * 3) + 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 6 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3"
    >
      {/* Lap counter */}
      <div className="bg-card/80 backdrop-blur-md border border-border px-3 py-2 text-center mb-2">
        <span className="font-body text-[10px] text-muted-foreground block">LAP</span>
        <span className="font-display text-lg font-bold text-foreground">{lap}/3</span>
      </div>

      {/* Track progress */}
      <div className="relative w-1 h-48 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        {/* Car indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-foreground shadow-lg"
          style={{ top: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Sector indicators */}
      <div className="flex flex-col gap-1 mt-2">
        {sections.map((s, i) => (
          <div
            key={s}
            className={`px-2 py-1 text-center transition-colors duration-300 ${
              i === currentSector
                ? "bg-primary/20 border border-primary/40"
                : "bg-card/40 border border-transparent"
            }`}
          >
            <span className={`font-display text-[9px] ${
              i === currentSector ? "text-primary" : "text-muted-foreground"
            }`}>
              {s}
            </span>
          </div>
        ))}
      </div>

      {/* DRS indicator */}
      <div className={`mt-2 px-2 py-1 font-display text-[9px] tracking-widest transition-colors ${
        scrollProgress > 0.1 ? "text-f1-green bg-f1-green/10 border border-f1-green/30" : "text-muted-foreground bg-muted/50"
      }`}>
        DRS
      </div>
    </motion.div>
  );
};

export default RaceHUD;
