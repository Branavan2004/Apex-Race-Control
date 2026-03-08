import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);

  useEffect(() => {
    let lastScroll = 0;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const rawSpeed = Math.abs(window.scrollY - lastScroll) / dt * 1000;
        const mappedSpeed = Math.min(Math.round(rawSpeed * 0.4), 350);
        setSpeed(mappedSpeed);
        setGear(mappedSpeed < 50 ? 1 : mappedSpeed < 100 ? 2 : mappedSpeed < 150 ? 3 : mappedSpeed < 200 ? 4 : mappedSpeed < 270 ? 5 : mappedSpeed < 320 ? 6 : 7);
      }
      lastScroll = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const needleAngle = -135 + (speed / 350) * 270;

  return (
    <div className="relative w-44 h-44">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer ring */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(0 0% 15%)" strokeWidth="2" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(0 0% 10%)" strokeWidth="1" />

        {/* Speed arc background */}
        <path
          d="M 30 150 A 80 80 0 1 1 170 150"
          fill="none"
          stroke="hsl(0 0% 15%)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Speed arc filled */}
        <motion.path
          d="M 30 150 A 80 80 0 1 1 170 150"
          fill="none"
          stroke="url(#speedGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="440"
          animate={{ strokeDashoffset: 440 - (speed / 350) * 440 }}
          transition={{ duration: 0.3 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(145 100% 45%)" />
            <stop offset="50%" stopColor="hsl(186 100% 50%)" />
            <stop offset="80%" stopColor="hsl(48 100% 50%)" />
            <stop offset="100%" stopColor="hsl(1 97% 44%)" />
          </linearGradient>
        </defs>

        {/* Tick marks */}
        {[...Array(8)].map((_, i) => {
          const angle = -135 + i * (270 / 7);
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 76 * Math.cos(rad);
          const y1 = 100 + 76 * Math.sin(rad);
          const x2 = 100 + 85 * Math.cos(rad);
          const y2 = 100 + 85 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(0 0% 40%)" strokeWidth="1" />
          );
        })}

        {/* Needle */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="hsl(1 97% 44%)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ rotate: needleAngle }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Center dot */}
        <circle cx="100" cy="100" r="5" fill="hsl(1 97% 44%)" />
        <circle cx="100" cy="100" r="3" fill="hsl(0 0% 4%)" />
      </svg>

      {/* Digital readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <motion.span
          className="font-display text-2xl font-black text-foreground tabular-nums"
          key={speed}
        >
          {speed}
        </motion.span>
        <span className="font-body text-[8px] text-muted-foreground/40 tracking-[0.3em] uppercase">KM/H</span>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-body text-[8px] text-muted-foreground/30 tracking-wider uppercase">Gear</span>
          <span className="font-display text-sm font-bold text-f1-cyan tabular-nums">{gear}</span>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
