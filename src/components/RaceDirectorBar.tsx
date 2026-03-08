import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, Shield, AlertTriangle } from "lucide-react";

const RaceDirectorBar = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const directorMessages = [
    "RACE DIRECTOR: Track clear. Green flag conditions.",
    "RACE DIRECTOR: DRS detection point active — Zone 1.",
    "RACE DIRECTOR: Virtual Safety Car ending. Resume racing.",
    "RACE DIRECTOR: Track limits warning — Turn 4.",
    "RACE DIRECTOR: Pit lane speed limit 80 km/h enforced.",
    "RACE DIRECTOR: Blue flags shown to backmarkers.",
    "RACE DIRECTOR: 10-second time penalty under investigation.",
    "RACE DIRECTOR: Safety car deployed — debris on track.",
    "RACE DIRECTOR: Race will resume at end of this lap.",
    "RACE DIRECTOR: Chequered flag in 5 laps.",
  ];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 15000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let idx = 0;
    const showNext = () => {
      setMessage(directorMessages[idx % directorMessages.length]);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
      idx++;
    };
    showNext();
    const i = setInterval(showNext, 20000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-40 hidden md:block"
    >
      <div className="h-7 bg-card/80 backdrop-blur-sm border-t border-border/30 flex items-center px-4 gap-4">
        {/* Race director icon */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Shield className="w-3 h-3 text-f1-blue/60" />
          <span className="font-mono text-[7px] tracking-[0.2em] text-muted-foreground/30 uppercase">Race Control</span>
        </div>
        
        <div className="w-px h-3.5 bg-border/30" />

        {/* Director message */}
        <div className="flex-1 overflow-hidden">
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <AlertTriangle className="w-3 h-3 text-f1-yellow/60 shrink-0" />
              <span className="font-mono text-[9px] text-muted-foreground/50 tracking-wide truncate">
                {message}
              </span>
            </motion.div>
          )}
        </div>

        <div className="w-px h-3.5 bg-border/30" />

        {/* Status indicators */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-f1-green/50" />
            <span className="font-mono text-[7px] text-f1-green/50">COMMS OK</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse" />
            <span className="font-mono text-[7px] text-muted-foreground/30">TRACK STATUS: CLEAR</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RaceDirectorBar;
