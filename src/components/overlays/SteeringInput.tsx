import { memo, useMemo } from 'react';

import { useMousePosition } from '../../hooks/useMousePosition';

const SteeringInput = memo(function SteeringInput() {
  const mouse = useMousePosition();
  const opacity = useMemo(() => {
    const elapsed = performance.now() - mouse.movedAt;
    return elapsed < 500 ? 0.6 : 0.25;
  }, [mouse.movedAt]);

  return (
    <div
      className="overlay-steering"
      style={{
        transform: `translateX(-50%) rotate(${mouse.normalizedX * 15}deg)`,
        opacity,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="42" />
        <path d="M28 68 h64" />
        <path d="M38 40 c8 -14 36 -14 44 0" />
        <path d="M60 18 v18" />
        <path d="M60 72 v18" />
      </svg>
    </div>
  );
});

export default SteeringInput;
