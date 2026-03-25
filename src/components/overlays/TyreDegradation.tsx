import { memo } from 'react';

type TyreDegradationProps = {
  progress: number;
};

const tyres = [
  { label: 'Soft', color: 'var(--f1-red)' },
  { label: 'Medium', color: 'var(--f1-gold)' },
  { label: 'Hard', color: 'var(--f1-white)' },
  { label: 'Inter', color: 'var(--f1-green)' },
];

const TyreDegradation = memo(function TyreDegradation({ progress }: TyreDegradationProps) {
  const activeIndex = Math.min(tyres.length - 1, Math.floor(progress * tyres.length));

  return (
    <div className="overlay-tyres glass">
      <span>TYRE STATUS</span>
      {tyres.map((tyre, index) => {
        const depletion = Math.max(0.08, 1 - progress * (0.6 + index * 0.12));

        return (
          <div key={tyre.label} className={`overlay-tyres__row ${index === activeIndex ? 'is-active' : ''}`}>
            <div className="overlay-tyres__icon" style={{ borderColor: tyre.color }}>
              <span style={{ background: tyre.color }} />
            </div>
            <div className="overlay-tyres__bar">
              <div style={{ width: `${depletion * 100}%`, background: tyre.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default TyreDegradation;
