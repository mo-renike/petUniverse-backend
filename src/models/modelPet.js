// models/Pet.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Pet {
  static async getAll() {
    return await prisma.pet.findMany();
  }

  static async getById(id) {
    return await prisma.pet.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async create(data) {
    const pet = await prisma.pet.create({ data });
    return pet.id;
  }

  static async update(id, data) {
    await prisma.pet.update({
      where: { id: parseInt(id) },
      data,
    });
  }
}

export default Pet;