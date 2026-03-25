module.exports = function corsMiddleware(_request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (_request.method === 'OPTIONS') {
    return response.sendStatus(204);
  }

  return next();
};
