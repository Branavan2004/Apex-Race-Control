const API_BASE = 'https://api.openf1.org/v1';

async function requestOpenF1(path, query = {}) {
  const params = new URLSearchParams(query);
  const url = `${API_BASE}${path}${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'f1-dashboard-demo',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`OpenF1 request failed with ${response.status}`);
  }

  return response.json();
}

async function getSessions() {
  try {
    return await requestOpenF1('/sessions', { year: 2024, session_name: 'Race' });
  } catch (error) {
    return null;
  }
}

module.exports = {
  getSessions,
};
