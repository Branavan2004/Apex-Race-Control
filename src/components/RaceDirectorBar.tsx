import { memo, useEffect, useState } from "react";
import { DIRECTOR_MESSAGES } from "@/data/siteData";

const RaceDirectorBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % DIRECTOR_MESSAGES.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-7 border-b border-white/8 bg-black/70 px-4 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
        <span className="font-data text-[10px] uppercase tracking-[0.3em] text-[var(--f1-red)]">FIA Race Control</span>
        <span className="truncate font-data text-[10px] uppercase tracking-[0.15em] text-[var(--f1-white)]/70">
          {DIRECTOR_MESSAGES[index]}
        </span>
      </div>
    </div>
  );
};

export default memo(RaceDirectorBar);
