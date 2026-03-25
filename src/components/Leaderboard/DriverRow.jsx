import { motion } from 'framer-motion';

import GapDisplay from './GapDisplay';
import './Leaderboard.css';

function DriverRow({ driver, previousPosition, onSelect, selected }) {
  const positionChange = typeof previousPosition === 'number'
    ? previousPosition - driver.position
    : 0;

  const positionClass = positionChange > 0
    ? 'leaderboard__row--gain'
    : positionChange < 0
      ? 'leaderboard__row--loss'
      : '';

  return (
    <motion.button
      type="button"
      layout
      className={`leaderboard__row ${positionClass} ${selected ? 'leaderboard__row--selected' : ''} ${typeof driver.position === 'number' && driver.position <= 10 ? 'leaderboard__row--points' : ''} ${driver.dnf ? 'leaderboard__row--dnf' : ''}`}
      onClick={() => onSelect(driver.code)}
      style={{
        '--team-color': driver.teamColor,
        backgroundImage: `linear-gradient(90deg, ${driver.teamColor}0D 0%, transparent 45%)`,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <span className={`leaderboard__position leaderboard__position--${driver.position}`}>
        {driver.dnf ? 'DNF' : driver.position}
      </span>
      <span className="leaderboard__teamBar" />
      <span className={`leaderboard__code ${driver.dnf ? 'leaderboard__code--dnf' : ''}`}>{driver.code}</span>
      <span className={`leaderboard__gap ${driver.position === 1 ? 'leaderboard__gap--leader' : ''}`}>
        <GapDisplay gapSeconds={driver.gapSeconds} lapsBehind={driver.lapsBehind} />
      </span>
      <span className={`leaderboard__lastLap ${driver.fastestLap ? 'leaderboard__lastLap--fastest' : ''}`}>
        {driver.lastLap}
      </span>
      <span className={`leaderboard__tire leaderboard__tire--${driver.tire}`}>{driver.tire}</span>
      <span className="leaderboard__fastestBadge">{driver.fastestLap ? '⚡' : ''}</span>
    </motion.button>
  );
}

export default DriverRow;
