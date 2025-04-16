import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import facultyRoutes from './routes/facultyRoutes.js';

dotenv.config();

const app = express();

// ✅ Properly configure CORS to allow all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE',"PATCH"],
}));

app.use(express.json());

app.use('/user', userRoutes);
app.use('/gallery', galleryRoutes);
app.use('/faculty', facultyRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));
