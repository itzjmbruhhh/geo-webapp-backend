const express = require('express');
const router = express.Router();
const History = require('../models/History');
const authMiddleware = require('../middleware/authMiddleware');

// Save search
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { ip, city, country, region, loc } = req.body;

        if (!ip) {
            return res.status(400).json({ message: 'ip address is required' });
        }

        const history = await History.create({
            userId: req.user.id,
            ip,
            city,
            country,
            region,
            loc
        });

        res.status(201).json(history);

    } catch (error) {
        console.error("Save History Error", error);
        res.status(500).json({ message: "Server error:" + error.message });
    }
});