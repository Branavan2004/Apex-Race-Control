const express = require('express');

const createCache = require('../middleware/cache');
const { getSession } = require('../services/mockDataService');

const router = express.Router();

router.get('/', createCache(), (request, response, next) => {
  const { race, lap } = request.query;
  const dataset = getSession(race);

  if (!dataset) {
    const error = new Error('Position data unavailable for that race');
    error.statusCode = 404;
    return next(error);
  }

  const requestedLap = Number(lap || 0);
  const currentLap = requestedLap > 0
    ? dataset.positionsByLap.find((entry) => entry.lap === requestedLap)
    : dataset.positionsByLap;

  return response.json({
    demoMode: true,
    positions: currentLap,
  });
});

module.exports = router;
