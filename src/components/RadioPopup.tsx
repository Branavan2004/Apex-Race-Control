import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

const radioMessages = [
  { from: "Engineer", msg: "Good pace, Branavan. Keep pushing.", delay: 18000 },
  { from: "BRA", msg: "Copy. Feeling confident.", delay: 40000 },
  { from: "Engineer", msg: "DRS available. Deploy when ready.", delay: 65000 },
  { from: "BRA", msg: "This portfolio is looking quick today.", delay: 90000 },
  { from: "Engineer", msg: "Box box box. Fresh content ready.", delay: 120000 },
  { from: "Engineer", msg: "Great stop. You're still P1. Push push push.", delay: 145000 },
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
      else { clearInterval(interval); setTimeout(() => setCurrent(null), 3500); }
    }, 25);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50 max-w-xs"
        >
          <div className="glass rounded-xl p-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-3 h-3 text-primary/50 animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.2em] text-primary/40 uppercase">Team Radio</span>
            </div>
            <div className="flex gap-2">
              <span className="font-display text-[10px] text-secondary/60 font-bold shrink-0">{current.from}:</span>
              <p className="font-body text-sm text-foreground/65">
                {typed}
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-0.5 h-3.5 bg-primary/50 ml-0.5 align-middle" />
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RadioPopup;
