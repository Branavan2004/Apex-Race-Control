import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FlagType = "GREEN" | "YELLOW" | "RED" | "CHEQUERED" | null;

const FlagSystem = () => {
  const [flag, setFlag] = useState<FlagType>(null);

  useEffect(() => {
    // Show green flag at start
    const t1 = setTimeout(() => setFlag("GREEN"), 6000);
    const t2 = setTimeout(() => setFlag(null), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    // Random yellow flags while scrolling fast
    let lastY = window.scrollY;
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      const speed = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (speed > 80 && !flag) {
        setFlag("YELLOW");
        timeout = setTimeout(() => setFlag(null), 2000);
      }
      // Chequered at bottom
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200;
      if (atBottom && flag !== "CHEQUERED") {
        setFlag("CHEQUERED");
        timeout = setTimeout(() => setFlag(null), 4000);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); clearTimeout(timeout); };
  }, [flag]);

  const flagConfig: Record<string, { bg: string; text: string; label: string }> = {
    GREEN: { bg: "bg-f1-green", text: "text-background", label: "GREEN FLAG — GO GO GO" },
    YELLOW: { bg: "bg-f1-yellow", text: "text-background", label: "⚠ YELLOW FLAG — CAUTION" },
    RED: { bg: "bg-primary", text: "text-primary-foreground", label: "RED FLAG — SESSION STOPPED" },
    CHEQUERED: { bg: "bg-foreground", text: "text-background", label: "🏁 CHEQUERED FLAG" },
  };

  return (
    <AnimatePresence>
      {flag && flagConfig[flag] && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className={`fixed top-10 left-1/2 -translate-x-1/2 z-[55] ${flagConfig[flag].bg} px-6 py-2 rounded-sm shadow-2xl`}
        >
          <span className={`font-mono text-[10px] tracking-[0.3em] ${flagConfig[flag].text} font-bold uppercase`}>
            {flagConfig[flag].label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlagSystem;
