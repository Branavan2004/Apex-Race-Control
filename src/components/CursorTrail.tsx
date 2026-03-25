import { memo, useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const CursorTrail = () => {
  const mouse = useMousePosition();
  const [trail, setTrail] = useState(
    Array.from({ length: 10 }, () => ({ x: 0, y: 0 })),
  );
  const trailRef = useRef(trail);

  useEffect(() => {
    trailRef.current = trail;
  }, [trail]);

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      const next = trailRef.current.map((point, index) => {
        const target = index === 0 ? mouse : trailRef.current[index - 1];
        return {
          x: point.x + (target.x - point.x) * (index === 0 ? 0.24 : 0.18),
          y: point.y + (target.y - point.y) * (index === 0 ? 0.24 : 0.18),
        };
      });
      trailRef.current = next;
      setTrail(next);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mouse]);

  if (!mouse.active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[65] hidden md:block">
      {trail.map((point, index) => {
        const size = 14 - index;
        const opacity = Math.max(0.08, 0.6 - index * 0.05);
        const color = index < trail.length / 2 ? "var(--f1-red)" : "var(--f1-cyan)";
        return (
          <span
            key={`${index}-${size}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              transform: `translate(${point.x - size / 2}px, ${point.y - size / 2}px)`,
              background: color,
              opacity,
              transition: "transform 0.08s linear",
              boxShadow: `0 0 14px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};

export default memo(CursorTrail);
