const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./clodinary.config.js"); 


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", 
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});


const upload = multer({ storage });

module.exports = upload;
