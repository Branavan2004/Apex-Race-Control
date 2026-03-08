import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import F1StartLights from "./F1StartLights";

const HeroSection = () => {
  const [raceStarted, setRaceStarted] = useState(false);
  const [lapTime, setLapTime] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [speedValue, setSpeedValue] = useState(0);

  const handleLightsComplete = useCallback(() => {
    setRaceStarted(true);
    setTimeout(() => setShowContent(true), 400);
  }, []);

  useEffect(() => {
    if (!raceStarted) return;
    const interval = setInterval(() => setLapTime((t) => t + 10), 10);
    return () => clearInterval(interval);
  }, [raceStarted]);

  // Speed ramp up animation
  useEffect(() => {
    if (!raceStarted) return;
    let current = 0;
    const target = 342;
    const interval = setInterval(() => {
      current += 3;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setSpeedValue(current);
    }, 20);
    return () => clearInterval(interval);
  }, [raceStarted]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${mins}:${secs.toString().padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
  };

  // SVG speedometer
  const speedAngle = (speedValue / 400) * 240 - 120; // -120 to +120

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-8">
      {/* Radial glow behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Horizontal scan line */}
      {raceStarted && (
        <motion.div
          className="absolute left-0 right-0 h-px bg-f1-cyan/20"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Top bar */}
      <div className="absolute top-8 left-0 right-0 h-12 bg-card/50 backdrop-blur-sm border-b border-border flex items-center px-4 md:px-8 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${raceStarted ? "bg-f1-green" : "bg-f1-red"} animate-pulse-glow`} />
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            {raceStarted ? "Race Active" : "Formation Lap"}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <div className="font-mono text-xs text-f1-cyan">
            LAP <span className="text-foreground font-display">{formatTime(lapTime)}</span>
          </div>
          {raceStarted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display text-xs text-f1-green"
            >
              {speedValue} KM/H
            </motion.div>
          )}
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
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((g) => (
                <div key={g} className="w-6 h-8 border border-border bg-card/40 flex items-center justify-center">
                  <span className="font-display text-[10px] text-muted-foreground">{g}</span>
                </div>
              ))}
              <span className="font-body text-[10px] text-muted-foreground self-center ml-2">GRID</span>
            </div>
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
            className="flex flex-col items-center gap-6 px-4 max-w-4xl w-full"
          >
            {/* Driver number & name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative text-center"
            >
              <span className="font-display text-[120px] md:text-[200px] font-black text-primary/8 leading-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                01
              </span>
              <div className="relative">
                <span className="font-display text-5xl md:text-8xl font-black tracking-tight text-foreground">
                  BRANAVAN
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </div>
            </motion.div>

            {/* Driver card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border border-border bg-card/60 backdrop-blur-md p-6 md:p-8 max-w-xl w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-f1-cyan to-primary" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-1 h-12 bg-primary" />
                <div>
                  <p className="font-display text-xs tracking-widest text-primary uppercase">Driver #01 — IIT Tech Racing</p>
                  <p className="font-display text-lg text-foreground">Software Engineering Student</p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <div className="bg-f1-green/10 border border-f1-green/30 px-2 py-0.5">
                    <span className="font-display text-[10px] text-f1-green">P1</span>
                  </div>
                  <span className="font-body text-[10px] text-muted-foreground">Grid Position</span>
                </div>
              </div>
              <div className="h-px bg-border mb-4" />
              <p className="font-body text-lg text-muted-foreground">
                Building innovative technology for the future.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { label: "SPEED", value: `${speedValue}`, unit: "KM/H", color: "text-f1-cyan" },
                { label: "SECTOR", value: "S1", unit: "", color: "text-f1-green" },
                { label: "FLAG", value: "GREEN", unit: "", color: "text-f1-green" },
                { label: "TIRE", value: "SOFT", unit: "", color: "text-primary" },
                { label: "DRS", value: "ON", unit: "", color: "text-f1-green" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border bg-card/40 px-4 py-2 flex flex-col items-center min-w-[80px]"
                >
                  <span className={`font-display text-lg font-bold ${stat.color}`}>
                    {stat.value}
                    {stat.unit && <span className="text-[10px] text-muted-foreground ml-1">{stat.unit}</span>}
                  </span>
                  <span className="font-body text-[10px] text-muted-foreground tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Speedometer gauge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="w-40 h-20 relative"
            >
              <svg viewBox="0 0 200 110" className="w-full h-full">
                {/* Gauge background arc */}
                <path
                  d="M 20,100 A 80,80 0 0,1 180,100"
                  fill="none"
                  stroke="hsl(0 0% 15%)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Gauge filled arc */}
                <path
                  d="M 20,100 A 80,80 0 0,1 180,100"
                  fill="none"
                  stroke="url(#speedGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="252"
                  strokeDashoffset={252 - (speedValue / 400) * 252}
                  style={{ transition: "stroke-dashoffset 0.3s" }}
                />
                {/* Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2={100 + 60 * Math.cos(((speedAngle - 90) * Math.PI) / 180)}
                  y2={100 + 60 * Math.sin(((speedAngle - 90) * Math.PI) / 180)}
                  stroke="hsl(1 97% 44%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ transition: "all 0.3s", filter: "drop-shadow(0 0 4px hsl(1 97% 44% / 0.6))" }}
                />
                <circle cx="100" cy="100" r="4" fill="hsl(1 97% 44%)" />
                <defs>
                  <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(145 100% 45%)" />
                    <stop offset="60%" stopColor="hsl(48 100% 50%)" />
                    <stop offset="100%" stopColor="hsl(1 97% 44%)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-4 flex flex-col items-center gap-2"
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
