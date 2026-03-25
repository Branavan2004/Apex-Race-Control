import { memo, useEffect, useRef } from 'react';

import { useMousePosition } from '../../hooks/useMousePosition';

const CursorTrail = memo(function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef(Array.from({ length: 10 }, () => ({ x: 0, y: 0 })));
  const mouseRef = useRef({ x: 0, y: 0, interactive: false });
  const mouse = useMousePosition();

  useEffect(() => {
    mouseRef.current = { x: mouse.x, y: mouse.y, interactive: mouse.interactive };
  }, [mouse.interactive, mouse.x, mouse.y]);

  useEffect(() => {
    const trail = trailRef.current;

    if (!trail) {
      return undefined;
    }

    const nodes = Array.from(trail.querySelectorAll<HTMLElement>('[data-dot]'));
    let frame = 0;

    const tick = () => {
      pointsRef.current[0].x += (mouseRef.current.x - pointsRef.current[0].x) * 0.18;
      pointsRef.current[0].y += (mouseRef.current.y - pointsRef.current[0].y) * 0.18;

      for (let index = 1; index < pointsRef.current.length; index += 1) {
        pointsRef.current[index].x += (pointsRef.current[index - 1].x - pointsRef.current[index].x) * 0.22;
        pointsRef.current[index].y += (pointsRef.current[index - 1].y - pointsRef.current[index].y) * 0.22;
      }

      nodes.forEach((node, index) => {
        const point = pointsRef.current[index];
        const scale = mouseRef.current.interactive ? 1.5 - index * 0.05 : 1 - index * 0.03;
        node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${Math.max(scale, 0.3)})`;
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={trailRef} className="overlay-cursor" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          data-dot
          style={{
            opacity: 0.55 - index * 0.05,
            background: `linear-gradient(135deg, rgba(232,0,45,${0.7 - index * 0.05}), rgba(0,210,255,${0.6 - index * 0.04}))`,
          }}
        />
      ))}
    </div>
  );
});

export default CursorTrail;
