module.exports = function health(_request, response) {
  response.json({
    status: 'ok',
    service: 'f1-dashboard-api',
    mode: 'demo-fallback-enabled',
    timestamp: new Date().toISOString(),
  });
};
