import express from 'express';
import { Refuge } from '../models/Refuge.js';

const router = express.Router();

// Get all refuges
router.get('/', async (req, res) => {
  try {
    const refuges = await Refuge.getAll();
    res.json(refuges);
  } catch (error) {
    console.error('Error fetching refuges:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get refuge by ID with all related data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const refuge = await Refuge.getById(id);
    if (!refuge) {
      return res.status(404).json({ error: 'Refuge not found' });
    }

    const services = await Refuge.getServices(id);
    const equipments = await Refuge.getEquipments(id);
    const guides = await Refuge.getGuides(id);
    const summits = await Refuge.getSummits(id);

    res.json({
      ...refuge,
      services,
      equipments,
      guides,
      summits
    });
  } catch (error) {
    console.error('Error fetching refuge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create refuge reservation
router.post('/:id/reservations', async (req, res) => {
  try {
    const { id } = req.params;
    const reservationData = {
      ...req.body,
      id_refuge: id
    };

    const reservation = await Refuge.createReservation(reservationData);
    res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;