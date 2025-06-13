// routes/pet.js
import express from 'express';
import Pet from '../models/Pet.js';

const router = express.Router();

// GET /pet - Get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.getAll();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// POST /pet - Create a new pet
router.post('/', async (req, res) => {
  try {
    const newPetId = await Pet.create(req.body);
    res.status(201).json({ message: 'Pet created', id: newPetId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create pet' });
  }
});

// PUT /pet/:id - Update a pet
router.put('/:id', async (req, res) => {
  try {
    await Pet.update(req.params.id, req.body);
    res.status(200).json({ message: 'Pet updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
});

// DELETE /pet/:id - Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    await Pet.delete(req.params.id);
    res.status(200).json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
});

export default router;