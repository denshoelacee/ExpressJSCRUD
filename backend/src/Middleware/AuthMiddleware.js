import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; 
dotenv.config();

class AuthMiddleware {

    async authenticate(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // verify token to access protected routes
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 
            //console.log("Authenticated user ID:", req.user);
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    }
}

export default new AuthMiddleware();
