import { memo } from "react";
import { motion } from "framer-motion";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const flagStates = [
  { max: 0.15, icon: "🟢", label: "GREEN FLAG" },
  { max: 0.35, icon: "🟡", label: "YELLOW FLAG" },
  { max: 0.65, icon: "🟢", label: "GREEN FLAG" },
  { max: 0.8, icon: "🔴", label: "RED FLAG" },
  { max: 0.95, icon: "🏁", label: "CHEQUERED" },
  { max: 1, icon: "🏁", label: "CHEQUERED" },
];

const FlagSystem = () => {
  const { progress } = useScrollVelocity();
  const current = flagStates.find((state) => progress <= state.max) ?? flagStates[flagStates.length - 1];

  return (
    <motion.div
      key={current.label}
      initial={{ opacity: 0.3, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pointer-events-none fixed left-4 top-10 z-[62] flex h-[50px] w-[80px] items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-center backdrop-blur-md md:left-auto md:right-5"
    >
      <div>
        <div className="text-xl leading-none">{current.icon}</div>
        <p className="mt-1 font-data text-[9px] uppercase tracking-[0.2em] text-[var(--f1-white)]">{current.label}</p>
      </div>
    </motion.div>
  );
};

export default memo(FlagSystem);
