import express from 'express';
import { register, login, logout, getAllUsers, deleteUser, updateUser } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);
// Logout route
router.post('/logout', logout);
// Get all users
router.get('/users', verifyAdmin, getAllUsers);
// Delete user
router.delete('/users/:id', verifyAdmin, deleteUser);
// Update user
router.put('/users/:id', verifyAdmin, updateUser);

// Verify token and return user role
router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ role: decoded.role });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
});

export default router;