import { memo, useEffect, useMemo, useState } from 'react';

type Row = {
  position: string;
  code: string;
  gap: string;
};

const baseRows: Row[] = [
  { position: 'P1', code: 'BRN', gap: 'LEADER' },
  { position: 'P2', code: 'HAM', gap: '+0.347' },
  { position: 'P3', code: 'VER', gap: '+1.203' },
  { position: 'P4', code: 'NOR', gap: '+2.891' },
  { position: 'P5', code: 'LEC', gap: '+4.112' },
];

const TimingTower = memo(function TimingTower() {
  const [rows, setRows] = useState(baseRows);
  const initial = useMemo(() => baseRows, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRows((current) =>
        current.map((row, index) => {
          if (index === 0) {
            return row;
          }

          const value = parseFloat(row.gap.replace('+', ''));
          const drift = Math.max(0.1, value + (Math.random() * 0.16 - 0.05));
          return { ...row, gap: `+${drift.toFixed(3)}` };
        }),
      );
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="overlay-timing glass">
      <div className="overlay-timing__header">TIMING</div>
      {rows.map((row, index) => (
        <div
          key={`${row.position}-${row.code}-${initial[index]?.code ?? index}`}
          className={`overlay-timing__row ${index === 0 ? 'is-leading' : ''}`}
        >
          <span>{row.position}</span>
          <strong>{row.code}</strong>
          <span>{row.gap}</span>
        </div>
      ))}
    </div>
  );
});

export default TimingTower;
