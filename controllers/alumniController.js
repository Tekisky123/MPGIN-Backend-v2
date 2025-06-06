import Alumni from "../models/Alumni.js";
import {  deleteFileFromS3, uploadFileToS3 } from "../config/s3.js";

// Create Alumni
export const createAlumni = async (req, res) => {
  try {
    let profilePhoto = null;
    
    if (req.file) {
      profilePhoto = await uploadFileToS3(req.file);
    }

    const alumniData = {
      ...req.body,
      profilePhoto
    };

    const alumni = await Alumni.create(alumniData);
    res.status(201).json({
      success: true,
      data: alumni
    });
  } catch (error) {
    console.log(`Error creating alumni: ${error.message}`);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get All Alumni
export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).json({
      success: true,
      count: alumni.length,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get Single Alumni
export const getOneAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        error: "Alumni not found",
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



export const updateAlumni = async (req, res) => {
  try {
    let alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        error: 'Alumni not found'
      });
    }

    // Update fields
    alumni = Object.assign(alumni, req.body);

    // Handle profile photo update
    if (req.file) {
      // Delete old photo if exists
      if (alumni.profilePhoto?.key) {
        await deleteFileFromS3(alumni.profilePhoto.key);
      }
      
      // Upload new photo
      const photo = await uploadFileToS3(req.file);
      alumni.profilePhoto = photo;
    }

    await alumni.save();

    res.status(200).json({
      success: true,
      data: alumni
    });
  } catch (error) {
    console.log(`Error updating alumni: ${error.message}`);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        error: 'Alumni not found'
      });
    }

    // Delete profile photo from S3 if exists
    if (alumni.profilePhoto?.key) {
      await deleteFileFromS3(alumni.profilePhoto.key);
    }

    await alumni.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.log(`Error deleting alumni: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};