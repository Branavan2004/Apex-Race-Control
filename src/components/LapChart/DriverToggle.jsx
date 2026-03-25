import './LapChart.css';

function DriverToggle({ drivers, enabledDrivers, onToggle, onShowAll, onHideAll }) {
  return (
    <div className="lapChart__toggles">
      <div className="lapChart__toggleList">
        {drivers.map((driver) => (
          <button
            key={driver.code}
            type="button"
            className={`lapChart__toggle ${enabledDrivers.includes(driver.code) ? 'lapChart__toggle--active' : ''}`}
            onClick={() => onToggle(driver.code)}
            style={{
              background: enabledDrivers.includes(driver.code) ? driver.teamColor : 'var(--bg-elevated)',
            }}
          >
            {driver.code}
          </button>
        ))}
      </div>
      <div className="lapChart__toggleActions">
        <button type="button" onClick={onShowAll}>SHOW ALL</button>
        <button type="button" onClick={onHideAll}>HIDE ALL</button>
      </div>
    </div>
  );
}

export default DriverToggle;
