import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DRSOverlay = () => {
  const [drsActive, setDrsActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollRef = { current: 0 };

  useEffect(() => {
    let lastScroll = 0;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const speed = Math.abs(window.scrollY - lastScroll) / dt * 1000;
        setScrollSpeed(speed);
        setDrsActive(speed > 800);
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
        <>
          {/* DRS banner */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-50 origin-center"
          >
            <div className="bg-f1-green/90 px-8 py-1.5 flex items-center gap-3">
              <span className="font-display text-[10px] tracking-[0.4em] text-background font-bold uppercase">
                DRS Enabled
              </span>
              <motion.div
                animate={{ scaleX: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="w-4 h-0.5 bg-background/60"
              />
            </div>
          </motion.div>

          {/* Side streaks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 pointer-events-none"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-f1-green/30 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-f1-green/30 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DRSOverlay;
