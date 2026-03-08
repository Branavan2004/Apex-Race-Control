import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

const radioMessages = [
  { from: "Engineer", msg: "Good pace, Branavan. Keep pushing.", delay: 15000 },
  { from: "Branavan", msg: "Copy. Tires feeling good.", delay: 35000 },
  { from: "Engineer", msg: "DRS available. Use it wisely.", delay: 55000 },
  { from: "Branavan", msg: "This portfolio is looking quick today.", delay: 80000 },
  { from: "Engineer", msg: "Box box box. Fresh content incoming.", delay: 100000 },
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
      else { clearInterval(interval); setTimeout(() => setCurrent(null), 3000); }
    }, 25);
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
