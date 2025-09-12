import mongoose from "mongoose";

const productSchema = mongoose.Schema({

    borough: {
        type: String,
        enum: [
            "SoHo",
            "Williamsburg",
            "Astoria",
            "Riverdale",
            "St. George",
            "Long Island City"
        ],
        required: true
    },

    location: {
        type: String,
        enum: [
            "Manhattan",
            "Brooklyn",
            "Queens",
            "Bronx",
            "Staten Island",
            "Long Island"
        ],
        required: true
    },

    pricePerWeek: {
        type: Number,
        required: true
    },

    spaceType: {
        type: String,
        enum: [
            "Wall",
            "Window",
            "Queens",
            "Billboard",
            "Vehicle",
            "Storefront",
            "Rooftop"
        ],
        required: true
    },

    width: {
        type: Number,   // store as raw number (e.g., 25)
        required: true
    },

    height: {
        type: Number,   // store as raw number (e.g., 10)
        required: true
    },

    traffic: {
        type: Number,
        enum: [5000, 10000, 15000, 20000],
        required: true
    },

    availability: {
        type: Date,     // store actual date for queries
        required: true
    },

    isAvailable: {      // optional flag for "Immediately"
        type: Boolean,
        default: true
    },

    img: {
        type: [String],   // allow multiple images
        required: true
    }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
