import express from 'express';
import {
  createSuggestion,
  getSuggestions,
  deleteSuggestion,
  updateSuggestion
} from '../controllers/suggestionController.js';

const suggestionRoutes = express.Router();

suggestionRoutes.post('/create', createSuggestion);
suggestionRoutes.get('/getAllSuggestions', getSuggestions);
suggestionRoutes.delete('/delete/:id', deleteSuggestion);
suggestionRoutes.put('/update/:id', updateSuggestion);

export default suggestionRoutes;