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
    <section className="relative min-h-screen flex flex-col items-center justify-center carbon-fiber telemetry-grid overflow-hidden">
      {/* Speed streaks */}
      {raceStarted && (
        <>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-f1-cyan to-transparent opacity-20 speed-streak"
              style={{
                top: `${20 + i * 20}%`,
                width: "40%",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-muted/50 backdrop-blur-sm border-b border-border flex items-center px-4 md:px-8 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${raceStarted ? "bg-f1-green" : "bg-f1-red"} animate-pulse-glow`} />
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            {raceStarted ? "Race Active" : "Formation Lap"}
          </span>
        </div>
        <div className="ml-auto font-mono text-xs text-f1-cyan">
          LAP TIME: <span className="text-foreground font-display">{formatTime(lapTime)}</span>
        </div>
      </div>

      {/* Start lights */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="flex flex-col items-center gap-8"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-sm tracking-[0.3em] text-muted-foreground uppercase">
              Lights Out and Away We Go
            </h2>
            <F1StartLights onComplete={handleLightsComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-8 px-4"
          >
            {/* Driver number */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <span className="font-display text-[120px] md:text-[180px] font-black text-primary/10 leading-none select-none">
                01
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground">
                  BRANAVAN
                </span>
              </div>
            </motion.div>

            {/* Driver card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border border-border bg-card/60 backdrop-blur-md p-6 md:p-8 max-w-lg w-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-1 h-12 bg-primary" />
                <div>
                  <p className="font-display text-xs tracking-widest text-primary uppercase">Driver #01</p>
                  <p className="font-display text-lg text-foreground">IIT Tech Racing</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-mono text-xs text-f1-cyan">P1</p>
                  <p className="font-body text-sm text-muted-foreground">Grid Position</p>
                </div>
              </div>
              <div className="h-px bg-border mb-4" />
              <p className="font-body text-lg text-foreground mb-1">Software Engineering Student</p>
              <p className="font-body text-muted-foreground">
                Building innovative technology for the future.
              </p>
            </motion.div>

            {/* Speedometer-style indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 text-center"
            >
              {[
                { label: "SPEED", value: "MAX", color: "text-f1-cyan" },
                { label: "SECTOR", value: "S1", color: "text-f1-green" },
                { label: "FLAG", value: "GREEN", color: "text-f1-green" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className={`font-display text-xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="font-body text-xs text-muted-foreground tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <span className="font-body text-xs text-muted-foreground tracking-widest uppercase">Scroll to Race</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-4 h-6 border border-muted-foreground/40 rounded-full flex items-start justify-center p-1"
              >
                <div className="w-1 h-1.5 bg-primary rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
