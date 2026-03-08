import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface F1StartLightsProps {
  onComplete: () => void;
}

const F1StartLights = ({ onComplete }: F1StartLightsProps) => {
  const [activeLights, setActiveLights] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);
  const [reactionTime, setReactionTime] = useState<string | null>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setActiveLights(i), i * 700));
    }
    const outTime = 5 * 700 + 800 + Math.random() * 600; // Slightly random lights out
    timers.push(
      setTimeout(() => {
        setLightsOut(true);
        setReactionTime("0.201");
        setTimeout(() => onComplete(), 800);
      }, outTime)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Lights housing */}
      <div className="flex gap-4 md:gap-5 bg-card/50 border border-border/50 px-6 py-4 rounded-lg backdrop-blur-sm">
        {[1, 2, 3, 4, 5].map((light) => (
          <div key={light} className="flex flex-col gap-1.5">
            {[0, 1].map((row) => (
              <motion.div
                key={row}
                className="w-7 h-7 md:w-10 md:h-10 rounded-full border border-border/50"
                animate={{
                  backgroundColor: lightsOut
                    ? "hsl(220 15% 14%)"
                    : activeLights >= light
                    ? "hsl(0 85% 52%)"
                    : "hsl(220 15% 14%)",
                  boxShadow: lightsOut
                    ? "none"
                    : activeLights >= light
                    ? "0 0 24px hsl(0 85% 52% / 0.7), 0 0 48px hsl(0 85% 52% / 0.3), inset 0 0 12px hsl(0 85% 52% / 0.4)"
                    : "inset 0 2px 4px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Light count indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2 h-0.5 rounded-full transition-all duration-200 ${
              activeLights >= i && !lightsOut ? "bg-primary" : lightsOut ? "bg-muted/20" : "bg-muted/20"
            }`}
          />
        ))}
      </div>

      {/* Reaction time (shown after lights out) */}
      {lightsOut && reactionTime && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2"
        >
          <span className="font-mono text-[9px] text-muted-foreground/40 tracking-wider uppercase">Reaction</span>
          <span className="font-mono text-sm text-f1-green font-bold tabular-nums">{reactionTime}s</span>
        </motion.div>
      )}
    </div>
  );
};

export default F1StartLights;
