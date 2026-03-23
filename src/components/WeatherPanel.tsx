import { memo, useEffect, useState } from "react";

const WeatherPanel = () => {
  const [trackTemp, setTrackTemp] = useState(42);
  const [humidity, setHumidity] = useState(78);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTrackTemp((current) => Number((current + (Math.random() - 0.5) * 0.6).toFixed(1)));
      setHumidity((current) => Number((current + (Math.random() - 0.5) * 0.8).toFixed(1)));
    }, 2500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed right-5 top-28 z-[58] hidden xl:block">
      <div className="hud-panel w-[150px] rounded-[18px] p-3">
        <p className="font-data text-[10px] uppercase tracking-[0.24em] text-white/90">🌤 COLOMBO, LK</p>
        <div className="mt-2 space-y-1 font-data text-[10px] text-[var(--f1-white)]/75">
          <div className="flex justify-between"><span>Track</span><span>{trackTemp.toFixed(1)}°C Dry</span></div>
          <div className="flex justify-between"><span>Wind</span><span>12 km/h SW</span></div>
          <div className="flex justify-between"><span>Humidity</span><span>{humidity.toFixed(1)}%</span></div>
        </div>
      </div>
    </div>
  );
};

export default memo(WeatherPanel);
