import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";
import { useEffect, useState } from "react";

const generateData = (points: number) =>
  Array.from({ length: points }, (_, i) => ({
    x: i,
    y: 30 + Math.sin(i * 0.3) * 20 + Math.random() * 15,
  }));

const LiveTelemetry = () => {
  const [rpm, setRpm] = useState(8400);
  const [throttle, setThrottle] = useState(87);
  const [brake, setBrake] = useState(0);
  const [speed, setSpeed] = useState(312);
  const [gear, setGear] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(8000 + Math.random() * 4000);
      setThrottle(Math.floor(70 + Math.random() * 30));
      setBrake(Math.floor(Math.random() * 15));
      setSpeed(Math.floor(280 + Math.random() * 50));
      setGear(Math.floor(5 + Math.random() * 4));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const rpmPercentage = ((rpm - 6000) / 6000) * 100;
  const throttleData = generateData(60);
  const brakeData = generateData(60);

  const toPath = (data: { x: number; y: number }[], height: number) => {
    return data
      .map((p, i) => `${i === 0 ? "M" : "L"} ${(p.x / 60) * 100}% ${((1 - p.y / height) * 100).toFixed(1)}%`)
      .join(" ");
  };

  return (
    <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
      <SectorHeader sector="Sector 5" title="LIVE TELEMETRY" subtitle="Real-time system diagnostics" />

      <div className="grid md:grid-cols-3 gap-4">
        {/* RPM Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-border bg-card/60 backdrop-blur-md p-6 col-span-1"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-f1-green animate-pulse-glow" />
            <span className="font-display text-[10px] tracking-widest text-f1-cyan uppercase">Engine RPM</span>
          </div>

          {/* RPM bar gauge */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-display text-3xl font-black text-foreground">{Math.floor(rpm)}</span>
              <span className="font-body text-sm text-muted-foreground self-end">/ 12000</span>
            </div>
            <div className="h-4 bg-muted rounded-sm overflow-hidden flex">
              {Array.from({ length: 20 }).map((_, i) => {
                const filled = (i / 20) * 100 < rpmPercentage;
                const isRed = i >= 16;
                const isYellow = i >= 13 && i < 16;
                return (
                  <div
                    key={i}
                    className={`flex-1 mx-px rounded-sm transition-colors duration-150 ${
                      filled
                        ? isRed
                          ? "bg-primary"
                          : isYellow
                          ? "bg-f1-yellow"
                          : "bg-f1-green"
                        : "bg-muted"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="border border-border p-3 bg-background/50">
              <span className="font-body text-[10px] text-muted-foreground block">GEAR</span>
              <span className="font-display text-2xl font-black text-foreground">{gear}</span>
            </div>
            <div className="border border-border p-3 bg-background/50">
              <span className="font-body text-[10px] text-muted-foreground block">SPEED</span>
              <span className="font-display text-2xl font-black text-f1-cyan">{speed}</span>
              <span className="font-body text-[10px] text-muted-foreground"> km/h</span>
            </div>
          </div>
        </motion.div>

        {/* Throttle & Brake Traces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="border border-border bg-card/60 backdrop-blur-md p-6 col-span-2"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-f1-green rounded-full" />
              <span className="font-display text-[10px] tracking-widest text-f1-green uppercase">Throttle {throttle}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-primary rounded-full" />
              <span className="font-display text-[10px] tracking-widest text-primary uppercase">Brake {brake}%</span>
            </div>
          </div>

          {/* Graph area */}
          <div className="relative h-40 border border-border bg-background/30 rounded-sm overflow-hidden">
            {/* Grid lines */}
            {[25, 50, 75].map((y) => (
              <div
                key={y}
                className="absolute w-full h-px bg-border/30"
                style={{ top: `${y}%` }}
              />
            ))}

            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
              {/* Throttle trace */}
              <motion.path
                d="M0,30 L7,25 L13,35 L20,20 L27,30 L33,15 L40,25 L47,10 L53,20 L60,15 L67,25 L73,12 L80,22 L87,18 L93,28 L100,14 L107,24 L113,19 L120,29 L127,16 L133,26 L140,11 L147,21 L153,17 L160,27 L167,13 L173,23 L180,18 L187,28 L193,15 L200,25 L210,20 L220,30 L230,15 L240,22 L250,18 L260,28 L270,12 L280,25 L290,19 L300,29 L310,14 L320,24 L330,17 L340,27 L350,13 L360,23 L370,18 L380,28 L390,15 L400,20"
                fill="none"
                stroke="hsl(145 100% 45%)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
              {/* Brake trace */}
              <motion.path
                d="M0,85 L7,88 L13,82 L20,90 L27,85 L33,92 L40,78 L47,88 L53,85 L60,90 L67,83 L73,88 L80,82 L87,90 L93,85 L100,88 L107,84 L113,90 L120,86 L127,82 L133,88 L140,85 L147,90 L153,83 L160,87 L167,85 L173,90 L180,84 L187,88 L193,86 L200,90 L210,85 L220,88 L230,84 L240,90 L250,86 L260,82 L270,88 L280,85 L290,90 L300,84 L310,88 L320,86 L330,90 L340,84 L350,88 L360,85 L370,90 L380,86 L390,88 L400,85"
                fill="none"
                stroke="hsl(1 97% 44%)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.3 }}
              />
            </svg>

            <div className="absolute bottom-1 right-2 font-display text-[9px] text-muted-foreground/50">REAL-TIME TRACE</div>
          </div>

          {/* System diagnostics */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[
              { label: "ERS", value: "98%", color: "text-f1-cyan" },
              { label: "BATTERY", value: "4.2 MJ", color: "text-f1-green" },
              { label: "FUEL FLOW", value: "96 kg/h", color: "text-f1-yellow" },
              { label: "TEMP", value: "108°C", color: "text-primary" },
            ].map((d) => (
              <div key={d.label} className="border border-border bg-background/50 p-2 text-center">
                <span className="font-body text-[9px] text-muted-foreground block">{d.label}</span>
                <span className={`font-display text-sm font-bold ${d.color}`}>{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveTelemetry;
