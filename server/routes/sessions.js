const express = require('express');

const createCache = require('../middleware/cache');
const { getAllSessions, getSession } = require('../services/mockDataService');

const router = express.Router();

router.get('/', createCache(), (request, response) => {
  const sessions = getAllSessions();
  response.json({
    demoMode: true,
    sessions,
    selected: request.query.race ? getSession(request.query.race)?.session || null : null,
  });
});

router.get('/:slug', createCache(), (request, response, next) => {
  const dataset = getSession(request.params.slug);

  if (!dataset) {
    const error = new Error('Session not found');
    error.statusCode = 404;
    return next(error);
  }

  return response.json({
    demoMode: true,
    session: dataset.session,
    fastestOverall: dataset.fastestOverall,
  });
});

module.exports = router;
