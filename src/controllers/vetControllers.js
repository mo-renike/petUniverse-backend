
import {prisma} from "../utils/prisma.js";

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

    const vets = await prisma.vetProfile.findMany(queryOptions);

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
