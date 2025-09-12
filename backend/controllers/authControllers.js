import Auth from "../models/Auth.js"
import Product from "../models/Product.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'shero@123'

// Route#1
export const signUp = async (req, res) => {

    try {

        let user = await Auth.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ error: 'Email is already Registered' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creates a new document (object) that matches the schema.req.body contains the data the user sent in the request
        user = new Auth({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await user.save();


        // This id belongs to the dataset stored in the DB
        const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
        res.status(201).json({ message: 'User Created', authToken });

    } catch (error) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
}


// Route#2
export const login = async (req, res) => {
    try {
        let user = await Auth.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: 'Enter correct Credentials' })
        }

        const password = await bcrypt.compare(req.body.password, user.password);

        if (!password) {
            return res.status(400).json({ error: 'Enter correct Credentials' })
        }

        const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
        res.status(201).json({ message: 'User Logged In', authToken });

    }

    catch (error) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
}


// Route#3
export const profileDetails = async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await Auth.findById(userId).select('-password');
        res.json(user);
    }

    catch (error) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
}


// Route#4
export const browseProducts = async (req, res) => {
    const { sort, priceMin, priceMax, minWidth, maxWidth, minHeight, maxHeight } = req.query;

    let sortQuery;
    let sortReceived = (sort || "").replace(/['"]+/g, "").trim();

    switch (sortReceived) {
        case "Earliest Availability":
            // Immediately available first, then by soonest date
            sortQuery = { isAvailable: -1, availability: 1 };
            break;

        case "Recently Added":
            sortQuery = { isAvailable: 1, createdAt: -1 }; // newest first
            break;

        case "Recommended":
            sortQuery = {};
            break;

        default:
            sortQuery = {}; // fallback
        // leave default DB order, or add custom logic if needed
    }


    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // remove page/limit before passing filters to MongoDB
        const filters = { ...req.query };
        delete filters.page;
        delete filters.limit;
        delete filters.sort;
        delete filters.priceMin;
        delete filters.priceMax;
        delete filters.minWidth;
        delete filters.maxWidth;
        delete filters.minHeight;
        delete filters.maxHeight;

        if (priceMin && priceMax) {
            filters.pricePerWeek = { $gte: Number(priceMin), $lte: Number(priceMax) };
        }

        if (minWidth && maxWidth) {
            filters.width = { $gte: Number(minWidth), $lte: Number(maxWidth) };
        }
        if (minHeight && maxHeight) {
            filters.height = { $gte: Number(minHeight), $lte: Number(maxHeight) };
        }


        if (req.query.availability) {
            const selectedDate = new Date(req.query.availability);
            const start = new Date(selectedDate.setHours(0, 0, 0, 0));
            const end = new Date(selectedDate.setHours(23, 59, 59, 999));

            filters.availability = { $gte: start, $lte: end };
        }


        const products = await Product.find(filters).sort(sortQuery).skip((page - 1) * limit).limit(limit);
        const total = await Product.countDocuments(filters); // It counts how many documents in MongoDB match your filters(In my case all)
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({ totalPages, products });
    }

    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Route#5
export const homeProducts = async (req, res) => {

    try {
        let filters = {};

        // if frontend sends ?borough=SoHo&borough=Astoria&borough=Riverdale...
        if (req.query.borough) {
            const boroughs = Array.isArray(req.query.borough)? req.query.borough:[req.query.borough];

            filters.borough = { $in: boroughs };
        }
        const products = await Product.find(filters).limit(3);
        res.status(200).json({ products });

    }

    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
