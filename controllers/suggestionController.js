import Suggestion from "../models/Suggestion.js";

export const createSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.create(req.body);
    res.status(201).json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.log("Failed to submit suggestion");
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.status(200).json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    console.log("Failed to fetch suggestions");
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndDelete(req.params.id);
    if (!suggestion) {
      return res.status(404).json({
        success: false,
        error: "Suggestion not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log("Failed to delete suggestion");
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!suggestion) {
      return res.status(404).json({
        success: false,
        error: "Suggestion not found",
      });
    }
    res.status(200).json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.log("Failed to update suggestion");
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
