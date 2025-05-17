import Notification from '../models/Notification.js';
// Define valid colleges directly in the controller
const VALID_COLLEGES = ['engineering', 'management', 'polytechnic', 'mpgin'];

// Get all notifications for a specific college
export const getCollegeNotifications = async (req, res) => {
  try {
    const { college } = req.params;

    if (!college || !VALID_COLLEGES.includes(college)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid college specified. Valid options are: ' + VALID_COLLEGES.join(', ')
      });
    }

    const notifications = await Notification.find({ college })
      .sort({ date: -1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ date: -1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching all notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
};

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { title, message, college, category, linkText, linkUrl } = req.body;

    // Basic validation
    if (!title || !message || !college || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, message, college, and category are required'
      });
    }

    // College validation
    if (!VALID_COLLEGES.includes(college)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid college specified. Valid options are: ' + VALID_COLLEGES.join(', ')
      });
    }

    const newNotification = new Notification({
      title,
      message,
      college,
      category,
      linkText,
      linkUrl,
      date: req.body.date || new Date()
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      success: true,
      data: savedNotification
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: error.message
    });
  }
};

// Update a notification (similar college validation)
export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate college if being updated
    if (updateData.college && !VALID_COLLEGES.includes(updateData.college)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid college specified. Valid options are: ' + VALID_COLLEGES.join(', ')
      });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedNotification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedNotification
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification',
      error: error.message
    });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message
    });
  }
};
