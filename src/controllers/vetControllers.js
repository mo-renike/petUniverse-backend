import { prisma } from "../utils/prisma.js";

export const createVetProfile = async (req, res) => {
  const {
    specialization,
    yearsExperience,
    location,
    phoneNumber,
    bio,
    isAvailable,
    userId,
  } = req.body;

  // Only allow admin or the vet themselves to create their profile
  if (req.user.role !== 'ADMIN' && req.user.id !== userId) {
    return res.status(403).json({ success: false, error: 'Forbidden' });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: 'A userId is required to create a vet profile'
    });
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        error: `User with Id ${userId} not found. Cannot create vet profile.`
      });
    }

    const vetProfileExists = await prisma.vetProfile.findUnique({
      where: { userId: userId },
    });

    if (vetProfileExists) {
      return res.status(409).json({
        success: false,
        error: `A vet profile already exists for the user with Id ${userId}`
      });
    }

    const newVetProfile = await prisma.vetProfile.create({
      data: {
        specialization,
        yearsExperience,
        location,
        phoneNumber,
        bio,
        isAvailable,
        user: {
          connect: {
            id: userId
          },
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: newVetProfile,
    });

  } catch (error) {
    console.error('error creating vet profile:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while creating vet profile.'
    });
  }
};

export const updateVetProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const vetProfile = await prisma.vetProfile.findUnique({ where: { id } });
    if (!vetProfile) {
      return res.status(404).json({ success: false, error: 'Vet profile not found' });
    }
    // Only allow admin or the vet themselves to update their profile
    if (req.user.role !== 'ADMIN' && req.user.id !== vetProfile.userId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    const updated = await prisma.vetProfile.update({
      where: { id },
      data: req.body,
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update vet profile' });
  }
};

export const getAllVets = async (req, res) => {
  const { location } = req.query;

  try {
    const queryOptions = {
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    };

    if (location) {
      queryOptions.where = {
        location: {
          contains: location,
          //   mode: 'insensitive',
        },
      };
    }

    // Admins see all, vets see their own, others forbidden
    let vets;
    if (req.user.role === 'ADMIN') {
      vets = await prisma.vetProfile.findMany(queryOptions);
    } else if (req.user.role === 'VET') {
      vets = await prisma.vetProfile.findMany({ ...queryOptions, where: { userId: req.user.id } });
    } else {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    res.status(200).json({
      success: true,
      count: vets.length,
      data: vets,
    });

  } catch (error) {
    console.error('Error fetching vets:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching vet profiles.',
    });
  }
};

export const getVetById = async (req, res) => {
  try {
    const { id } = req.params;

    const vet = await prisma.vetProfile.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            // phoneNumber: true,
          },
        },
      },
    });

    if (!vet) {
      return res.status(404).json({
        success: false,
        error: `No vet profile found with the id of ${id}`,
      });
    }

    // Only allow admin or the vet themselves to view their profile
    if (req.user.role !== 'ADMIN' && req.user.id !== vet.userId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    res.status(200).json({
      success: true,
      data: vet,
    });

  } catch (error) {
    console.error(`Error fetching vet with id ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching vet profile.',
    });
  }
};
