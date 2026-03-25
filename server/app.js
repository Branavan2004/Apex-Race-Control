const express = require('express');

const sessionsRoute = require('./routes/sessions');
const driversRoute = require('./routes/drivers');
const lapsRoute = require('./routes/laps');
const positionsRoute = require('./routes/positions');
const telemetryRoute = require('./routes/telemetry');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'f1-dashboard-api',
    mode: 'demo-fallback-enabled',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/sessions', sessionsRoute);
app.use('/api/drivers', driversRoute);
app.use('/api/laps', lapsRoute);
app.use('/api/positions', positionsRoute);
app.use('/api/telemetry', telemetryRoute);

app.use(errorHandler);

module.exports = app;
