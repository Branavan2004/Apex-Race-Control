import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets } from "lucide-react";

const WeatherPanel = () => {
  const [visible, setVisible] = useState(false);
  const [trackTemp, setTrackTemp] = useState(42);
  const [humidity, setHumidity] = useState(45);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      setTrackTemp((v) => Math.round(v + (Math.random() - 0.5) * 2));
      setHumidity((v) => Math.max(30, Math.min(70, Math.round(v + (Math.random() - 0.5) * 3))));
    }, 4000);
    return () => clearInterval(i);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 z-40 hidden lg:block"
    >
      <div className="bg-card/90 backdrop-blur-sm border border-border p-3 rounded-lg">
        <span className="font-mono text-[7px] tracking-[0.3em] text-muted-foreground/40 uppercase block mb-2">Conditions</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3 h-3 text-muted-foreground/30" />
            <span className="font-mono text-[10px] text-foreground/70 tabular-nums">{trackTemp}°C</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3 h-3 text-muted-foreground/30" />
            <span className="font-mono text-[10px] text-foreground/70 tabular-nums">{humidity}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherPanel;
