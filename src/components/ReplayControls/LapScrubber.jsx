import './ReplayControls.css';

function LapScrubber({ currentLap, totalLaps, onLapChange, safetyCarPeriods }) {
  const safeTotal = totalLaps || 1;
  const fillWidth = ((currentLap - 1) / Math.max(1, safeTotal - 1)) * 100;
  const thumbLeft = `${((currentLap - 1) / Math.max(1, safeTotal - 1)) * 100}%`;
  const labels = [1, 25, 50, safeTotal].filter((value, index, array) => array.indexOf(value) === index && value <= safeTotal);

  return (
    <div className="replay__scrubberWrap">
      <div className="replay__tooltip" style={{ left: thumbLeft }}>LAP {currentLap}</div>
      <div className="replay__scrubberTrack">
        <div className="replay__scrubberFill" style={{ width: `${fillWidth}%` }} />
        {safetyCarPeriods.map((period) => (
          <span
            key={`${period.start}-${period.end}`}
            className="replay__scMarker"
            style={{ left: `${((period.start - 1) / safeTotal) * 100}%` }}
          />
        ))}
      </div>
      <input
        className="replay__scrubber"
        type="range"
        min="1"
        max={safeTotal}
        step="1"
        value={currentLap}
        onChange={(event) => onLapChange(Number(event.target.value))}
      />
      <div className="replay__ticks">
        {Array.from({ length: Math.floor(safeTotal / 5) + 1 }, (_, index) => {
          const lap = index * 5 || 1;
          return <span key={lap} className="replay__tick" style={{ left: `${((lap - 1) / Math.max(1, safeTotal - 1)) * 100}%` }} />;
        })}
      </div>
      <div className="replay__labels">
        {labels.map((label) => (
          <span key={label} style={{ left: `${((label - 1) / Math.max(1, safeTotal - 1)) * 100}%` }}>
            Lap {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LapScrubber;
