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
      transition={{ delay: 7 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map((s, i) => (
        <div key={s} className="flex items-center gap-2 group cursor-default">
          <span className={`font-mono text-[9px] tracking-wider transition-all duration-300 ${
            i === currentSection ? "text-primary opacity-100" : "text-muted-foreground/20 opacity-0 group-hover:opacity-100"
          }`}>
            {s}
          </span>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === currentSection
              ? "bg-primary scale-125"
              : i < currentSection
              ? "bg-f1-green/40"
              : "bg-border/40"
          }`} />
        </div>
      ))}
      <div className="mt-4 text-right">
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent ml-auto" />
        <span className="font-mono text-[8px] text-muted-foreground/30 tabular-nums mt-1 block">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </motion.nav>
  );
};

export default RaceHUD;
