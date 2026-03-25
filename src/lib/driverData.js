import { teamColors } from './teamColors';

export const driverData = [
  { number: 1, code: 'VER', name: 'Max Verstappen', team: 'Red Bull' },
  { number: 11, code: 'PER', name: 'Sergio Perez', team: 'Red Bull' },
  { number: 16, code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari' },
  { number: 55, code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari' },
  { number: 4, code: 'NOR', name: 'Lando Norris', team: 'McLaren' },
  { number: 81, code: 'PIA', name: 'Oscar Piastri', team: 'McLaren' },
  { number: 44, code: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes' },
  { number: 63, code: 'RUS', name: 'George Russell', team: 'Mercedes' },
  { number: 14, code: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin' },
  { number: 18, code: 'STR', name: 'Lance Stroll', team: 'Aston Martin' },
  { number: 10, code: 'GAS', name: 'Pierre Gasly', team: 'Alpine' },
  { number: 31, code: 'OCO', name: 'Esteban Ocon', team: 'Alpine' },
  { number: 22, code: 'TSU', name: 'Yuki Tsunoda', team: 'RB' },
  { number: 3, code: 'RIC', name: 'Daniel Ricciardo', team: 'RB' },
  { number: 27, code: 'HUL', name: 'Nico Hulkenberg', team: 'Haas' },
  { number: 20, code: 'MAG', name: 'Kevin Magnussen', team: 'Haas' },
  { number: 23, code: 'ALB', name: 'Alex Albon', team: 'Williams' },
  { number: 2, code: 'SAR', name: 'Logan Sargeant', team: 'Williams' },
  { number: 77, code: 'BOT', name: 'Valtteri Bottas', team: 'Sauber' },
  { number: 24, code: 'ZHO', name: 'Zhou Guanyu', team: 'Sauber' },
].map((driver) => ({
  ...driver,
  teamColor: teamColors[driver.team],
}));
