import express from 'express';
import authroutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}


app.use(express.json());

connectDB();

// main route that'll always be used for auth
app.use('/auth', authroutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    console.log('Server is running!')
})