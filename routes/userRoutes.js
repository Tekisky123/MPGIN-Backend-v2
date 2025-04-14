// routes/userRoutes.js
import express from 'express';
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

// Public routes
userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);

// Protected routes
userRoutes.get('/', authMiddleware, getAllUsers);
userRoutes.get('/:id', authMiddleware, getUser);
userRoutes.delete('/:id', authMiddleware, deleteUser);

export default userRoutes;
