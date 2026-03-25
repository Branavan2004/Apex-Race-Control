import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { RADIO_MESSAGES } from '../../data/radioMessages';

const RadioPopup = memo(function RadioPopup() {
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let timeout = 0;

    const schedule = () => {
      const delay = 25000 + Math.random() * 15000;
      timeout = window.setTimeout(() => {
        setVisible(true);
        setMessageIndex((current) => (current + 1) % RADIO_MESSAGES.length);

        window.setTimeout(() => {
          setVisible(false);
          schedule();
        }, 4000);
      }, delay);
    };

    const opener = window.setTimeout(() => {
      setVisible(true);
      window.setTimeout(() => {
        setVisible(false);
        schedule();
      }, 3500);
    }, 4000);

    return () => {
      window.clearTimeout(opener);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="overlay-radio glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
        >
          <span className="overlay-radio__label">TEAM RADIO</span>
          <p>{RADIO_MESSAGES[messageIndex]}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

export default RadioPopup;
