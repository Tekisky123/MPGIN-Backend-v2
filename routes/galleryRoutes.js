import express from "express";
import multer from "multer";
import {
  addGalleryImage,
  getGalleryByCollege,
  getGalleryByCollegeDepartment,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

const galleryRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Create
galleryRoutes.post("/upload", upload.single("image"), addGalleryImage);

// Read
galleryRoutes.get("/college/:college", getGalleryByCollege);
galleryRoutes.get("/college/:college/department/:department", getGalleryByCollegeDepartment);

// Update
galleryRoutes.put("/:id", upload.single("image"), updateGalleryImage);

// Delete
galleryRoutes.delete("/:id", deleteGalleryImage);

export default galleryRoutes;