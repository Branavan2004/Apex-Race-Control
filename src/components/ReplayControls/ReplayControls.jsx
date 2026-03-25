import { ChevronsLeft, ChevronsRight, Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

import SpeedSelector from './SpeedSelector';
import LapScrubber from './LapScrubber';
import './ReplayControls.css';

function ReplayControls({
  session,
  leader,
  currentLap,
  isPlaying,
  speed,
  onRestart,
  onPrevious,
  onTogglePlay,
  onNext,
  onFinalLap,
  onSpeedChange,
  onLapChange,
  safetyCarPeriods,
  isRefreshing,
}) {
  return (
    <footer className="replay">
      <div className="replay__left">
        <span className="replay__session">{session?.raceName?.toUpperCase()} / {session?.session}</span>
        <span className="replay__lapCounter">LAP {currentLap} / {session?.totalLaps}</span>
        <span className="replay__leaderLap">LEADER {leader?.lastLap || '--:--.---'}</span>
      </div>
      <div className="replay__center">
        <div className="replay__controls">
          <button type="button" onClick={onRestart}><RotateCcw size={16} /></button>
          <button type="button" onClick={onPrevious}><SkipBack size={16} /></button>
          <button type="button" onClick={onTogglePlay} className={`replay__play ${isPlaying ? 'replay__play--active' : ''}`}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button type="button" onClick={onNext}><SkipForward size={16} /></button>
          <button type="button" onClick={onFinalLap}><ChevronsRight size={16} /></button>
        </div>
        <SpeedSelector speed={speed} onSpeedChange={onSpeedChange} />
      </div>
      <div className="replay__right">
        {isRefreshing ? <span className="replay__status">Loading race data</span> : null}
        <LapScrubber
          currentLap={currentLap}
          totalLaps={session?.totalLaps}
          onLapChange={onLapChange}
          safetyCarPeriods={safetyCarPeriods}
        />
      </div>
    </footer>
  );
}

export default ReplayControls;
