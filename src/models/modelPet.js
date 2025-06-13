// models/Pet.js
import db from '../db.js';

class Pet {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM pets');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(pet) {
    const { name, species, breed, age } = pet;
    const [result] = await db.query(
      'INSERT INTO pets (name, species, breed, age) VALUES (?, ?, ?, ?)',
      [name, species, breed, age]
    );
    return result.insertId;
  }

  static async delete(id) {
    await db.query('DELETE FROM pets WHERE id = ?', [id]);
  }

  static async update(id, pet) {
    const { name, species, breed, age } = pet;
    await db.query(
      'UPDATE pets SET name = ?, species = ?, breed = ?, age = ? WHERE id = ?',
      [name, species, breed, age, id]
    );
  }
}

export default Pet;