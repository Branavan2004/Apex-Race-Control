import './RaceSelector.css';

export function RaceCard({ race, active, isActive, onClick }) {
  const selected = active ?? isActive ?? false;
  const raceName = race.name || race.raceName;

  return (
    <button
      type="button"
      className={`raceCard interactive-card ${selected ? 'raceCard--active' : ''}`}
      onClick={onClick}
    >
      <span className="raceCard__round">{String(race.round).padStart(2, '0')}</span>
      <div className="raceCard__content">
        <div className="raceCard__row">
          <span className="raceCard__flag">{race.flag}</span>
          <span className="raceCard__name">{raceName?.toUpperCase()}</span>
        </div>
        <span className="raceCard__circuit">{race.circuitName}</span>
        <span className="raceCard__winner">
          <span className="raceCard__dot" style={{ background: race.winnerTeam === 'Ferrari' ? '#E80020' : race.winnerTeam === 'McLaren' ? '#FF8000' : race.winnerTeam === 'Mercedes' ? '#00D2BE' : '#3671C6' }} />
          {race.winner}
        </span>
      </div>
    </button>
  );
}

export default RaceCard;
