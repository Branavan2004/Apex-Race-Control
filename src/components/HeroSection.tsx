import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import F1StartLights from "./F1StartLights";
import Speedometer from "./Speedometer";

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
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-f1-cyan/[0.02] blur-[80px] translate-x-40" />
      </div>

      {/* Status bar */}
      <div className="absolute top-8 left-0 right-0 h-10 border-b border-border/50 flex items-center px-6 z-10">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${raceStarted ? "bg-f1-green" : "bg-primary"}`} />
          <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
            {raceStarted ? "Session Live" : "Standing Start"}
          </span>
        </div>
        {raceStarted && (
          <div className="ml-auto flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-body text-[9px] text-muted-foreground/30 tracking-wider uppercase">Lap Time</span>
              <span className="font-mono text-sm text-f1-cyan tabular-nums font-semibold">
                {formatTime(lapTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body text-[9px] text-muted-foreground/30 tracking-wider uppercase">Best</span>
              <span className="font-mono text-[11px] text-f1-purple tabular-nums">1:18.432</span>
            </div>
          </div>
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
            className="flex flex-col items-center px-6 max-w-4xl w-full"
          >
            <div className="flex flex-col md:flex-row items-center gap-12 w-full">
              {/* Speedometer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden md:block"
              >
                <Speedometer />
              </motion.div>

              {/* Name & info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center md:text-left flex-1"
              >
                <p className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase mb-4">
                  Driver 01
                </p>
                <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
                  Branavan
                </h1>
                <div className="w-12 h-0.5 bg-primary mx-auto md:mx-0 mb-6" />
                <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-md">
                  Software engineering student at IIT. I love building things that are fast,
                  elegant, and a little bit obsessive about the details — just like a good pit strategy.
                </p>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex gap-8 mt-8 justify-center md:justify-start"
                >
                  {[
                    { label: "Team", value: "IIT" },
                    { label: "Role", value: "Engineer" },
                    { label: "Base", value: "Sri Lanka" },
                    { label: "Season", value: "2026" },
                  ].map((s) => (
                    <div key={s.label} className="text-center md:text-left">
                      <p className="font-display text-sm font-semibold text-foreground">{s.value}</p>
                      <p className="font-body text-[10px] text-muted-foreground/50 tracking-widest uppercase">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center gap-3 mt-16"
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
