import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DRSOverlay = () => {
  const [drsActive, setDrsActive] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const speed = Math.abs(window.scrollY - lastScroll) / dt * 1000;
        setDrsActive(speed > 900);
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
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-f1-green/40 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-f1-green/40 to-transparent" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 origin-center bg-f1-green/90 px-6 py-1 rounded"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-background font-bold uppercase">DRS</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DRSOverlay;
