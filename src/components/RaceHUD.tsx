import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = ["S1", "S2", "S3", "S4", "S5", "PIT"];

const RaceHUD = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSector, setCurrentSector] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setCurrentSector(Math.min(Math.floor(progress * sections.length), sections.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 7 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2"
    >
      {/* Track progress line */}
      <div className="relative w-px h-40 bg-border/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary/60 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Sector dots */}
      <div className="flex flex-col gap-1.5 mt-3">
        {sections.map((s, i) => (
          <div
            key={s}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentSector
                ? "bg-primary scale-125"
                : i < currentSector
                ? "bg-muted-foreground/30"
                : "bg-border/30"
            }`}
            title={s}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default RaceHUD;
