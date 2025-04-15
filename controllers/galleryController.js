import AWS from "aws-sdk";
import Gallery from "../models/Gallery.js";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSS_OPEN_KEY,
  secretAccessKey: process.env.AWSS_SEC_KEY,
  region: process.env.AWSS_REGION,
});

// Upload image to S3
const uploadImageToS3 = async (file, folderName) => {
  const params = {
    Bucket: process.env.AWSS_BUCKET_NAME,
    Key: `${folderName}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Return the URL of the uploaded image
};

// Add gallery image
export const addGalleryImage = async (req, res) => {
  try {
    const { title, college, department } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = await uploadImageToS3(file, `${college}/${department}`);
    const gallery = new Gallery({ title, college, department, image: imageUrl });
    await gallery.save();

    res.status(201).json({ message: "Image uploaded successfully", gallery });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get gallery images by college
export const getGalleryByCollege = async (req, res) => {
  try {
    const { college } = req.params;
    const galleries = await Gallery.find({ college });
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get gallery images by college and department
export const getGalleryByCollegeDepartment = async (req, res) => {
  try {
    const { college, department } = req.params;
    const galleries = await Gallery.find({ college, department });
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Update gallery image
export const updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, college, department } = req.body;
    const file = req.file;

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ error: "Gallery image not found" });
    }

    if (file) {
      const imageUrl = await uploadImageToS3(file, `${college}/${department}`);
      gallery.image = imageUrl;
    }

    gallery.title = title || gallery.title;
    gallery.college = college || gallery.college;
    gallery.department = department || gallery.department;

    await gallery.save();

    res.status(200).json({ message: "Gallery image updated successfully", gallery });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Delete gallery image
export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findByIdAndDelete(id);
    if (!gallery) {
      return res.status(404).json({ error: "Gallery image not found" });
    }

    res.status(200).json({ message: "Gallery image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};