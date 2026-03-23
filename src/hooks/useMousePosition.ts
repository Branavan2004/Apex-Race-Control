import { useEffect, useState } from "react";

export const useMousePosition = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY, active: true });
    };

    const handleLeave = () => {
      setMouse((current) => ({ ...current, active: false }));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return mouse;
};
