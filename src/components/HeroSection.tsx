import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import F1StartLights from "./F1StartLights";

const HeroSection = () => {
  const [raceStarted, setRaceStarted] = useState(false);
  const [lapTime, setLapTime] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const handleLightsComplete = useCallback(() => {
    setRaceStarted(true);
    setTimeout(() => setShowContent(true), 400);
  }, []);

  useEffect(() => {
    if (!raceStarted) return;
    const interval = setInterval(() => setLapTime((t) => t + 10), 10);
    return () => clearInterval(interval);
  }, [raceStarted]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${mins}:${secs.toString().padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 h-10 border-b border-border/50 flex items-center px-6 z-10">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${raceStarted ? "bg-f1-green" : "bg-primary"}`} />
          <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
            {raceStarted ? "Session Live" : "Standing Start"}
          </span>
        </div>
        {raceStarted && (
          <span className="ml-auto font-mono text-[11px] text-muted-foreground/50 tabular-nums">
            {formatTime(lapTime)}
          </span>
        )}
      </div>

      {/* Start lights */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="flex flex-col items-center gap-10"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm text-muted-foreground/50 tracking-[0.15em] uppercase">
              Lights out and away we go
            </p>
            <F1StartLights onComplete={handleLightsComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center px-6 max-w-2xl w-full"
          >
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-8"
            >
              <p className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase mb-4">
                Driver 01
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
                Branavan
              </h1>
              <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                Software engineering student at IIT. I love building things that are fast, 
                elegant, and a little bit obsessive about the details — just like a good pit strategy.
              </p>
            </motion.div>

            {/* Quick stats — minimal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-8 text-center mb-12"
            >
              {[
                { label: "Team", value: "IIT" },
                { label: "Role", value: "Engineer" },
                { label: "Base", value: "Sri Lanka" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-sm font-semibold text-foreground">{s.value}</p>
                  <p className="font-body text-[10px] text-muted-foreground/50 tracking-widest uppercase">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Scroll prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="font-body text-[11px] text-muted-foreground/40 tracking-widest uppercase">
                Start the lap
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-muted-foreground/30 to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
