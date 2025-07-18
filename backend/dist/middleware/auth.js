import { getAuthenticatedUser } from '../config/supabase.js';
/**
 * Authentication middleware - validates JWT tokens from Supabase
 */
export const authenticateToken = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Missing or invalid authorization header'
            });
            return;
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        if (!token) {
            res.status(401).json({
                success: false,
                error: 'No token provided'
            });
            return;
        }
        // Validate token with Supabase
        const user = await getAuthenticatedUser(token);
        if (!user) {
            res.status(401).json({
                success: false,
                error: 'User not found'
            });
            return;
        }
        // Attach user to request
        req.user = {
            id: user.id,
            email: user.email,
            role: user.user_metadata?.role
        };
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            error: 'Authentication failed'
        });
    }
};
/**
 * Optional authentication - doesn't fail if no token provided
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            if (token) {
                try {
                    const user = await getAuthenticatedUser(token);
                    if (user) {
                        req.user = {
                            id: user.id,
                            email: user.email,
                            role: user.user_metadata?.role
                        };
                    }
                }
                catch (error) {
                    // Don't fail, just continue without user
                    console.log('Optional auth failed:', error);
                }
            }
        }
        next();
    }
    catch (error) {
        // Don't fail for optional auth
        next();
    }
};
