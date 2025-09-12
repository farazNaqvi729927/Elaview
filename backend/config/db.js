import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Database Connected Successfully!')
    } catch (error) {
        console.error('Error Connecting to MongoDB', error);
        process.exit(1);
    }
}