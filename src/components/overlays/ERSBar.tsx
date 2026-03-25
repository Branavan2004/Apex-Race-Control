import { memo } from 'react';

type ERSBarProps = {
  progress: number;
};

const ERSBar = memo(function ERSBar({ progress }: ERSBarProps) {
  return (
    <div className={`overlay-ers ${progress > 0.98 ? 'is-flashing' : ''}`}>
      <span>ERS</span>
      <div className="overlay-ers__track">
        <div className="overlay-ers__fill" style={{ height: `${progress * 100}%` }} />
      </div>
    </div>
  );
});

export default ERSBar;
