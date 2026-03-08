import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface F1StartLightsProps {
  onComplete: () => void;
}

const F1StartLights = ({ onComplete }: F1StartLightsProps) => {
  const [activeLights, setActiveLights] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setActiveLights(i), i * 700));
    }
    timers.push(
      setTimeout(() => {
        setLightsOut(true);
        onComplete();
      }, 5 * 700 + 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex gap-5">
      {[1, 2, 3, 4, 5].map((light) => (
        <div key={light} className="flex flex-col gap-1.5">
          {[0, 1].map((row) => (
            <motion.div
              key={row}
              className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-border"
              animate={{
                backgroundColor: lightsOut
                  ? "hsl(220 15% 14%)"
                  : activeLights >= light
                  ? "hsl(0 85% 52%)"
                  : "hsl(220 15% 14%)",
                boxShadow: lightsOut
                  ? "none"
                  : activeLights >= light
                  ? "0 0 24px hsl(0 85% 52% / 0.7), 0 0 48px hsl(0 85% 52% / 0.3)"
                  : "none",
              }}
              transition={{ duration: 0.12 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default F1StartLights;
