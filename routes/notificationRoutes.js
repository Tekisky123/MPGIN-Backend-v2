import express from 'express';
import {
  getCollegeNotifications,
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notificationController.js';

const notificationRoutes = express.Router();

// College-specific notifications
notificationRoutes.get('/college/:college', getCollegeNotifications);
// All notifications (admin view)
notificationRoutes.get('/getAllNotification', getAllNotifications);
// CRUD operations
notificationRoutes.post('/createNotification', createNotification);
notificationRoutes.put('/updatedNotification/:id', updateNotification);
notificationRoutes.delete('/deleteNotification/:id', deleteNotification);

export default notificationRoutes;
