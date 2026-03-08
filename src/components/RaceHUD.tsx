import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = ["Profile", "Skills", "Projects", "Experience", "Telemetry", "Contact"];

const RaceHUD = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? top / total : 0;
      setScrollProgress(progress);
      setCurrentSection(Math.min(Math.floor(progress * sections.length), sections.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 8 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2.5"
    >
      {sections.map((s, i) => (
        <div key={s} className="flex items-center gap-2 group cursor-default">
          <span className={`font-mono text-[9px] tracking-wider transition-all duration-500 ${
            i === currentSection ? "text-primary/60 opacity-100" : "text-muted-foreground/15 opacity-0 group-hover:opacity-100"
          }`}>
            {s}
          </span>
          <div className={`transition-all duration-500 rounded-full ${
            i === currentSection
              ? "w-2.5 h-2.5 bg-primary/60"
              : i < currentSection
              ? "w-1.5 h-1.5 bg-f1-green/30"
              : "w-1.5 h-1.5 bg-border/30"
          }`} />
        </div>
      ))}
      
      <div className="mt-4 flex flex-col items-end gap-1.5">
        <div className="w-px h-12 bg-muted/15 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-primary/40 rounded-full"
            animate={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="font-mono text-[7px] text-muted-foreground/20 tabular-nums">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </motion.nav>
  );
};

export default RaceHUD;
