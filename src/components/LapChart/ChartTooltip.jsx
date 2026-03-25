import { formatLapTime } from '../../lib/formatters';

function ChartTooltip({ active, payload, label, driversByCode, standingsByLap }) {
  if (!active || !payload?.length) {
    return null;
  }

  const standings = standingsByLap.find((entry) => entry.lap === label)?.standings || [];
  const positions = Object.fromEntries(standings.map((item) => [item.driver, item.position]));

  return (
    <div className="lapChart__tooltip">
      <div className="lapChart__tooltipTitle">LAP {label}</div>
      {payload.map((entry) => (
        <div className="lapChart__tooltipRow" key={entry.dataKey}>
          <span className="lapChart__tooltipDriver">
            <span className="lapChart__tooltipDot" style={{ background: entry.color }} />
            {entry.dataKey}
          </span>
          <span>P{positions[entry.dataKey]}</span>
          <span>{formatLapTime(entry.value)}</span>
          <span>{driversByCode[entry.dataKey]?.team}</span>
        </div>
      ))}
    </div>
  );
}

export default ChartTooltip;
