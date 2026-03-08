import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import F1StartLights from "./F1StartLights";

const HeroSection = () => {
  const [raceStarted, setRaceStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [counter, setCounter] = useState(0);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const [sectorTimes] = useState(["28.432", "32.117", "18.883"]);
  const lastMouse = useRef({ x: 0, y: 0, t: Date.now() });

  const handleLightsComplete = useCallback(() => {
    setRaceStarted(true);
    setTimeout(() => setShowContent(true), 500);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const interval = setInterval(() => setCounter((c) => c + 1), 50);
    return () => clearInterval(interval);
  }, [showContent]);

  // Mouse velocity → speed + gear
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastMouse.current.t;
      if (dt > 0) {
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt * 100;
        setMouseSpeed((prev) => prev * 0.7 + Math.min(speed, 350) * 0.3);
      }
      lastMouse.current = { x: e.clientX, y: e.clientY, t: now };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const g = mouseSpeed < 20 ? 1 : mouseSpeed < 60 ? 2 : mouseSpeed < 100 ? 3 : mouseSpeed < 160 ? 4 : mouseSpeed < 220 ? 5 : mouseSpeed < 280 ? 6 : 7;
    setGear(g);
  }, [mouseSpeed]);

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

      {/* Diagonal accent lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: showContent ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent origin-top hidden md:block"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: showContent ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute right-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/10 to-transparent origin-bottom hidden md:block"
      />

      {/* Start lights */}
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

      {/* Main content */}
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

              {/* Right */}
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

                {/* Speedometer driven by mouse */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-card border border-border p-4 mt-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/40 uppercase">
                      Move your mouse to rev
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
                      <span className="font-mono text-[8px] text-f1-green">LIVE</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-6">
                    <div>
                      <span className="font-display text-5xl font-black text-foreground tabular-nums">
                        {Math.round(mouseSpeed)}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground ml-1">km/h</span>
                    </div>
                    <div className="flex items-center gap-1.5 pb-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                        <div
                          key={g}
                          className={`w-5 h-7 rounded-sm flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-100 ${
                            g === gear
                              ? "bg-primary text-primary-foreground scale-110"
                              : g < gear
                              ? "bg-muted/50 text-muted-foreground/30"
                              : "bg-muted/20 text-muted-foreground/15"
                          }`}
                        >
                          {g}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* RPM visualization */}
                  <div className="flex gap-0.5 mt-3 h-2">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const pct = (i / 30) * 100;
                      const filled = (mouseSpeed / 350) * 100 > pct;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-all duration-75 ${
                            filled
                              ? i >= 25 ? "bg-primary" : i >= 20 ? "bg-f1-yellow" : "bg-f1-green/70"
                              : "bg-muted/20"
                          }`}
                        />
                      );
                    })}
                  </div>
                </motion.div>

                {/* Sector times */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="grid grid-cols-3 gap-2"
                >
                  {sectorTimes.map((time, i) => (
                    <div key={i} className="bg-card/50 border border-border/50 p-3 text-center">
                      <span className="font-mono text-[8px] text-muted-foreground/40 tracking-wider block">S{i + 1}</span>
                      <span className={`font-mono text-sm tabular-nums font-bold ${
                        i === 0 ? "text-f1-purple" : i === 1 ? "text-f1-yellow" : "text-f1-green"
                      }`}>{time}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Race timer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center gap-3 pt-4 border-t border-border"
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
