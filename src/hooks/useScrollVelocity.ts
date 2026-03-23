import { useEffect, useState } from "react";

export const useScrollVelocity = () => {
  const [metrics, setMetrics] = useState({ progress: 0, velocity: 0, direction: 1 });

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();

    const updateMetrics = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(16, now - lastT);
      const delta = currentY - lastY;
      const velocity = Math.abs(delta / dt) * 1000;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? currentY / total : 0;

      setMetrics({
        progress,
        velocity,
        direction: delta >= 0 ? 1 : -1,
      });

      lastY = currentY;
      lastT = now;
    };

    updateMetrics();
    window.addEventListener("scroll", updateMetrics, { passive: true });
    window.addEventListener("resize", updateMetrics);

    return () => {
      window.removeEventListener("scroll", updateMetrics);
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

  return metrics;
};
