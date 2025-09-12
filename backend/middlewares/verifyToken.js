import jwt from 'jsonwebtoken'
const JWT_SECRET = 'shero@123'


export const verifytoken = (req, res, next) => {

    // so here server checks the auth-headers from incoming clent request if token is in the request.
    const authHeader = req.header("Authorization");
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;
    if (!token) {
        return res.status(401).json({ error: "No valid token, authorization denied" });
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);

        // here user is a new property created and receives data as its value
        req.user = decodedData; // attach decoded user data to request so any protected route knows which user is logged in
        next();

    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};