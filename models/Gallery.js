import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  image: { type: String, required: true }, // URL of the uploaded image
});

export default mongoose.model('Gallery', GallerySchema);