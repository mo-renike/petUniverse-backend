import { prisma } from '../utils/prisma.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, firstName: true, lastName: true, username: true, role: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get user by ID (admin only)
export const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            select: { id: true, email: true, firstName: true, lastName: true, username: true, role: true }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Update user (admin only)
export const updateUser = async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: req.body,
            select: { id: true, email: true, firstName: true, lastName: true, username: true, role: true }
        });
        res.json({ message: 'User updated', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: req.params.id } });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}; 