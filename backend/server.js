import express from 'express';
import authroutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({
    origin: "http://localhost:5173",
}));


app.use(express.json());

connectDB();

// main route that'll always be used for auth
app.use('/auth',authroutes)

app.listen(PORT, () => {
    console.log('Server is running!')
})