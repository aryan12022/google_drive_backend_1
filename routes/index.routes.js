const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const upload = require("../config/multer.config");
const FileModel = require("../models/files.models.js");

// Home Route
router.get("/home", authMiddleware, (req, res) => {
    res.render("home");
});

// Upload Route
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const newFile = await FileModel.create({
            path: req.file.path,
            originalname: req.file.originalname,
            user: req.user.userId,
        });

        res.status(201).json({ message: "File uploaded successfully", file: newFile });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;
