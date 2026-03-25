import { memo, useEffect, useMemo, useState } from "react";
import { TIMING_TOWER } from "@/data/siteData";

const TimingTower = () => {
  const baseRows = useMemo(() => TIMING_TOWER.map((row) => ({ ...row })), []);
  const [rows, setRows] = useState(baseRows);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRows((current) =>
        current.map((row, index) => {
          if (index === 0) return row;
          const currentGap = Number.parseFloat(row.gap.replace("+", ""));
          const nextGap = Math.max(0.15, currentGap + (Math.random() - 0.45) * 0.18);
          return { ...row, gap: `+${nextGap.toFixed(3)}` };
        }),
      );
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed left-6 top-[20%] z-[55] hidden w-[180px] xl:block">
      <div className="hud-panel rounded-[20px] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-data text-[11px] uppercase tracking-[0.3em] text-[var(--f1-red)]">Timing</span>
          <span className="font-data text-[9px] uppercase tracking-[0.18em] text-[var(--f1-muted)]">Live</span>
        </div>
        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.code}
              className={`grid grid-cols-[32px,1fr,60px] items-center rounded-lg px-2 py-2 font-data text-[11px] ${
                row.pos === "P1" ? "bg-[var(--f1-gold)]/10 pulse-glow" : "bg-white/3"
              }`}
            >
              <span style={{ color: row.color }}>{row.pos}</span>
              <span className={`${row.pos === "P1" ? "text-[var(--f1-gold)]" : "text-white/90"}`}>{row.code}</span>
              <span className="text-right text-white/70">{row.gap}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TimingTower);
