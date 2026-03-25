import { REPLAY_SPEEDS } from '../../lib/constants';
import './ReplayControls.css';

function SpeedSelector({ speed, onSpeedChange }) {
  return (
    <div className="replay__speeds">
      {REPLAY_SPEEDS.map((value) => (
        <button
          key={value}
          type="button"
          className={`replay__speed ${speed === value ? 'replay__speed--active' : ''}`}
          onClick={() => onSpeedChange(value)}
        >
          {value}×
        </button>
      ))}
    </div>
  );
}

export default SpeedSelector;
