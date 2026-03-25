import { memo } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const ERSBar = () => {
  const { progress } = useScrollVelocity();
  const height = `${Math.max(0, Math.min(100, progress * 100))}%`;

  return (
    <div className="pointer-events-none fixed right-6 top-[56%] z-[56] hidden xl:flex -translate-y-1/2 flex-col items-center gap-2">
      <span className="font-data text-[9px] uppercase tracking-[0.25em] text-[var(--f1-muted)]">ERS</span>
      <div className="relative h-[120px] w-[8px] overflow-hidden rounded-full bg-white/8">
        <div
          className={`absolute bottom-0 left-0 right-0 rounded-full ${progress > 0.98 ? "animate-data-flash" : ""}`}
          style={{ height, background: "linear-gradient(180deg, var(--f1-purple), var(--f1-cyan))" }}
        />
      </div>
    </div>
  );
};

export default memo(ERSBar);
