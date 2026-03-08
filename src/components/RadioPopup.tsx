import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

const radioMessages = [
  { from: "Race Engineer", msg: "Branavan, good pace. P1 and pulling away. Keep it clean.", delay: 15000 },
  { from: "BRA", msg: "Copy. Tyres feeling good, plenty of grip left.", delay: 35000 },
  { from: "Race Engineer", msg: "DRS available in Zone 1. Deploy when ready.", delay: 55000 },
  { from: "BRA", msg: "This portfolio is looking quick today. Feeling confident.", delay: 80000 },
  { from: "Race Engineer", msg: "Box box box. New content set ready. Standby for pit entry.", delay: 100000 },
  { from: "BRA", msg: "In, in, in. Good stop, let's go.", delay: 115000 },
  { from: "Race Engineer", msg: "Great stop, 2.4 seconds. You're still P1. Push push push.", delay: 130000 },
  { from: "Strategist", msg: "Gap to P2 is 4.3 seconds. You have the undercut advantage.", delay: 150000 },
  { from: "BRA", msg: "Understood. Hammer time.", delay: 165000 },
  { from: "Race Engineer", msg: "Chequered flag. P1 Branavan, P1! Incredible drive. Well done.", delay: 185000 },
];

const RadioPopup = () => {
  const [current, setCurrent] = useState<{ from: string; msg: string } | null>(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const timers = radioMessages.map((r) =>
      setTimeout(() => { setCurrent({ from: r.from, msg: r.msg }); setTyped(""); }, r.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!current) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= current.msg.length) { setTyped(current.msg.slice(0, i)); i++; }
      else { clearInterval(interval); setTimeout(() => setCurrent(null), 4000); }
    }, 22);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-xs"
        >
          <div className="bg-card/95 backdrop-blur-md border border-border p-4 rounded-lg shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-primary uppercase">Team Radio</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[7px] text-muted-foreground/30">LIVE</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-display text-[10px] text-secondary font-bold shrink-0">{current.from}:</span>
              <p className="font-body text-sm text-foreground/80">
                {typed}
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 align-middle" />
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RadioPopup;
