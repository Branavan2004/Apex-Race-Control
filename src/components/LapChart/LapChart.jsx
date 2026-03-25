import { useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Customized, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { TOP_DRIVERS_VISIBLE } from '../../lib/constants';
import { formatShortLapTime } from '../../lib/formatters';
import ChartTooltip from './ChartTooltip';
import DriverToggle from './DriverToggle';
import './LapChart.css';

function FastestLapDot({ cx, cy, stroke }) {
  return (
    <polygon
      points={`${cx},${cy - 6} ${cx + 2},${cy - 1} ${cx + 7},${cy - 1} ${cx + 3},${cy + 2} ${cx + 4},${cy + 7} ${cx},${cy + 4} ${cx - 4},${cy + 7} ${cx - 3},${cy + 2} ${cx - 7},${cy - 1} ${cx - 2},${cy - 1}`}
      fill="var(--color-purple)"
      stroke={stroke}
      strokeWidth="1"
    />
  );
}

function SafetyCarBands({ xAxisMap, yAxisMap, offset, safetyCarPeriods }) {
  const xAxis = Object.values(xAxisMap)[0];
  const yAxis = Object.values(yAxisMap)[0];
  if (!xAxis || !yAxis) {
    return null;
  }

  return (
    <g>
      {safetyCarPeriods.map((period) => {
        const x = xAxis.scale(period.start);
        const width = xAxis.scale(period.end + 1) - x;
        return (
          <rect
            key={`${period.start}-${period.end}`}
            x={offset.left + x}
            y={offset.top}
            width={width}
            height={offset.height}
            fill="rgba(255,215,0,0.08)"
          />
        );
      })}
      <rect
        x={offset.left}
        y={offset.top}
        width={offset.width}
        height={offset.height}
        fill="none"
        stroke={yAxis.axisLine?.stroke || 'transparent'}
      />
    </g>
  );
}

function LapChart({ session, chartData, drivers, standingsByLap, safetyCarPeriods }) {
  const [enabledDrivers, setEnabledDrivers] = useState(drivers.slice(0, TOP_DRIVERS_VISIBLE).map((driver) => driver.code));

  useEffect(() => {
    setEnabledDrivers(drivers.slice(0, TOP_DRIVERS_VISIBLE).map((driver) => driver.code));
  }, [drivers]);
  const driversByCode = useMemo(() => Object.fromEntries(drivers.map((driver) => [driver.code, driver])), [drivers]);
  const selectedDrivers = drivers.filter((driver) => enabledDrivers.includes(driver.code));
  const visibleTimes = chartData.flatMap((lap) => enabledDrivers.map((code) => lap[code]).filter(Boolean));
  const domain = visibleTimes.length
    ? [Math.max(...visibleTimes) + 2, Math.min(...visibleTimes) - 1]
    : ['auto', 'auto'];

  return (
    <section className="lapChart">
      <div className="lapChart__header">
        <div className="section-title">Lap Pace History</div>
        <span className="lapChart__meta">{session?.raceName} pace traces</span>
      </div>
      <DriverToggle
        drivers={drivers}
        enabledDrivers={enabledDrivers}
        onToggle={(code) => setEnabledDrivers((current) => (
          current.includes(code)
            ? current.filter((entry) => entry !== code)
            : [...current, code]
        ))}
        onShowAll={() => setEnabledDrivers(drivers.map((driver) => driver.code))}
        onHideAll={() => setEnabledDrivers([])}
      />
      <div className="lapChart__canvas">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <Customized component={(props) => <SafetyCarBands {...props} safetyCarPeriods={safetyCarPeriods} />} />
            <XAxis
              dataKey="lap"
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => (value % 5 === 0 || value === 1 || value === session?.totalLaps ? value : '')}
              label={{ value: 'LAP', position: 'insideBottomRight', offset: -8, fill: 'var(--text-muted)' }}
            />
            <YAxis
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              domain={domain}
              tickFormatter={formatShortLapTime}
            />
            <Tooltip content={<ChartTooltip driversByCode={driversByCode} standingsByLap={standingsByLap} />} />
            {selectedDrivers.flatMap((driver) => driver.pitStops.map((lap) => (
              <ReferenceLine
                key={`${driver.code}-${lap}`}
                x={lap}
                stroke={driver.teamColor}
                strokeDasharray="3 3"
                strokeOpacity={0.6}
              />
            )))}
            {selectedDrivers.map((driver) => (
              <Line
                key={driver.code}
                type="monotone"
                dataKey={driver.code}
                stroke={driver.teamColor}
                strokeWidth={2}
                dot={(props) => (driver.bestLap?.lap === props.payload.lap ? <FastestLapDot {...props} /> : null)}
                activeDot={{ r: 4, stroke: driver.teamColor, strokeWidth: 2, fill: 'var(--bg-card)' }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default LapChart;
