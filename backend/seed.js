import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed

dotenv.config();


const products = [
    { location: 'Manhattan', borough: 'SoHo', pricePerWeek: 14500, img: ['https://oceanoutdoor.s3.eu-west-2.amazonaws.com/website/wp-content/uploads/2024/05/WR-PLS.-Apr-24-2-1920x1281-1.jpg'], spaceType: 'Wall', width: 25, height: 30, traffic: 15000, availability: new Date(), isAvailable: true },
    { location: 'Brooklyn', borough: 'Williamsburg', pricePerWeek: 12050, img: ['https://mandoemedia.com/app/uploads/2023/08/M_UltimateGuide_Retail_01.png'], spaceType: 'Billboard', width: 20, height: 28, traffic: 5000, availability: new Date('12/20/2025'), isAvailable: false },
    { location: 'Queens', borough: 'Astoria', pricePerWeek: 8750, img: ['https://assets.simpleviewinc.com/simpleview/image/upload/crm/howardcounty/Listing-Pic---website-960-x-720---2022-04-21T113542.580_FFB9B994-5056-B3A8-499D03E9CDF44E8C-ffb9b5745056b3a_ffb9c4ba-5056-b3a8-4902c7fd236c3842.png'], spaceType: 'Window', width: 22, height: 26, traffic: 10000, availability: new Date(), isAvailable: true },
    { location: 'Bronx', borough: 'Riverdale', pricePerWeek: 7650, img: ['https://houseofmockups.com/cdn/shop/files/HOM-002-017.-Williamsburg-Handpainted-Billboard-Mockup.webp?v=1724180972'], spaceType: 'Wall', width: 30, height: 40, traffic: 20000, availability: new Date('02/01/2026'), isAvailable: false },
    { location: 'Staten Island', borough: 'St. George', pricePerWeek: 6950, img: ['https://static.vecteezy.com/system/resources/previews/044/904/036/non_2x/outdoor-billboard-mockup-free-psd.png'], spaceType: 'Billboard', width: 20, height: 28, traffic: 5000, availability: new Date(), isAvailable: true },
    { location: 'Queens', borough: 'Long Island City', pricePerWeek: 9400, img: ['https://patch.com/img/cdn20/users/26226110/20240109/043757/styles/patch_image/public/r0005773___09160919405.jpg'], spaceType: 'Vehicle', width: 19, height: 21, traffic: 15000, availability: new Date('03/20/2026'), isAvailable: false },
    { location: 'Manhattan', borough: 'SoHo', pricePerWeek: 15000, img: ['https://oceanoutdoor.s3.eu-west-2.amazonaws.com/website/wp-content/uploads/2024/05/WR-PLS.-Apr-24-2-1920x1281-1.jpg'], spaceType: 'Billboard', width: 26, height: 32, traffic: 10000, availability: new Date(), isAvailable: true },
    { location: 'Brooklyn', borough: 'Williamsburg', pricePerWeek: 12500, img: ['https://mandoemedia.com/app/uploads/2023/08/M_UltimateGuide_Retail_01.png'], spaceType: 'Window', width: 21, height: 29, traffic: 5000, availability: new Date('01/20/2026'), isAvailable: false },
    { location: 'Queens', borough: 'Astoria', pricePerWeek: 9000, img: ['https://assets.simpleviewinc.com/simpleview/image/upload/crm/howardcounty/Listing-Pic---website-960-x-720---2022-04-21T113542.580_FFB9B994-5056-B3A8-499D03E9CDF44E8C-ffb9b5745056b3a_ffb9c4ba-5056-b3a8-4902c7fd236c3842.png'], spaceType: 'Wall', width: 23, height: 27, traffic: 15000, availability: new Date(), isAvailable: true },
    { location: 'Bronx', borough: 'Riverdale', pricePerWeek: 7800, img: ['https://houseofmockups.com/cdn/shop/files/HOM-002-017.-Williamsburg-Handpainted-Billboard-Mockup.webp?v=1724180972'], spaceType: 'Billboard', width: 31, height: 41, traffic: 10000, availability: new Date('02/01/2026'), isAvailable: false },
    { location: 'Staten Island', borough: 'St. George', pricePerWeek: 7100, img: ['https://static.vecteezy.com/system/resources/previews/044/904/036/non_2x/outdoor-billboard-mockup-free-psd.png'], spaceType: 'Wall', width: 21, height: 29, traffic: 5000, availability: new Date('06/15/2026'), isAvailable: false },
    { location: 'Queens', borough: 'Long Island City', pricePerWeek: 9600, img: ['https://patch.com/img/cdn20/users/26226110/20240109/043757/styles/patch_image/public/r0005773___09160919405.jpg'], spaceType: 'Billboard', width: 20, height: 22, traffic: 15000, availability: new Date(), isAvailable: true },
    { location: 'Manhattan', borough: 'SoHo', pricePerWeek: 11500, img: ['https://oceanoutdoor.s3.eu-west-2.amazonaws.com/website/wp-content/uploads/2024/05/WR-PLS.-Apr-24-2-1920x1281-1.jpg'], spaceType: 'Vehicle', width: 27, height: 33, traffic: 10000, availability: new Date('03/01/2026'), isAvailable: false },
    { location: 'Brooklyn', borough: 'Williamsburg', pricePerWeek: 13000, img: ['https://mandoemedia.com/app/uploads/2023/08/M_UltimateGuide_Retail_01.png'], spaceType: 'Wall', width: 22, height: 28, traffic: 5000, availability: new Date(), isAvailable: true },
    { location: 'Queens', borough: 'Astoria', pricePerWeek: 9200, img: ['https://assets.simpleviewinc.com/simpleview/image/upload/crm/howardcounty/Listing-Pic---website-960-x-720---2022-04-21T113542.580_FFB9B994-5056-B3A8-499D03E9CDF44E8C-ffb9b5745056b3a_ffb9c4ba-5056-b3a8-4902c7fd236c3842.png'], spaceType: 'Billboard', width: 24, height: 28, traffic: 15000, availability: new Date('04/10/2026'), isAvailable: false },
    { location: 'Bronx', borough: 'Riverdale', pricePerWeek: 8000, img: ['https://houseofmockups.com/cdn/shop/files/HOM-002-017.-Williamsburg-Handpainted-Billboard-Mockup.webp?v=1724180972'], spaceType: 'Vehicle', width: 32, height: 42, traffic: 10000, availability: new Date(), isAvailable: true },
    { location: 'Staten Island', borough: 'St. George', pricePerWeek: 7300, img: ['https://static.vecteezy.com/system/resources/previews/044/904/036/non_2x/outdoor-billboard-mockup-free-psd.png'], spaceType: 'Wall', width: 21, height: 30, traffic: 5000, availability: new Date('06/15/2026'), isAvailable: false },
    { location: 'Queens', borough: 'Long Island City', pricePerWeek: 9800, img: ['https://patch.com/img/cdn20/users/26226110/20240109/043757/styles/patch_image/public/r0005773___09160919405.jpg'], spaceType: 'Window', width: 20, height: 23, traffic: 15000, availability: new Date('07/01/2026'), isAvailable: false },
    { location: 'Manhattan', borough: 'SoHo', pricePerWeek: 13000, img: ['https://oceanoutdoor.s3.eu-west-2.amazonaws.com/website/wp-content/uploads/2024/05/WR-PLS.-Apr-24-2-1920x1281-1.jpg'], spaceType: 'Billboard', width: 28, height: 34, traffic: 10000, availability: new Date('08/10/2026'), isAvailable: false },
    { location: 'Brooklyn', borough: 'Williamsburg', pricePerWeek: 13500, img: ['https://mandoemedia.com/app/uploads/2023/08/M_UltimateGuide_Retail_01.png'], spaceType: 'Vehicle', width: 23, height: 29, traffic: 20000, availability: new Date(), isAvailable: true },
    { location: 'Manhattan', borough: 'SoHo', pricePerWeek: 12300, img: ['https://oceanoutdoor.s3.eu-west-2.amazonaws.com/website/wp-content/uploads/2024/05/WR-PLS.-Apr-24-2-1920x1281-1.jpg'], spaceType: 'Wall', width: 35, height: 30, traffic: 10000, availability: new Date(), isAvailable: true },
];



const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log("✅ Database seeded with products!");
    } catch (err) {
        console.error("❌ Error seeding DB:", err.message);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
