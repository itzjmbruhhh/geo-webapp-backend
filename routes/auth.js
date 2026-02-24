// Import required dependencies
const express = require('express');
const bcrypt = require('bcryptjs') // For password hashing and comparison
const jwt = require('jsonwebtoken') // For generating JWT authentication tokens
const User = require('../models/User') // User model for database operations

const router = express.Router();

/**
 * POST /login
 * Authenticates a user with email and password
 * Returns a JWT token on successful authentication
 */
router.post('/login', async ( req, res ) => {
    // Extract credentials from request body
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Verify password matches the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token with user ID as payload
    // Token does not have an expiration time set (consider adding one for security)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Return the authentication token to the client
    res.json({ token });
});

module.exports = router;