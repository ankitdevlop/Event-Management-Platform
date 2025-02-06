const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBurl);
        console.log("Mongoose connected");
    } catch (err) {
        console.error("Connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
