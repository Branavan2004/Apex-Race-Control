import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";
import { useEffect, useState } from "react";

const LiveTelemetry = () => {
  const [rpm, setRpm] = useState(8400);
  const [speed, setSpeed] = useState(312);
  const [gear, setGear] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(8000 + Math.random() * 4000);
      setSpeed(Math.floor(280 + Math.random() * 50));
      setGear(Math.floor(5 + Math.random() * 4));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const rpmPercent = ((rpm - 6000) / 6000) * 100;

  return (
    <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
      <SectorHeader
        sector="Sector 5"
        title="Telemetry"
        subtitle="A little live dashboard — because what's an F1 portfolio without one?"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border/50 bg-card/30 p-6 md:p-8"
      >
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-f1-green" />
          <span className="font-display text-[9px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            Live Session
          </span>
        </div>

        {/* Main readings */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <span className="font-display text-3xl md:text-4xl font-bold text-foreground tabular-nums">
              {Math.floor(rpm)}
            </span>
            <p className="font-body text-[10px] text-muted-foreground/40 tracking-widest uppercase mt-1">RPM</p>
          </div>
          <div>
            <span className="font-display text-3xl md:text-4xl font-bold text-f1-cyan tabular-nums">
              {speed}
            </span>
            <p className="font-body text-[10px] text-muted-foreground/40 tracking-widest uppercase mt-1">KM/H</p>
          </div>
          <div>
            <span className="font-display text-3xl md:text-4xl font-bold text-foreground tabular-nums">
              {gear}
            </span>
            <p className="font-body text-[10px] text-muted-foreground/40 tracking-widest uppercase mt-1">GEAR</p>
          </div>
        </div>

        {/* RPM bar — simple, clean */}
        <div className="mb-6">
          <div className="flex items-center gap-1 h-3">
            {Array.from({ length: 24 }).map((_, i) => {
              const filled = (i / 24) * 100 < rpmPercent;
              return (
                <div
                  key={i}
                  className={`flex-1 h-full rounded-[1px] transition-all duration-200 ${
                    filled
                      ? i >= 20
                        ? "bg-primary"
                        : i >= 16
                        ? "bg-f1-yellow"
                        : "bg-f1-green/70"
                      : "bg-muted/30"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Throttle trace — just one clean line */}
        <div className="h-16 border border-border/30 bg-background/30 overflow-hidden relative">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 60">
            <path
              d="M0,45 L25,42 L50,30 L75,35 L100,20 L125,25 L150,15 L175,18 L200,10 L225,22 L250,18 L275,25 L300,12 L325,20 L350,8 L375,15 L400,12"
              fill="none"
              stroke="hsl(var(--f1-cyan))"
              strokeWidth="1.5"
              opacity="0.5"
            />
          </svg>
          <span className="absolute bottom-1 right-2 font-display text-[8px] text-muted-foreground/20">
            THROTTLE
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default LiveTelemetry;
