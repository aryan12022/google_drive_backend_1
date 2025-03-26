const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");

// Register Page
router.get("/register", (req, res) => {
    res.render("register");
});

// Register Logic
router.post(
    "/register",
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
        }

        try {
            const { email, username, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({ email, username, password: hashPassword });

            res.json(newUser);
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
);

// Login Page
router.get("/login", (req, res) => {
    res.render("login");
});

// Login Logic
router.post(
    "/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
        }

        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: "Username or password is incorrect" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Username or password is incorrect" });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email, username: user.username },
                process.env.JWT_SECRET
            );

            res.cookie("token", token);
            res.send("Logged in");
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
);

module.exports = router;
