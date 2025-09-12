import express from 'express';
import { login, signUp, profileDetails, browseProducts,homeProducts } from '../controllers/authControllers.js';
import { validate } from "../middlewares/validate.js";
import { body } from 'express-validator';
import { verifytoken } from '../middlewares/verifyToken.js'


const router = express.Router();

router.post('/signup', validate([
    body("name", 'Name length is short').isLength({ min: 5 }),
    body("email", 'Enter a valid Email').isEmail(),
    body("password", 'Password length is short').isLength({ min: 5 })
]), signUp);


router.post('/login', validate([
    body("email", 'Enter a valid Email').isEmail(),
    body("password", 'Password cannot be empty').exists()
]), login);


router.post('/profile', verifytoken, profileDetails);


router.get('/browseProducts',verifytoken, browseProducts);

router.get('/homeProducts',verifytoken, homeProducts);


export default router;