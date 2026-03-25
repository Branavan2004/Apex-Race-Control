import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type DRSOverlayProps = {
  visible: boolean;
  sectionName: string;
  sectionIndex: number;
};

const DRSOverlay = memo(function DRSOverlay({
  visible,
  sectionName,
  sectionIndex,
}: DRSOverlayProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="overlay-drs"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45 }}
        >
          <span className="overlay-drs__line" />
          <div>
            <strong>DRS ENABLED</strong>
            <p>{`SECTOR ${sectionIndex + 1} — ${sectionName.toUpperCase()}`}</p>
          </div>
          <span className="overlay-drs__line" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

export default DRSOverlay;
