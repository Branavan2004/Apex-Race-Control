import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { RaceCard } from './RaceCard';
import { RACE_RESULTS_2024 } from '../../lib/raceResults2024';
import './RaceSelector.css';

export const RaceSelector = ({ sessions, selectedRaceKey, onSelectRace, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const allRaces = (sessions && sessions.length > 0)
    ? sessions
    : RACE_RESULTS_2024;

  const filteredSessions = useMemo(() => {
    if (!searchTerm) return allRaces;
    const lower = searchTerm.toLowerCase();
    return allRaces.filter((s) =>
      s.name?.toLowerCase().includes(lower) ||
      s.country?.toLowerCase().includes(lower)
    );
  }, [allRaces, searchTerm]);

  return (
    <aside className="race-selector-container">
      <div className="selector-header">
        <div className="selector-titleRow">
          <h2 className="font-display">2024 SEASON</h2>
          {isLoading ? <span className="selector-status">Refreshing</span> : null}
        </div>
        <div className="search-box">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search races..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="races-list">
        {filteredSessions.map((race) => (
          <RaceCard
            key={race.round}
            race={race}
            isActive={selectedRaceKey === race.round}
            onClick={() => onSelectRace(race)}
          />
        ))}
        {filteredSessions.length === 0 && (
          <div className="no-results">No races found</div>
        )}
      </div>
    </aside>
  );
};

export default RaceSelector;
