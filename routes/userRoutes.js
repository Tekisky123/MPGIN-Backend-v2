import express from 'express';
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
