// controllers/petController.js
import Pet from '../models/Pet.js';

// GET /pet
export async function getAllPets(req, res) {
  try {
    const pets = await Pet.getAll();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
}

// GET /pet/:id
export async function getPetById(req, res) {
  try {
    const pet = await Pet.getById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
}

// POST /pet
export async function createPet(req, res) {
  try {
    const id = await Pet.create(req.body);
    res.status(201).json({ message: 'Pet created', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pet' });
  }
}

// PUT /pet/:id
export async function updatePet(req, res) {
  try {
    await Pet.update(req.params.id, req.body);
    res.status(200).json({ message: 'Pet updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
}

// DELETE /pet/:id
export async function deletePet(req, res) {
  try {
    await Pet.delete(req.params.id);
    res.status(200).json({ message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet'});
  }
}