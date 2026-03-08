import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const messages = [
  "Track clear. Green flag conditions.",
  "DRS detection point active.",
  "Virtual Safety Car ending.",
  "Pit lane speed limit 80 km/h.",
  "Blue flags shown to backmarkers.",
];

const RaceDirectorBar = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 18000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let idx = 0;
    const showNext = () => {
      setMessage(messages[idx % messages.length]);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
      idx++;
    };
    showNext();
    const i = setInterval(showNext, 25000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-40 hidden md:block"
    >
      <div className="h-6 bg-card/50 backdrop-blur-md border-t border-border/15 flex items-center px-4 gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <Shield className="w-2.5 h-2.5 text-f1-blue/30" />
          <span className="font-mono text-[7px] tracking-[0.2em] text-muted-foreground/20 uppercase">Race Control</span>
        </div>
        <div className="w-px h-3 bg-border/15" />
        <div className="flex-1 overflow-hidden">
          {showMessage && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[8px] text-muted-foreground/30 tracking-wide"
            >
              {message}
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <div className="w-1 h-1 rounded-full bg-f1-green/40 animate-pulse" />
          <span className="font-mono text-[7px] text-muted-foreground/20">CLEAR</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RaceDirectorBar;
