import { Router } from 'express';

import db from '../data/database.js';

const router = Router();

// In-memory fallback used when no database connection is available.
const inMemoryEvents = [];

router.get('/', async (req, res) => {
  if (db) {
    const allEvents = await db.collection('events').find().toArray();
    res.json({ events: allEvents });
  } else {
    res.json({ events: inMemoryEvents });
  }
});

router.post('/', async (req, res) => {
  const eventData = req.body;
  if (db) {
    const result = await db.collection('events').insertOne({ ...eventData });
    res.status(201).json({
      message: 'Event created.',
      event: { ...eventData, id: result.insertedId },
    });
  } else {
    const id = Date.now().toString();
    inMemoryEvents.push({ ...eventData, id });
    res.status(201).json({
      message: 'Event created.',
      event: { ...eventData, id },
    });
  }
});

export default router;
