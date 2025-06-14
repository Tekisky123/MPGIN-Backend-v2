import mongoose from "mongoose";

const popupNotificationSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PopupNotification = mongoose.model(
  "PopupNotification",
  popupNotificationSchema
);

export default PopupNotification;
