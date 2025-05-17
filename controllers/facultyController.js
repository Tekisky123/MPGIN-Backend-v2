import Faculty from "../models/Faculty.js";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSS_OPEN_KEY,
  secretAccessKey: process.env.AWSS_SEC_KEY,
  region: process.env.AWSS_REGION,
});

// Upload photo to S3
const uploadPhotoToS3 = async (file, folderName) => {
  const params = {
    Bucket: process.env.AWSS_BUCKET_NAME,
    Key: `${folderName}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Return the URL of the uploaded image
};

// Add faculty member
export const addFaculty = async (req, res) => {
  try {
    const { name, college, department, qualification, experience, designation, dateOfJoining } = req.body;
    const file = req.file; // Uploaded file (if any)

    
    if (!name || !college || !department || !qualification || !experience || !designation ) {
      return res.status(400).json({ error: "All fields are required except photo" });
    }

    let photoUrl = null;

   
    if (file) {
      try {
        photoUrl = await uploadPhotoToS3(file, `${college}/${department}`);
      } catch (uploadError) {
        return res.status(500).json({ error: "Failed to upload photo", details: uploadError.message });
      }
    }

    // Create new faculty instance
    const faculty = new Faculty({
      name,
      college,
      department,
      designation,
      qualification,
      dateOfJoining,
      experience,
      photo: photoUrl, 
    });

    // Save faculty to the database
    await faculty.save();

    // Respond with success message
    res.status(201).json({ message: "Faculty added successfully", faculty });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get all faculties by college
export const getFacultyFromCollege = async (req, res) => {
  try {
    const { college } = req.params;
    const faculties = await Faculty.find({ college });
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get faculties by college and department
export const getFacultyByCollegeDepartment = async (req, res) => {
  try {
    const { college, department } = req.params;
    const faculties = await Faculty.find({ college, department });
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Update faculty details
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, college, department, qualification, experience,designation,dateOfJoining } = req.body;
    const file = req.file;

    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    if (file) {
      const photoUrl = await uploadPhotoToS3(file, `${college}/${department}`);
      faculty.photo = photoUrl;
    }

    faculty.name = name || faculty.name;
    faculty.college = college || faculty.college;
    faculty.department = department || faculty.department;
    faculty.designation = designation || faculty.designation;
    faculty.dateOfJoining = dateOfJoining || faculty.dateOfJoining;
    faculty.qualification = qualification || faculty.qualification;
    faculty.experience = experience || faculty.experience;

    await faculty.save();

    res.status(200).json({ message: "Faculty updated successfully", faculty });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Delete faculty member
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};