import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  yearOfPassing: { type: String, required: true },
  college: { 
    type: String, 
    required: true,
    enum: ['School of Engineering', 'School of Management', 'Vishwabharati Polytechnic Institute']
  },
  department: { type: String, required: true },
  company: { type: String, required: true },
  designation: { type: String, required: true },
  package: { type: String, required: true },
  profilePhoto: {
    url: String,
    key: String
  },
  linkedin: { type: String }
}, { timestamps: true });

export default mongoose.model('Alumni', alumniSchema);