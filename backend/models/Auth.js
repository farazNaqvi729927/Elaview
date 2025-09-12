import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })


const Auth = mongoose.model("Auth", authSchema);

export default Auth;