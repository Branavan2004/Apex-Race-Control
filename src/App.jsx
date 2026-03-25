import { useEffect, useState } from 'react';

import './App.css';
import Header from './components/Header/Header';
import RaceSelector from './components/RaceSelector/RaceSelector';
import TrackMap from './components/TrackMap/TrackMap';
import Leaderboard from './components/Leaderboard/Leaderboard';
import LapChart from './components/LapChart/LapChart';
import TelemetryPanel from './components/TelemetryPanel/TelemetryPanel';
import ReplayControls from './components/ReplayControls/ReplayControls';
import LoadingSkeleton from './components/UI/LoadingSkeleton';
import ErrorBoundary from './components/UI/ErrorBoundary';
import ErrorCard from './components/UI/ErrorCard';
import { RACE_RESULTS_2024 } from './lib/raceResults2024';
import { useRaceData } from './hooks/useRaceData';
import { useReplayEngine } from './hooks/useReplayEngine';
import { useTelemetry } from './hooks/useTelemetry';

function App() {
  const [selectedRace, setSelectedRace] = useState(
    RACE_RESULTS_2024[0],
  );
  const [telemetryDriver, setTelemetryDriver] = useState('LEC');
  const raceData = useRaceData(selectedRace);
  const replay = useReplayEngine({
    totalLaps: raceData.session?.totalLaps || 0,
  });
  const telemetry = useTelemetry({
    telemetryByLap: raceData.telemetryByLap,
    currentLap: replay.currentLap,
    selectedDriver: telemetryDriver,
  });

  useEffect(() => {
    if (raceData.drivers.length > 0) {
      setTelemetryDriver((current) => (
        raceData.drivers.some((driver) => driver.code === current)
          ? current
          : raceData.drivers[0].code
      ));
    }
  }, [raceData.drivers]);

  useEffect(() => {
    replay.reset();
  }, [selectedRace?.round]);

  if (raceData.loading) {
    return <LoadingSkeleton />;
  }

  if (raceData.error) {
    return <ErrorCard title="Dashboard Load Failed" message={raceData.error} />;
  }

  const currentStandings = raceData.currentStandings(replay.currentLap);
  const previousStandings = raceData.currentStandings(Math.max(1, replay.currentLap - 1));
  const selectedDriver = raceData.drivers.find((entry) => entry.code === telemetryDriver);

  return (
    <ErrorBoundary>
      <div className="app-shell">
        <div className="app-header">
          <Header race={raceData.session} />
        </div>
        <div className="app-sidebar panel">
          <RaceSelector
            sessions={raceData.sessions}
            selectedRaceKey={selectedRace?.round}
            onSelectRace={(race) => setSelectedRace(race)}
            isLoading={raceData.refreshing}
          />
        </div>
        <div className="app-center panel">
          <TrackMap
            session={raceData.session}
            standings={currentStandings}
            currentLap={replay.currentLap}
          />
        </div>
        <div className="app-chart panel">
          <LapChart
            session={raceData.session}
            chartData={raceData.chartData}
            drivers={raceData.drivers}
            standingsByLap={raceData.positionsByLap}
            safetyCarPeriods={raceData.safetyCarPeriods}
          />
        </div>
        <div className="app-right panel">
          <Leaderboard
            standings={currentStandings}
            previousStandings={previousStandings}
            fastestOverall={raceData.fastestOverall}
            isPlaying={replay.isPlaying}
            telemetryDriver={telemetryDriver}
            onSelectDriver={setTelemetryDriver}
            isRefreshing={raceData.refreshing}
          />
          <TelemetryPanel
            driver={selectedDriver}
            telemetry={telemetry}
            isRefreshing={raceData.refreshing}
          />
        </div>
        <div className="app-footer">
          <ReplayControls
            session={raceData.session}
            leader={currentStandings[0]}
            currentLap={replay.currentLap}
            isPlaying={replay.isPlaying}
            speed={replay.speed}
            onRestart={replay.restart}
            onPrevious={replay.previousLap}
            onTogglePlay={replay.togglePlayback}
            onNext={replay.nextLap}
            onFinalLap={replay.finalLap}
            onSpeedChange={replay.setSpeed}
            onLapChange={replay.setCurrentLap}
            safetyCarPeriods={raceData.safetyCarPeriods}
            isRefreshing={raceData.refreshing}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
