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
      timers.push(setTimeout(() => setActiveLights(i), i * 800));
    }
    timers.push(
      setTimeout(() => {
        setLightsOut(true);
        onComplete();
      }, 5 * 800 + 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex gap-4 md:gap-6">
      {[1, 2, 3, 4, 5].map((light) => (
        <div key={light} className="flex flex-col gap-2">
          {[0, 1].map((row) => (
            <motion.div
              key={row}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-muted-foreground/30"
              animate={{
                backgroundColor:
                  lightsOut
                    ? "hsl(0 0% 15%)"
                    : activeLights >= light
                    ? "hsl(0 80% 50%)"
                    : "hsl(0 0% 15%)",
                boxShadow:
                  lightsOut
                    ? "none"
                    : activeLights >= light
                    ? "0 0 20px hsl(0 80% 50% / 0.8), 0 0 40px hsl(0 80% 50% / 0.4)"
                    : "none",
              }}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default F1StartLights;
