import { memo, useEffect, useState } from 'react';

const WeatherPanel = memo(function WeatherPanel() {
  const [trackTemp, setTrackTemp] = useState(42);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTrackTemp((current) => Math.max(41.5, Math.min(42.5, current + (Math.random() - 0.5) * 0.35)));
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="overlay-weather glass">
      <p>🌤 COLOMBO, LK</p>
      <div>
        <span>Track</span>
        <span>{`${trackTemp.toFixed(1)}°C Dry`}</span>
      </div>
      <div>
        <span>Wind</span>
        <span>12 km/h SW</span>
      </div>
      <div>
        <span>Humidity</span>
        <span>78%</span>
      </div>
    </div>
  );
});

export default WeatherPanel;
