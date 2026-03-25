import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export function useScrollVelocity() {
  const { scrollY, scrollYProgress } = useScroll();
  const last = useRef({ time: 0, value: 0 });
  const [velocity, setVelocity] = useState(0);
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setProgress(value);
  });

  useMotionValueEvent(scrollY, 'change', (value) => {
    const now = performance.now();

    if (last.current.time === 0) {
      last.current = { time: now, value };
      return;
    }

    const deltaTime = Math.max(now - last.current.time, 16);
    const rawVelocity = ((value - last.current.value) / deltaTime) * 1000;

    setVelocity((current) => current * 0.72 + rawVelocity * 0.28);
    last.current = { time: now, value };
  });

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      setVelocity((current) => current * 0.94);
      frame = window.setTimeout(tick, 80);
    };

    frame = window.setTimeout(tick, 80);

    return () => window.clearTimeout(frame);
  }, []);

  return { progress, velocity };
}
