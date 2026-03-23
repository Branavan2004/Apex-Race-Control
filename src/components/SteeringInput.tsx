import { memo } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const SteeringInput = () => {
  const { x, active } = useMousePosition();
  const center = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const angle = center ? ((x - center) / center) * 15 : 0;

  return (
    <div className={`pointer-events-none fixed bottom-12 left-1/2 z-[57] hidden -translate-x-1/2 xl:block ${active ? "opacity-60" : "opacity-25"}`}>
      <svg viewBox="0 0 100 100" className="h-[60px] w-[60px]" style={{ transform: `rotate(${angle}deg)`, transition: "transform 0.3s ease" }}>
        <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="4" />
        <circle cx="50" cy="50" r="10" fill="rgba(232,0,45,0.4)" />
        <path d="M26 50 H40 M60 50 H74 M50 20 V36" stroke="rgba(255,255,255,0.58)" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default memo(SteeringInput);
