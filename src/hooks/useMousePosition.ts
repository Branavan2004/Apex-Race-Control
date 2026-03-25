import { useEffect, useRef, useState } from 'react';

type MouseState = {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  active: boolean;
  interactive: boolean;
  movedAt: number;
};

export function useMousePosition(): MouseState {
  const idleTimerRef = useRef(0);
  const [state, setState] = useState<MouseState>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    active: false,
    interactive: false,
    movedAt: 0,
  });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const target = event.target as HTMLElement | null;

      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        setState((current) => ({ ...current, active: false, interactive: false }));
      }, 140);

      setState({
        x: event.clientX,
        y: event.clientY,
        normalizedX: (event.clientX / width) * 2 - 1,
        normalizedY: (event.clientY / height) * 2 - 1,
        active: true,
        interactive: Boolean(target?.closest('a, button, [data-interactive="true"]')),
        movedAt: performance.now(),
      });
    };

    const handleLeave = () => {
      setState((current) => ({ ...current, active: false, interactive: false }));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return state;
}
