import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "S1", label: "Driver Profile" },
  { id: "S2", label: "Performance" },
  { id: "S3", label: "Race History" },
  { id: "S4", label: "Pit Wall" },
  { id: "S5", label: "Telemetry" },
  { id: "PIT", label: "Contact" },
];

const RaceHUD = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSector, setCurrentSector] = useState(0);
  const [lapCount, setLapCount] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      const newSector = Math.min(Math.floor(progress * sections.length), sections.length - 1);
      if (newSector < currentSector && currentSector === sections.length - 1) {
        setLapCount((l) => l + 1);
      }
      setCurrentSector(newSector);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSector]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 7 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-4"
    >
      {/* Lap counter */}
      <div className="text-right mb-2">
        <span className="font-body text-[7px] text-muted-foreground/20 tracking-wider uppercase block">Lap</span>
        <span className="font-display text-lg font-bold text-foreground/50 tabular-nums">{lapCount}</span>
      </div>

      {/* Track progress line */}
      <div className="relative w-px h-40 bg-border/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary/60 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        {/* Section markers */}
        {sections.map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-px bg-border/40"
            style={{ top: `${(i / sections.length) * 100}%` }}
          />
        ))}
      </div>

      {/* Sector indicators */}
      <div className="flex flex-col gap-1.5">
        {sections.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center gap-2 cursor-default group"
            title={s.label}
          >
            {/* Label (shows on hover / active) */}
            <span className={`font-body text-[8px] tracking-wider uppercase transition-all duration-300 ${
              i === currentSector
                ? "text-primary opacity-100"
                : "text-muted-foreground/20 opacity-0 group-hover:opacity-100"
            }`}>
              {s.id}
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentSector
                  ? "bg-primary scale-150 shadow-[0_0_8px_hsl(1_97%_44%_/_0.6)]"
                  : i < currentSector
                  ? "bg-f1-green/50"
                  : "bg-border/30"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Speed indicator */}
      <div className="text-right mt-2">
        <span className="font-mono text-[9px] text-muted-foreground/20 tabular-nums">
          {Math.round(scrollProgress * 350)} km/h
        </span>
      </div>
    </motion.div>
  );
};

export default RaceHUD;
