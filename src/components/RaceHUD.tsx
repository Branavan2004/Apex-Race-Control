import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = ["Profile", "Skills", "Projects", "Experience", "Telemetry", "Contact", "Finish"];

const RaceHUD = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = Date.now();

    const handleScroll = () => {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? top / total : 0;
      setScrollProgress(progress);
      setCurrentSection(Math.min(Math.floor(progress * sections.length), sections.length - 1));
      
      const now = Date.now();
      const dt = now - lastT;
      if (dt > 0) {
        const s = Math.abs(top - lastY) / dt * 200;
        setSpeed((prev) => prev * 0.7 + Math.min(s, 350) * 0.3);
      }
      lastY = top;
      lastT = now;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 7 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2"
    >
      {/* Mini speed readout */}
      <div className="mb-3 text-right">
        <span className="font-display text-lg font-black text-foreground/20 tabular-nums">{Math.round(speed)}</span>
        <span className="font-mono text-[7px] text-muted-foreground/15 block">SCROLL km/h</span>
      </div>

      {sections.map((s, i) => (
        <div key={s} className="flex items-center gap-2 group cursor-default">
          <span className={`font-mono text-[9px] tracking-wider transition-all duration-300 ${
            i === currentSection ? "text-primary opacity-100" : "text-muted-foreground/20 opacity-0 group-hover:opacity-100"
          }`}>
            {s}
          </span>
          <div className={`transition-all duration-300 ${
            i === currentSection
              ? "w-3 h-3 rounded-full bg-primary scale-110 shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
              : i < currentSection
              ? "w-2 h-2 rounded-full bg-f1-green/40"
              : "w-2 h-2 rounded-full bg-border/40"
          }`} />
        </div>
      ))}
      
      {/* Progress bar + percentage */}
      <div className="mt-3 flex flex-col items-end gap-1">
        <div className="w-0.5 h-16 bg-muted/20 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-primary rounded-full"
            animate={{ height: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <span className="font-mono text-[8px] text-muted-foreground/30 tabular-nums">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </motion.nav>
  );
};

export default RaceHUD;
