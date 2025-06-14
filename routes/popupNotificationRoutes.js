import express from 'express';
import { upload } from '../config/s3.js';
import { createPopupNotification, deletePopupNotification, getPopupNotifications } from '../controllers/popupNotificationController.js';

const popupNotificationRoutes = express.Router();

popupNotificationRoutes.post('/create', upload.single('image'), createPopupNotification);
popupNotificationRoutes.get('/getPopupNotification', getPopupNotifications);
popupNotificationRoutes.delete('/delete/:id', deletePopupNotification);

export default popupNotificationRoutes;
