import express from 'express';
import { Park } from '../models/Park.js';

const router = express.Router();

// Get all parks
router.get('/', async (req, res) => {
  try {
    const parks = await Park.getAll();
    res.json(parks);
  } catch (error) {
    console.error('Error fetching parks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get park by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const park = await Park.getById(id);
    if (!park) {
      return res.status(404).json({ error: 'Park not found' });
    }

    const trails = await Park.getTrails(id);

    res.json({
      ...park,
      trails
    });
  } catch (error) {
    console.error('Error fetching park:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;