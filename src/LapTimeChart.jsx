import React, { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TEAM_COLORS } from './lib/teamColors.js';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds - minutes * 60;
  return `${minutes}:${remainder.toFixed(3).padStart(6, '0')}`;
}

function FastestDot(props) {
  const { cx, cy, payload, dataKey } = props;
  if (!payload || !payload.fastestLapDriver || payload.fastestLapDriver !== dataKey) return null;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <polygon
        points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2"
        fill="var(--accent-purple)"
      />
    </g>
  );
}

export default function LapTimeChart({
  replay,
  selectedDrivers,
  loading,
}) {
  const chartState = useMemo(() => {
    if (!replay?.laps?.length) return { data: [], drivers: [], pitStops: {} };

    const drivers = replay.results
      .filter((result) => selectedDrivers.includes(result.Driver.driverId))
      .map((result) => result.Driver);

    const pitStops = {};
    replay.frames?.forEach((frame) => {
      frame.entries.forEach((entry) => {
        if (!selectedDrivers.includes(entry.driverId)) return;
        if (!pitStops[entry.driverId]) pitStops[entry.driverId] = [];
        if (entry.pitStops.includes(Number(frame.number))) {
          pitStops[entry.driverId].push(Number(frame.number));
        }
      });
    });

    const fastestLap = replay.frames
      ?.flatMap((frame) =>
        frame.entries
          .filter((entry) => selectedDrivers.includes(entry.driverId))
          .map((entry) => ({ lap: Number(frame.number), driverId: entry.driverId, value: entry.lapSeconds })),
      )
      .sort((left, right) => left.value - right.value)[0];

    const data = replay.laps.map((lap) => {
      const row = { lap: Number(lap.number) };
      selectedDrivers.forEach((driverId) => {
        const timing = lap.Timings?.find((entry) => entry.driverId === driverId);
        row[driverId] = timing ? Number(timing.time.split(':')[0]) * 60 + Number(timing.time.split(':')[1]) : null;
      });
      if (fastestLap?.lap === Number(lap.number)) {
        row.fastestLapDriver = fastestLap.driverId;
      }
      return row;
    });

    return { data, drivers, pitStops };
  }, [replay, selectedDrivers]);

  if (loading) {
    return <div className="chart-skeleton" />;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="chart-tooltip">
        <strong>Lap {label}</strong>
        {payload.map((entry) => (
          <div key={entry.dataKey} className="chart-tooltip__row">
            <span className="chart-tooltip__color" style={{ background: entry.color }} />
            <span>{entry.name}</span>
            <span>{entry.value ? formatTime(entry.value) : '--'}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="lap-chart">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartState.data}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          {replay.safetyCarWindows?.map(([start, end]) => (
            <ReferenceArea key={`${start}-${end}`} x1={start} x2={end} fill="rgba(255,215,0,0.1)" />
          ))}
          {Object.entries(chartState.pitStops).flatMap(([driverId, laps]) =>
            laps.map((lap) => (
              <ReferenceLine
                key={`${driverId}-${lap}`}
                x={lap}
                stroke={TEAM_COLORS[replay.results.find((result) => result.Driver.driverId === driverId)?.Constructor.constructorId] || '#888'}
                strokeDasharray="3 5"
              />
            )),
          )}
          <XAxis dataKey="lap" stroke="var(--text-secondary)" />
          <YAxis reversed stroke="var(--text-secondary)" tickFormatter={(value) => `${value.toFixed(1)}s`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {chartState.drivers.map((driver) => {
            const teamId = replay.results.find((result) => result.Driver.driverId === driver.driverId)?.Constructor.constructorId;
            return (
              <Line
                key={driver.driverId}
                name={driver.code}
                type="monotone"
                dataKey={driver.driverId}
                stroke={TEAM_COLORS[teamId] || '#fff'}
                strokeWidth={2.2}
                dot={<FastestDot dataKey={driver.driverId} />}
                activeDot={{ r: 4 }}
                connectNulls
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
