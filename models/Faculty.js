import mongoose from "mongoose"

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    photo: { type: String, required: true },
});

export default mongoose.model('Faculty', FacultySchema);