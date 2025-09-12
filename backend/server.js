import express from 'express';
import authroutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'


const app = express();
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
}));


app.use(express.json());

connectDB();

// main route that'll always be used for auth
app.use('/auth',authroutes)

app.listen(5001, () => {
    console.log('Server is running!')
})