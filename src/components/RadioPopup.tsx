import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

const radioMessages = [
  { from: "Engineer", msg: "Good pace, Branavan. Keep pushing.", delay: 15000 },
  { from: "Branavan", msg: "Copy. Tires feeling good, let's go long.", delay: 30000 },
  { from: "Engineer", msg: "DRS available next lap. Use it wisely.", delay: 50000 },
  { from: "Branavan", msg: "This portfolio is looking quick today.", delay: 70000 },
  { from: "Engineer", msg: "Box box box. Time for fresh content.", delay: 95000 },
  { from: "Branavan", msg: "Understood. Great strategy call.", delay: 115000 },
];

const RadioPopup = () => {
  const [currentMsg, setCurrentMsg] = useState<{ from: string; msg: string } | null>(null);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const timers = radioMessages.map((radio) =>
      setTimeout(() => {
        setCurrentMsg({ from: radio.from, msg: radio.msg });
        setTypedText("");
      }, radio.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!currentMsg) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= currentMsg.msg.length) {
        setTypedText(currentMsg.msg.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentMsg(null), 3000);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentMsg]);

  return (
    <AnimatePresence>
      {currentMsg && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-card/95 backdrop-blur-md border border-border/50 p-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-3.5 h-3.5 text-f1-cyan animate-pulse" />
              <span className="font-display text-[9px] tracking-[0.3em] text-f1-cyan uppercase">
                Team Radio
              </span>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                    className="w-0.5 h-3 bg-f1-cyan/60 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="flex gap-2">
              <span className="font-display text-[10px] text-primary font-bold shrink-0">
                {currentMsg.from}:
              </span>
              <p className="font-body text-sm text-foreground/80">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="inline-block w-0.5 h-3.5 bg-f1-cyan ml-0.5 align-middle"
                />
              </p>
            </div>

            {/* Audio waveform */}
            <div className="flex items-center gap-px mt-3 h-4 overflow-hidden">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.2, Math.random() * 0.8 + 0.2, 0.2] }}
                  transition={{ repeat: Infinity, duration: 0.3 + Math.random() * 0.4, delay: i * 0.02 }}
                  className="flex-1 bg-f1-cyan/30 rounded-full"
                  style={{ height: "100%", transformOrigin: "bottom" }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RadioPopup;
