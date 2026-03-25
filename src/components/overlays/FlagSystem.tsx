import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type FlagSystemProps = {
  progress: number;
};

const states = [
  { until: 0.15, icon: '🟢', label: 'GREEN FLAG' },
  { until: 0.35, icon: '🟡', label: 'YELLOW FLAG' },
  { until: 0.65, icon: '🟢', label: 'GREEN FLAG' },
  { until: 0.8, icon: '🔴', label: 'RED FLAG' },
  { until: 0.95, icon: '🏁', label: 'CHEQUERED' },
  { until: 1, icon: '🏁', label: 'FINISH' },
];

const FlagSystem = memo(function FlagSystem({ progress }: FlagSystemProps) {
  const state = states.find((entry) => progress <= entry.until) ?? states[states.length - 1];

  return (
    <div className="overlay-flag glass">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.label}
          className="overlay-flag__inner"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.8 }}
        >
          <span>{state.icon}</span>
          <strong>{state.label}</strong>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default FlagSystem;
