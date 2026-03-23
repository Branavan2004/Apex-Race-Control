import { memo } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const compounds = [
  { label: "Soft", color: "var(--f1-red)" },
  { label: "Medium", color: "var(--f1-yellow)" },
  { label: "Hard", color: "var(--f1-white)" },
  { label: "Inter", color: "var(--f1-green)" },
] as const;

const TyreDegradation = () => {
  const { progress } = useScrollVelocity();
  const activeIndex = Math.min(compounds.length - 1, Math.floor(progress * compounds.length));

  return (
    <div className="pointer-events-none fixed left-6 top-[52%] z-[54] hidden xl:block">
      <div className="hud-panel w-[180px] rounded-[20px] p-4">
        <p className="mb-3 font-data text-[9px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">Tyre Status</p>
        <div className="grid grid-cols-2 gap-3">
          {compounds.map((compound, index) => {
            const wear = Math.max(10, 100 - progress * 120 - index * 12);
            const isActive = index === activeIndex;
            return (
              <div key={compound.label} className="rounded-xl bg-white/4 p-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-5 w-5 rounded-full ${isActive ? "shadow-[0_0_10px_rgba(255,255,255,0.25)]" : ""}`}
                    style={{ background: compound.color }}
                  />
                  <span className="font-data text-[9px] uppercase tracking-[0.15em] text-white/80">{compound.label}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full" style={{ width: `${wear}%`, background: compound.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(TyreDegradation);
