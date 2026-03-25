module.exports = function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || 500;
  response.status(statusCode).json({
    error: error.message || 'Unexpected server error',
    statusCode,
  });
};
