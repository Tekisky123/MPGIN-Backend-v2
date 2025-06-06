import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['alumni', 'parent', 'student', 'staff', 'press']
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

export default Suggestion;