const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const raceRoutes = require('./routes/races');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

/**
 * API Versioning: v1
 * All race routes will be prefixed with /api/v1
 */
app.use('/api/v1/races', raceRoutes);

/**
 * Swagger Documentation
 * Live API documentation at /api/v1/docs
 */
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route for health check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Apex Race Control API is running',
    version: '1.0.0',
    docs: '/api/v1/docs'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api/v1/docs`);
});

module.exports = app;
