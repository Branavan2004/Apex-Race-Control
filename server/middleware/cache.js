function createCache(ttlMs = 15000) {
  const store = new Map();

  return function cacheMiddleware(request, response, next) {
    const key = request.originalUrl;
    const cached = store.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      response.setHeader('X-Cache', 'HIT');
      return response.json(cached.payload);
    }

    const originalJson = response.json.bind(response);
    response.json = (payload) => {
      store.set(key, {
        payload,
        expiresAt: Date.now() + ttlMs,
      });
      response.setHeader('X-Cache', 'MISS');
      return originalJson(payload);
    };

    return next();
  };
}

module.exports = createCache;
