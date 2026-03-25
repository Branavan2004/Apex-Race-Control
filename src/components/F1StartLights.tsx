import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface F1StartLightsProps {
  onComplete: () => void;
}

const F1StartLights = ({ onComplete }: F1StartLightsProps) => {
  const [activeLights, setActiveLights] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    for (let index = 1; index <= 5; index += 1) {
      timers.push(window.setTimeout(() => setActiveLights(index), 800 + index * 300));
    }
    timers.push(
      window.setTimeout(() => {
        setLightsOut(true);
        onComplete();
      }, 800 + 5 * 300 + 2500),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onComplete]);

  return (
    <div className="glass rounded-full px-5 py-4">
      <div className="flex gap-3 md:gap-4">
        {[1, 2, 3, 4, 5].map((light) => (
          <motion.div
            key={light}
            className="h-6 w-6 rounded-full border border-white/10 bg-white/5 md:h-7 md:w-7"
            animate={{
              backgroundColor: lightsOut
                ? "rgba(20,20,24,0.65)"
                : activeLights >= light
                  ? "rgba(232,0,45,1)"
                  : "rgba(35,35,42,0.85)",
              boxShadow: activeLights >= light && !lightsOut ? "0 0 24px rgba(232,0,45,0.7)" : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default F1StartLights;
