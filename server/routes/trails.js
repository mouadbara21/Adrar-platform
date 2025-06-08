import express from 'express';
import { Trail } from '../models/Trail.js';

const router = express.Router();

// Get all trails
router.get('/', async (req, res) => {
  try {
    const { search, difficulty, parc } = req.query;
    
    let trails;
    if (search || difficulty || parc) {
      trails = await Trail.search(search, difficulty, parc);
    } else {
      trails = await Trail.getAll();
    }
    
    res.json(trails);
  } catch (error) {
    console.error('Error fetching trails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get trail by ID with all related data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const trail = await Trail.getById(id);
    if (!trail) {
      return res.status(404).json({ error: 'Trail not found' });
    }

    const summits = await Trail.getSummits(id);
    const refuges = await Trail.getRefuges(id);
    const guides = await Trail.getGuides(id);
    const reviews = await Trail.getReviews(id);

    res.json({
      ...trail,
      summits,
      refuges,
      guides,
      reviews
    });
  } catch (error) {
    console.error('Error fetching trail:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;