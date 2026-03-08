import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DRSOverlay = () => {
  const [drsActive, setDrsActive] = useState(false);
  const [drsZone, setDrsZone] = useState(1);

  useEffect(() => {
    let lastScroll = 0;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const speed = Math.abs(window.scrollY - lastScroll) / dt * 1000;
        setDrsActive(speed > 900);
        // Alternate DRS zones
        if (speed > 900) {
          setDrsZone(Math.random() > 0.5 ? 1 : 2);
        }
      }
      lastScroll = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {drsActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 pointer-events-none"
        >
          {/* Side glow lines */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-f1-green/40 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-f1-green/40 to-transparent" />
          
          {/* Top banner */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 origin-center"
          >
            <div className="bg-f1-green/90 px-8 py-1.5 rounded-sm shadow-2xl flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-background font-bold uppercase">DRS</span>
              <div className="w-px h-3 bg-background/30" />
              <span className="font-mono text-[7px] text-background/70 tracking-wider">ZONE {drsZone}</span>
            </div>
          </motion.div>

          {/* Corner glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-f1-green/5 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-f1-green/5 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DRSOverlay;
