import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Thermometer, Droplets, Wind } from "lucide-react";

const WeatherPanel = () => {
  const [visible, setVisible] = useState(false);
  const [trackTemp, setTrackTemp] = useState(42);
  const [airTemp, setAirTemp] = useState(28);
  const [humidity, setHumidity] = useState(45);
  const [wind, setWind] = useState(12);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setTrackTemp((v) => Math.round(v + (Math.random() - 0.5) * 2));
      setAirTemp((v) => Math.round(v + (Math.random() - 0.5)));
      setHumidity((v) => Math.max(30, Math.min(70, Math.round(v + (Math.random() - 0.5) * 3))));
      setWind((v) => Math.max(5, Math.min(25, Math.round(v + (Math.random() - 0.5) * 2))));
    }, 3000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 z-40 hidden lg:block"
    >
      <div className="bg-card/90 backdrop-blur-sm border border-border/50 p-3">
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="w-3 h-3 text-muted-foreground/50" />
          <span className="font-display text-[8px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            Track Conditions
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-f1-green ml-auto" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Thermometer, label: "Track", value: `${trackTemp}°C`, color: trackTemp > 45 ? "text-primary" : "text-f1-cyan" },
            { icon: Thermometer, label: "Air", value: `${airTemp}°C`, color: "text-foreground/70" },
            { icon: Droplets, label: "Humidity", value: `${humidity}%`, color: humidity > 60 ? "text-f1-cyan" : "text-foreground/70" },
            { icon: Wind, label: "Wind", value: `${wind} km/h`, color: wind > 18 ? "text-f1-yellow" : "text-foreground/70" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className="w-3 h-3 text-muted-foreground/30" />
              <div>
                <p className={`font-mono text-[11px] tabular-nums ${item.color}`}>{item.value}</p>
                <p className="font-body text-[7px] text-muted-foreground/30 tracking-wider uppercase">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rain probability bar */}
        <div className="mt-3 pt-2 border-t border-border/30">
          <div className="flex items-center justify-between mb-1">
            <span className="font-body text-[7px] text-muted-foreground/30 tracking-wider uppercase">Rain Probability</span>
            <span className="font-mono text-[9px] text-f1-green tabular-nums">5%</span>
          </div>
          <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
            <div className="h-full bg-f1-green/60 rounded-full" style={{ width: "5%" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherPanel;
