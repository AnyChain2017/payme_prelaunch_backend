const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Stop the application if DB connection fails
    }
};

module.exports = connectDB;