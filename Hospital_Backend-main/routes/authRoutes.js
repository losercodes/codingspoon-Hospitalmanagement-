const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const router = express.Router();
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Signup failed", error: error.message });
    }
});

router.post("/login", async (req, res) => {                 
    // User Login
    try {
        const { email, password } = req.body;  

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign( 
            { userId: user._id, role: user.role }, // JWT token
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
});

module.exports = router;
    