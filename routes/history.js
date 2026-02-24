// Import required dependencies
const express = require('express');
const router = express.Router();
const History = require('../models/History'); // History model for database operations
const authMiddleware = require('../middleware/authMiddleware'); // JWT authentication middleware

/**
 * POST /
 * Save a geolocation search to user's history
 * Protected route - requires valid JWT token
 */
router.post('/', authMiddleware, async (req, res) => {
    try {
        // Extract geolocation data from request body
        const { ip, city, country, region, loc } = req.body;

        // Validate that IP address is provided (required field)
        if (!ip) {
            return res.status(400).json({ message: 'ip address is required' });
        }

        // Create new history record in database
        // userId is extracted from JWT token by authMiddleware and attached to req.user
        const history = await History.create({
            userId: req.user.id,
            ip,
            city,
            country,
            region,
            loc
        });

        // Return the created history record with 201 Created status
        res.status(201).json(history);

    } catch (error) {
        // Log error details to console for debugging
        console.error("Save History Error", error);
        // Return 500 Internal Server Error with error message
        res.status(500).json({ message: "Server error:" + error.message });
    }
});

/**
 * GET /
 * Retrieve all geolocation search history for the authenticated user
 * Protected route - requires valid JWT token
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Query database for all history records belonging to the authenticated user
        // Sort by createdAt in descending order (-1) to show most recent searches first
        const histories = await History.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        // Return the array of history records as JSON response
        res.json(histories)
    } catch (error) {
        // Log error details to console for debugging purposes
        console.error("Get History Error", error);
        // Return 500 Internal Server Error with descriptive error message
        res.status(500).json({ message: "Server error:" + error.message });
    }
});

/**
 * DELETE /
 * Delete multiple geolocation search history records for the authenticated user
 * Protected route - requires valid JWT token
 */
router.delete('/', authMiddleware, async (req, res) => {
    try {
        // Extract array of history IDs to delete from request body
        const { ids } = req.body;

        // Validate that ids is provided and is an array
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "IDs array required" });
        }

        // Delete all history records that match the provided IDs
        // $in operator checks if _id is in the ids array
        // Also ensures userId matches to prevent users from deleting other users' records
        await History.deleteMany({
            _id: { $in: ids },
            userId: req.user.id
        });

        // Return success message after deletion
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        // Log error details to console for debugging purposes
        console.error("Delete History Error", error);
        // Return 500 Internal Server Error with descriptive error message
        res.status(500).json({ message: "Server error:" + error.message });
    }
})

// Export the router to be mounted in the main application (e.g., app.use('/history', historyRouter))
module.exports = router;