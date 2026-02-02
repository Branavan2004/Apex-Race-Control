import { useEffect, useState } from "react";

function App() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/driverStandings.json")
      .then((res) => res.json())
      .then((data) => {
        const standings =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDrivers(standings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>F1 Driver Standings</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Points</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d.position}>
              <td>{d.position}</td>
              <td>
                {d.Driver.givenName} {d.Driver.familyName}
              </td>
              <td>{d.points}</td>
              <td>{d.Constructors[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
