import { uploadFileToS3, deleteFileFromS3 } from '../config/s3.js';
import PopupNotification from '../models/PopupNotification.js';

export const createPopupNotification = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    const { link } = req.body;
    const file = req.file;

    const { url, key } = await uploadFileToS3(file);

    const notification = new PopupNotification({
      imageUrl: url,
      link: link
    });

    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(500).send({ message: 'Error creating notification', error });
  }
};

export const getPopupNotifications = async (req, res) => {
  try {
    const notifications = await PopupNotification.find().sort({ createdAt: -1 });
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching notifications', error });
  }
};

export const deletePopupNotification = async (req, res) => {
  try {
    const notification = await PopupNotification.findById(req.params.id);
    if (!notification) {
      return res.status(404).send({ message: 'Notification not found' });
    }

    const urlParts = notification.imageUrl.split('/');
    const key = urlParts.slice(3).join('/');

    await deleteFileFromS3(key);
    await PopupNotification.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting notification', error });
  }
};
