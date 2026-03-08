import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const flags = [
  { type: "GREEN", color: "bg-f1-green", textColor: "text-f1-green", label: "RACE ACTIVE" },
  { type: "YELLOW", color: "bg-f1-yellow", textColor: "text-f1-yellow", label: "CAUTION ZONE" },
  { type: "PURPLE", color: "bg-f1-purple", textColor: "text-f1-purple", label: "FASTEST SECTOR" },
  { type: "CHEQUERED", color: "bg-foreground", textColor: "text-foreground", label: "FINISH" },
];

const RaceFlagBanner = () => {
  const [currentFlag, setCurrentFlag] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (progress > 0.9) setCurrentFlag(3);
      else if (progress > 0.5) setCurrentFlag(2);
      else if (progress > 0.2) setCurrentFlag(0);
      else setCurrentFlag(1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const flag = flags[currentFlag];

  return (
    <motion.div
      key={flag.type}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-14 z-40 hidden lg:flex items-center gap-2 bg-card/80 backdrop-blur-md border border-border px-3 py-1.5"
    >
      <div className={`w-3 h-3 rounded-sm ${flag.color}`} />
      <span className={`font-display text-[9px] tracking-widest ${flag.textColor}`}>{flag.label}</span>
    </motion.div>
  );
};

export default RaceFlagBanner;
