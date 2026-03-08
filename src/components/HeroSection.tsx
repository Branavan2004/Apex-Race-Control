import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import F1StartLights from "./F1StartLights";

const stats = [
  { label: "Projects Delivered", value: "12+", detail: "Full-stack applications" },
  { label: "Technologies", value: "20+", detail: "Languages & frameworks" },
  { label: "Years Active", value: "3+", detail: "Professional development" },
  { label: "Lines of Code", value: "50K+", detail: "Production-grade code" },
];

const HeroSection = () => {
  const [raceStarted, setRaceStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [counter, setCounter] = useState(0);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [gear, setGear] = useState(1);
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
                      Software Engineer · Portfolio
                    </span>
                  </div>
                  <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-foreground leading-[0.9] tracking-tight">
                    BRA
                    <br />
                    <span className="text-primary">NA</span>
                    <br />
                    VAN
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-body text-base text-muted-foreground mt-6 max-w-md leading-relaxed"
                  >
                    Full-stack software engineer specializing in scalable web applications, 
                    system architecture, and high-performance user interfaces. Currently pursuing 
                    a degree in Software Engineering at the Informatics Institute of Technology, Sri Lanka.
                  </motion.p>
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
                    <p className="font-display text-sm font-semibold text-foreground">BSc (Hons) Software Engineering</p>
                    <p className="font-body text-xs text-muted-foreground">IIT Sri Lanka · Affiliated with University of Westminster, UK</p>
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
                {/* Key stats grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="bg-card border border-border p-4 hover:border-primary/30 transition-colors"
                    >
                      <span className="font-display text-2xl font-black text-primary tabular-nums">{stat.value}</span>
                      <p className="font-display text-xs font-semibold text-foreground mt-1">{stat.label}</p>
                      <p className="font-mono text-[8px] text-muted-foreground/50 mt-0.5">{stat.detail}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Speedometer driven by mouse */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="bg-card border border-border p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/40 uppercase">
                      Interactive · Move cursor to rev
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

                {/* Session status */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex items-center gap-3 pt-4 border-t border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse" />
                  <span className="font-mono text-xs text-muted-foreground">Available for opportunities</span>
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
              transition={{ delay: 2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[9px] text-muted-foreground/40 tracking-[0.4em] uppercase">Explore Portfolio</span>
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
