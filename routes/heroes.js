import { Router } from 'express';

const router = Router();

// Simple in-memory list of heroes used for demonstration and tests.
const heroes = [
  { id: '1', name: 'Superman', power: 'Flight' },
  { id: '2', name: 'Wonder Woman', power: 'Strength' },
];

router.get('/heroes', (req, res) => {
  res.json({ heroes });
});

export default router;
