// Load environment variables from .env file
require('dotenv').config();

// Import required dependencies
const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const connectDB = require('./config/db'); // Database connection function

// Initialize Express application
const app = express();

// Connect to MongoDB database
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for all routes to allow frontend communication
app.use(express.json()); // Parse incoming JSON request bodies

// Test route to verify API is running
app.get('/', (req, res) => {
    res.send('API is running');
});

// Mount API routes
app.use('/auth', require('./routes/auth')); // Authentication routes
app.use('/history', require('./routes/history')); // History routes

// Start the Express server
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;