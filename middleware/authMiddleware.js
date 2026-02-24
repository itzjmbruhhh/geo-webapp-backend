const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Extract JWT token from Authorization header
    const token = req.headers.authorization;

    // Return 401 Unauthorized if no token is provided
    if (!token) return res.status(401).json({ message: 'No token' });

    // Verify token signature and decode payload, attach user data to request
    // Will throw error if token is invalid, expired, or signature doesn't match
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    // Continue to next middleware or route handler
    next();
}