import express from "express";
import multer from "multer";
import {
    addFaculty,
    getFacultyFromCollege,
    getFacultyByCollegeDepartment,
    updateFaculty,
    deleteFaculty,
} from "../controllers/facultyController.js";  

const facultyRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Create
facultyRoutes.post("/add", upload.single("photo"), addFaculty);

// Read
facultyRoutes.get("/college/:college", getFacultyFromCollege);
facultyRoutes.get("/college/:college/department/:department", getFacultyByCollegeDepartment);

// Update
facultyRoutes.put("/:id", upload.single("photo"), updateFaculty);

// Delete
facultyRoutes.delete("/:id", deleteFaculty);

export default facultyRoutes;