const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apex Race Control API',
      version: '1.0.0',
      description: 'Production-grade API for F1 race tracking and telemetry management.',
      contact: {
        name: 'Apex Support',
        url: 'https://apex-race-control.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Race: {
          type: 'object',
          required: ['name', 'circuit', 'date', 'status'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the race',
            },
            name: {
              type: 'string',
              description: 'The name of the race',
            },
            circuit: {
              type: 'string',
              description: 'The circuit where the race takes place',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'The date of the race',
            },
            status: {
              type: 'string',
              enum: ['upcoming', 'live', 'finished'],
              description: 'The current status of the race',
            },
          },
          example: {
            id: '1',
            name: 'Monaco Grand Prix',
            circuit: 'Circuit de Monaco',
            date: '2024-05-26',
            status: 'upcoming',
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./server/src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
