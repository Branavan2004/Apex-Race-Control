import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RADIO_MESSAGES } from "@/data/siteData";

const RadioPopup = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let showTimeout = 0;
    let hideTimeout = 0;

    const schedule = () => {
      const delay = 25000 + Math.random() * 15000;
      showTimeout = window.setTimeout(() => {
        const nextMessage = RADIO_MESSAGES[index % RADIO_MESSAGES.length];
        setMessage(nextMessage);
        setIndex((current) => current + 1);
        hideTimeout = window.setTimeout(() => {
          setMessage(null);
          schedule();
        }, 4000);
      }, delay);
    };

    schedule();
    return () => {
      window.clearTimeout(showTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, [index]);

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          className="pointer-events-none fixed bottom-12 right-5 z-[67] hidden max-w-[320px] md:block"
        >
          <div className="rounded-[18px] border-l-4 border-[var(--f1-red)] bg-black/70 p-4 backdrop-blur-md">
            <p className="font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-red)]">Team Radio</p>
            <p className="mt-2 font-body text-sm italic leading-6 text-white/85">{message}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default memo(RadioPopup);
