import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  "DRS ENABLED — Zone Active",
  "FASTEST LAP — BRA 1:18.432",
  "TRACK TEMP 42°C — AIR 28°C — HUMIDITY 45%",
  "PIT WINDOW OPEN — Lap 18-24",
  "ERS DEPLOY — Full Power Mode",
  "TYRE STRATEGY — Soft → Medium → Hard",
  "SAFETY CAR — Track Clear",
  "SECTOR 1 — Personal Best",
  "WIND SPEED 12 km/h — DIRECTION NW",
  "GRID PENALTY — None Applied",
  "CHAMPIONSHIP PTS — 97/125",
  "POWER UNIT — Mode 8 Engaged",
  "BRAKE BIAS — 56.2% Front",
  "DIFF ENTRY — Setting 7",
  "MGU-K — Harvesting",
];

const BroadcastTicker = () => {
  const [visible, setVisible] = useState(false);
  const [lap, setLap] = useState(1);
  const [totalLaps] = useState(58);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => setLap((l) => (l >= totalLaps ? 1 : l + 1)), 8000);
    return () => clearInterval(i);
  }, [visible, totalLaps]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-8 bg-card/90 backdrop-blur-sm border-b border-border/40 overflow-hidden"
    >
      <div className="flex items-center h-full">
        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 h-full border-r border-border/30 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
          <span className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/50 uppercase">LIVE</span>
        </div>

        {/* Lap counter */}
        <div className="flex items-center gap-1.5 px-3 h-full border-r border-border/30 shrink-0">
          <span className="font-mono text-[8px] text-muted-foreground/40 tracking-wider">LAP</span>
          <span className="font-mono text-[10px] text-foreground/70 font-bold tabular-nums">{lap}</span>
          <span className="font-mono text-[8px] text-muted-foreground/30">/{totalLaps}</span>
        </div>

        {/* Flag status */}
        <div className="flex items-center gap-1.5 px-3 h-full border-r border-border/30 shrink-0 bg-f1-green/5">
          <div className="w-3 h-2 bg-f1-green rounded-sm" />
          <span className="font-mono text-[8px] text-f1-green/70 tracking-wider">GREEN</span>
        </div>

        {/* Scrolling messages */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...messages, ...messages].map((msg, i) => (
              <span key={i} className="font-mono text-[10px] text-muted-foreground/60 tracking-wide">
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BroadcastTicker;
