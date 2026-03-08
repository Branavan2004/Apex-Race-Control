import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, CloudRain } from "lucide-react";

const WeatherPanel = () => {
  const [visible, setVisible] = useState(false);
  const [trackTemp, setTrackTemp] = useState(42);
  const [airTemp, setAirTemp] = useState(28);
  const [humidity, setHumidity] = useState(45);
  const [windSpeed, setWindSpeed] = useState(12);
  const [rainChance, setRainChance] = useState(15);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      setTrackTemp((v) => Math.round(v + (Math.random() - 0.5) * 2));
      setAirTemp((v) => Math.round(v + (Math.random() - 0.5) * 1));
      setHumidity((v) => Math.max(30, Math.min(70, Math.round(v + (Math.random() - 0.5) * 3))));
      setWindSpeed((v) => Math.max(5, Math.min(25, Math.round(v + (Math.random() - 0.5) * 3))));
      setRainChance((v) => Math.max(0, Math.min(50, Math.round(v + (Math.random() - 0.5) * 5))));
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
      <div className="bg-card/90 backdrop-blur-sm border border-border p-3 rounded-lg w-44">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="font-mono text-[7px] tracking-[0.3em] text-muted-foreground/40 uppercase">Track Conditions</span>
          <div className="w-1 h-1 rounded-full bg-f1-green ml-auto" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3 h-3 text-primary/40" />
              <span className="font-mono text-[8px] text-muted-foreground/50">Track</span>
            </div>
            <span className="font-mono text-[10px] text-foreground/70 tabular-nums">{trackTemp}°C</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3 h-3 text-f1-blue/40" />
              <span className="font-mono text-[8px] text-muted-foreground/50">Air</span>
            </div>
            <span className="font-mono text-[10px] text-foreground/70 tabular-nums">{airTemp}°C</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3 h-3 text-f1-cyan/40" />
              <span className="font-mono text-[8px] text-muted-foreground/50">Humidity</span>
            </div>
            <span className="font-mono text-[10px] text-foreground/70 tabular-nums">{humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Wind className="w-3 h-3 text-muted-foreground/30" />
              <span className="font-mono text-[8px] text-muted-foreground/50">Wind</span>
            </div>
            <span className="font-mono text-[10px] text-foreground/70 tabular-nums">{windSpeed} km/h</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CloudRain className="w-3 h-3 text-f1-blue/40" />
              <span className="font-mono text-[8px] text-muted-foreground/50">Rain</span>
            </div>
            <span className={`font-mono text-[10px] tabular-nums ${rainChance > 30 ? "text-f1-blue" : "text-foreground/70"}`}>
              {rainChance}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherPanel;
