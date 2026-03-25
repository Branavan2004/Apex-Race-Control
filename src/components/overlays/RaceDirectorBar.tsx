import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { DIRECTOR_MESSAGES } from '../../data/radioMessages';

const RaceDirectorBar = memo(function RaceDirectorBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % DIRECTOR_MESSAGES.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="overlay-director">
      <span className="overlay-director__label">FIA RACE CONTROL</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45 }}
        >
          {DIRECTOR_MESSAGES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

export default RaceDirectorBar;
