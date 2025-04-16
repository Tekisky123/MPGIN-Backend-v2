import mongoose from "mongoose"

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    dateOfJoining: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    photo: { type: String,  default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
});

export default mongoose.model('Faculty', FacultySchema);