require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI)

const seedUsers = async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await User.create([
        {
            email: "test@example.com",
            password: hashedPassword,
        },
        {
            email: "user2@example.com",
            password: hashedPassword,
        },
        {
            email: "user3@example.com",
            password: hashedPassword,
        },
    ]);

    console.log("Users seeded");
    process.exit();
};

seedUsers();