import React, { memo } from 'react';
import clsx from 'clsx';

function RaceCardComponent({ race, isActive, onClick }) {
  return (
    <button
      type="button"
      className={clsx('season-race-card', isActive && 'is-active')}
      onClick={() => onClick(race)}
    >
      <div className="season-race-card__top">
        <span className="season-race-card__round">R{race.round}</span>
        <span className="season-race-card__flag">{race.flag || '🏁'}</span>
      </div>
      <h3>{race.raceName}</h3>
      <p>{race.Circuit?.circuitName}</p>
      <span className="season-race-card__winner">
        {race.winnerName ? `${race.winnerName} #${race.winnerNumber}` : 'Upcoming'}
      </span>
    </button>
  );
}

const RaceCard = memo(RaceCardComponent);

export default RaceCard;
