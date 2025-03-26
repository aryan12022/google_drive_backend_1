const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

module.exports = connectToDb;
