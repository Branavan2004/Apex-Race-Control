import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the 2026 (or current) standings from Ergast
    fetch('https://ergast.com/api/f1/current/driverStandings.json')
      .then((response) => response.json())
      .then((data) => {
        const list = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setStandings(list);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching F1 data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="f1-container">
      <h1>🏎️ F1 Driver Standings</h1>
      {loading ? (
        <p>Loading the grid...</p>
      ) : (
        <table className="standings-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Constructor</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((item) => (
              <tr key={item.Driver.driverId}>
                <td>{item.position}</td>
                <td>{item.Driver.givenName} {item.Driver.familyName}</td>
                <td>{item.Constructors[0].name}</td>
                <td className="points">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;