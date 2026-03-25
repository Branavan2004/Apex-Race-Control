import { AnimatePresence } from 'framer-motion';

import DriverRow from './DriverRow';
import './Leaderboard.css';

function Leaderboard({
  standings,
  previousStandings,
  fastestOverall,
  isPlaying,
  telemetryDriver,
  onSelectDriver,
  isRefreshing = false,
}) {
  const previousMap = Object.fromEntries(previousStandings.map((driver) => [driver.driver, driver.position]));

  return (
    <section className="leaderboard">
      <header className="leaderboard__header">
        <div className="section-title">Race Standings</div>
        <div className="leaderboard__live">
          <span className={`leaderboard__dot ${isPlaying ? 'leaderboard__dot--live' : ''}`} />
          <span>
            {isRefreshing
              ? 'Updating standings...'
              : fastestOverall
                ? `${fastestOverall.driver} ${fastestOverall.lapTimeSeconds.toFixed(3)}s`
                : 'No fastest lap'}
          </span>
        </div>
      </header>
      <div className="leaderboard__list">
        <AnimatePresence initial={false}>
          {standings.map((driver) => (
            <DriverRow
              key={driver.driver}
              driver={driver}
              previousPosition={previousMap[driver.driver]}
              onSelect={onSelectDriver}
              selected={telemetryDriver === driver.code}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Leaderboard;
