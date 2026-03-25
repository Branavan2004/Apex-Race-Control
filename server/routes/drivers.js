const express = require('express');

const createCache = require('../middleware/cache');
const { getSession } = require('../services/mockDataService');

const router = express.Router();

router.get('/', createCache(), (request, response, next) => {
  const { race } = request.query;
  const dataset = getSession(race);

  if (!dataset) {
    const error = new Error('Drivers unavailable for that race');
    error.statusCode = 404;
    return next(error);
  }

  return response.json({
    demoMode: true,
    drivers: dataset.drivers,
  });
});

module.exports = router;
