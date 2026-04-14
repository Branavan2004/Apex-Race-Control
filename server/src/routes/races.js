const express = require('express');
const router = express.Router();

// Mock Data
let races = [
  { id: '1', name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', date: '2024-03-02', status: 'finished' },
  { id: '2', name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', date: '2024-03-09', status: 'finished' },
  { id: '3', name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', date: '2024-03-24', status: 'finished' },
  { id: '4', name: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', date: '2024-04-07', status: 'finished' },
  { id: '5', name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', date: '2024-04-21', status: 'finished' },
  { id: '6', name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', date: '2024-05-05', status: 'live' },
  { id: '7', name: 'Emilia Romagna Grand Prix', circuit: 'Autodromo Internazionale Enzo e Dino Ferrari', date: '2024-05-19', status: 'upcoming' },
];

/**
 * @openapi
 * /races:
 *   get:
 *     summary: Retrieve a list of races
 *     description: Returns a paginated list of races with optional status filtering.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [live, upcoming, finished]
 *         description: Filter races by status.
 *     responses:
 *       200:
 *         description: A list of races.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Race'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get('/', (req, res) => {
  let { page = 1, limit = 10, status } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filteredRaces = [...races];

  // Filtering
  if (status) {
    filteredRaces = filteredRaces.filter(r => r.status === status);
  }

  // Pagination
  const total = filteredRaces.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedRaces = filteredRaces.slice(offset, offset + limit);

  res.status(200).json({
    data: paginatedRaces,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  });
});

/**
 * @openapi
 * /races/{id}:
 *   get:
 *     summary: Get a race by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Race details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         description: Race not found
 */
router.get('/:id', (req, res) => {
  const race = races.find(r => r.id === req.params.id);
  if (!race) {
    return res.status(404).json({ message: 'Race not found' });
  }
  res.status(200).json(race);
});

/**
 * @openapi
 * /races:
 *   post:
 *     summary: Create a new race
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request (missing fields)
 *       409:
 *         description: Conflict (race already exists)
 */
router.post('/', (req, res) => {
  const { name, circuit, date, status } = req.body;

  if (!name || !circuit || !date || !status) {
    return res.status(400).json({ message: 'All fields (name, circuit, date, status) are required' });
  }

  // Simple conflict check: identical name and date
  const exists = races.find(r => r.name === name && r.date === date);
  if (exists) {
    return res.status(409).json({ message: 'A race with this name and date already exists' });
  }

  const newRace = {
    id: String(races.length + 1),
    name,
    circuit,
    date,
    status,
  };

  races.push(newRace);
  res.status(201).json(newRace);
});

/**
 * @openapi
 * /races/{id}:
 *   put:
 *     summary: Update a race
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', (req, res) => {
  const index = races.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Race not found' });
  }

  races[index] = { ...races[index], ...req.body, id: req.params.id };
  res.status(200).json(races[index]);
});

/**
 * @openapi
 * /races/{id}:
 *   delete:
 *     summary: Delete a race
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted (No content)
 *       404:
 *         description: Not found
 */
router.delete('/:id', (req, res) => {
  const index = races.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Race not found' });
  }

  races.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
