import React, { memo } from 'react';
import clsx from 'clsx';
import { List } from 'react-window';
import { motion } from 'framer-motion';
import { COMPOUND_COLORS, TEAM_COLORS } from './lib/teamColors.js';

function getPositionTone(position) {
  if (position === 1) return 'gold';
  if (position === 2) return 'silver';
  if (position === 3) return 'bronze';
  return '';
}

const DriverRow = memo(function DriverRow({
  driver,
  index,
  style,
  onDriverClick,
  onDriverHover,
  selectedDriverId,
  selectedChartDrivers,
}) {
  const code = driver.driverInfo?.code || 'DRV';
  const color = TEAM_COLORS[driver.constructor?.constructorId] || '#8890aa';
  const isSelected = selectedDriverId === driver.driverId;
  const isCharted = selectedChartDrivers.includes(driver.driverId);

  return (
    <motion.button
      layout
      type="button"
      className={clsx(
        'leaderboard-driver',
        driver.finishedInPoints && 'is-points',
        driver.status === 'DNF' && 'is-dnf',
        isSelected && 'is-selected',
        isCharted && 'is-charted',
      )}
      style={{ ...style, '--team-color': color }}
      onClick={() => onDriverClick(driver.driverId)}
      onMouseEnter={() => onDriverHover(driver.driverId)}
      onMouseLeave={() => onDriverHover(null)}
      transition={{ duration: 0.22 }}
    >
      <span className={clsx('leaderboard-driver__pos', getPositionTone(Number(driver.position)))}>
        {driver.position}
      </span>
      <div className="leaderboard-driver__main">
        <strong>{code}</strong>
        <span>{driver.gapToLeader}</span>
      </div>
      <div className="leaderboard-driver__lap">
        <span>{driver.time}</span>
        <span>{driver.telemetry?.speed || '--'} km/h</span>
      </div>
      <span className="leaderboard-driver__compound" style={{ background: COMPOUND_COLORS[driver.compound] }}>
        {driver.compound}
      </span>
      <span className={clsx('leaderboard-driver__fastest', driver.isFastestLap && 'is-active')}>
        ⚡
      </span>
    </motion.button>
  );
});

export default function Leaderboard({
  standings = [],
  isPlaying,
  onDriverClick,
  onDriverHover,
  selectedDriverId,
  selectedChartDrivers,
  loading,
}) {
  const classified = standings.filter((driver) => driver.status !== 'DNF');
  const dnfs = standings.filter((driver) => driver.status === 'DNF');
  const allRows = [...classified, ...dnfs];

  return (
    <section className="leaderboard">
      <div className="leaderboard__header">
        <div className="leaderboard__title">
          <span className={clsx('live-dot', isPlaying && 'is-playing')} />
          <h3>RACE STANDINGS</h3>
        </div>
      </div>

      {loading ? (
        <div className="leaderboard-skeletons">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="skeleton-row" />
          ))}
        </div>
      ) : allRows.length > 20 ? (
        <List
          className="leaderboard__list"
          style={{ height: 560 }}
          rowCount={allRows.length}
          rowHeight={48}
          rowProps={{ allRows, onDriverClick, onDriverHover, selectedDriverId, selectedChartDrivers }}
          rowComponent={({ index, style, allRows: rows, ...rest }) => (
            <DriverRow driver={rows[index]} index={index} style={style} {...rest} />
          )}
        />
      ) : (
        <div className="leaderboard__list">
          {allRows.map((driver, index) => (
            <DriverRow
              key={driver.driverId}
              driver={driver}
              index={index}
              onDriverClick={onDriverClick}
              onDriverHover={onDriverHover}
              selectedDriverId={selectedDriverId}
              selectedChartDrivers={selectedChartDrivers}
            />
          ))}
        </div>
      )}
    </section>
  );
}
