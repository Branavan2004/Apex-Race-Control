import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  { type: "DRS", text: "DRS ENABLED — Zone 1 Active" },
  { type: "FASTEST", text: "FASTEST LAP — BRA 1:18.432" },
  { type: "FLAG", text: "GREEN FLAG — Track Clear" },
  { type: "RADIO", text: "TEAM RADIO — Box, box, box!" },
  { type: "WEATHER", text: "TRACK TEMP 42°C — AIR TEMP 28°C — HUMIDITY 45%" },
  { type: "PIT", text: "PIT WINDOW OPEN — Lap 18-24 Optimal" },
  { type: "SAFETY", text: "VIRTUAL SAFETY CAR — Delta +2.4s" },
  { type: "TYRE", text: "TYRE LIFE — SOFT: 12 LAPS — MEDIUM: 28 LAPS — HARD: 40 LAPS" },
];

const BroadcastTicker = () => {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 9000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const msg = messages[msgIndex];

  const typeColors: Record<string, string> = {
    DRS: "bg-f1-green text-background",
    FASTEST: "bg-f1-purple text-white",
    FLAG: "bg-f1-green text-background",
    RADIO: "bg-f1-cyan text-background",
    WEATHER: "bg-muted text-foreground",
    PIT: "bg-f1-yellow text-background",
    SAFETY: "bg-f1-yellow text-background",
    TYRE: "bg-primary text-primary-foreground",
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-8 bg-card/95 backdrop-blur-sm border-b border-border/30"
    >
      {/* F1 logo area */}
      <div className="flex items-center gap-2 px-4 h-full border-r border-border/30">
        <div className="w-2 h-2 rounded-full bg-f1-green animate-pulse" />
        <span className="font-display text-[8px] tracking-[0.3em] text-muted-foreground/50 uppercase">LIVE</span>
      </div>

      {/* Message type badge */}
      <motion.div
        key={msgIndex}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-3 px-4"
      >
        <span className={`font-display text-[8px] tracking-[0.2em] px-2 py-0.5 ${typeColors[msg.type] || "bg-muted text-foreground"}`}>
          {msg.type}
        </span>
        <span className="font-body text-[11px] text-foreground/70 tracking-wide">
          {msg.text}
        </span>
      </motion.div>

      {/* Right side timing */}
      <div className="ml-auto flex items-center gap-4 px-4 h-full border-l border-border/30">
        <span className="font-mono text-[9px] text-muted-foreground/40 tabular-nums">
          S1 <span className="text-f1-green">28.432</span>
        </span>
        <span className="font-mono text-[9px] text-muted-foreground/40 tabular-nums">
          S2 <span className="text-f1-purple">31.891</span>
        </span>
        <span className="font-mono text-[9px] text-muted-foreground/40 tabular-nums">
          S3 <span className="text-f1-yellow">18.109</span>
        </span>
      </div>
    </motion.div>
  );
};

export default BroadcastTicker;
