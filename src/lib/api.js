import { API_BASE } from './constants';

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export const api = {
  getSessions: () => request('/sessions'),
  getSession: (race) => request(`/sessions/${race}`),
  getDrivers: (race) => request(`/drivers?race=${race}`),
  getLaps: (race) => request(`/laps?race=${race}`),
  getPositions: (race) => request(`/positions?race=${race}`),
};
