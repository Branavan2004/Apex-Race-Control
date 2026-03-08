import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import F1StartLights from "./F1StartLights";

const HeroSection = () => {
  const [raceStarted, setRaceStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleLightsComplete = useCallback(() => {
    setRaceStarted(true);
    setTimeout(() => setShowContent(true), 500);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const interval = setInterval(() => setCounter((c) => c + 1), 50);
    return () => clearInterval(interval);
  }, [showContent]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Giant background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showContent ? 0.03 : 0, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="font-display text-[40vw] font-black text-foreground leading-none"
        >
          01
        </motion.span>
      </div>

      {/* Diagonal accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: showContent ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent origin-top hidden md:block"
      />

      {/* Start lights sequence */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="flex flex-col items-center gap-12"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs tracking-[0.5em] text-muted-foreground/40 uppercase"
            >
              Formation Lap Complete
            </motion.p>
            <F1StartLights onComplete={handleLightsComplete} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="font-body text-sm text-muted-foreground/30"
            >
              Lights out and away we go
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main hero content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
          >
            <div className="grid md:grid-cols-[1fr,1fr] gap-8 md:gap-16 items-center">
              {/* Left — big type */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-primary" />
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">
                      Driver #01
                    </span>
                  </div>
                  <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-foreground leading-[0.9] tracking-tight">
                    BRA
                    <br />
                    <span className="text-primary">NA</span>
                    <br />
                    VAN
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  className="mt-8 flex items-center gap-6"
                >
                  <div className="w-12 h-12 border-2 border-primary flex items-center justify-center">
                    <span className="font-display text-xl font-black text-primary">01</span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">Software Engineer</p>
                    <p className="font-body text-xs text-muted-foreground">IIT Sri Lanka · Season 2026</p>
                  </div>
                </motion.div>
              </div>

              {/* Right — info cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-4"
              >
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Building software with the precision of a race engineer. 
                  Every millisecond matters — in code and on track.
                </p>

                {/* Stat blocks */}
                <div className="grid grid-cols-3 gap-3 mt-8">
                  {[
                    { label: "Projects", value: "12+" },
                    { label: "Technologies", value: "15+" },
                    { label: "Podiums", value: "8" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="bg-card border border-border p-4"
                    >
                      <span className="font-display text-2xl font-black text-foreground">{stat.value}</span>
                      <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Race timer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center gap-3 mt-6 pt-6 border-t border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse" />
                  <span className="font-mono text-xs text-muted-foreground">Session Active</span>
                  <span className="font-mono text-sm text-f1-green ml-auto tabular-nums">
                    +{(counter * 0.05).toFixed(2)}s
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[9px] text-muted-foreground/40 tracking-[0.4em] uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
