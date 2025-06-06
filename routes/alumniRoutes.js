import express from 'express';
import { upload } from '../config/s3.js';
import {
  createAlumni,
  getAllAlumni,
  getOneAlumni,
  deleteAlumni,
  updateAlumni
} from '../controllers/alumniController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const alumniRoutes = express.Router();

// Create Alumni - POST /api/alumni/create
alumniRoutes.post('/create', upload.single('profilePhoto'), createAlumni);

// Get All Alumni - GET /api/alumni/getAll
alumniRoutes.get('/getAll', authMiddleware, getAllAlumni);

// Get Single Alumni - GET /api/alumni/getOne/:id
alumniRoutes.get('/getOne/:id', authMiddleware, getOneAlumni);

// Update Alumni - PUT /api/alumni/edit/:id
alumniRoutes.put('/edit/:id', authMiddleware, upload.single('profilePhoto'), updateAlumni);

// Delete Alumni - DELETE /api/alumni/delete/:id
alumniRoutes.delete('/delete/:id', authMiddleware, deleteAlumni);

export default alumniRoutes;