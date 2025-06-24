// controllers/petController.js
import Pet from '../models/modelPet.js';

// GET /pet
export async function getAllPets(req, res) {
  try {
    if (req.user.role === 'ADMIN') {
      const pets = await Pet.getAll();
      return res.json(pets);
    } else {
      const pets = await Pet.getByOwnerId(req.user.id);
      return res.json(pets);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
}

// GET /pet/:id
export async function getPetById(req, res) {
  try {
    const pet = await Pet.getById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    if (req.user.role !== 'ADMIN' && pet.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
}

// POST /pet
export async function createPet(req, res) {
  try {
    // Only admins can create pets for any owner; pet owners can only create for themselves
    if (req.user.role !== 'ADMIN' && req.body.ownerId && req.body.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const data = req.user.role === 'ADMIN' ? req.body : { ...req.body, ownerId: req.user.id };
    const id = await Pet.create(data);
    res.status(201).json({ message: 'Pet created', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pet' });
  }
}

// PUT /pet/:id
export async function updatePet(req, res) {
  try {
    const pet = await Pet.getById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    if (req.user.role !== 'ADMIN' && pet.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await Pet.update(req.params.id, req.body);
    res.status(200).json({ message: 'Pet updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
}

// DELETE /pet/:id
export async function deletePet(req, res) {
  try {
    const pet = await Pet.getById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    if (req.user.role !== 'ADMIN' && pet.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await Pet.delete(req.params.id);
    res.status(200).json({ message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
}