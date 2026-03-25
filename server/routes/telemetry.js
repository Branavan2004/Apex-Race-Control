const express = require('express');

const createCache = require('../middleware/cache');
const { getSession } = require('../services/mockDataService');

const router = express.Router();

router.get('/', createCache(), (request, response, next) => {
  const { race, lap, driver } = request.query;
  const dataset = getSession(race);

  if (!dataset) {
    const error = new Error('Telemetry unavailable for that race');
    error.statusCode = 404;
    return next(error);
  }

  const currentLap = Number(lap || 1);
  const telemetryAtLap = dataset.telemetryByLap[currentLap] || {};

  return response.json({
    demoMode: true,
    telemetry: driver ? telemetryAtLap[driver] : telemetryAtLap,
  });
});

module.exports = router;
