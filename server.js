const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables

// Initialize the application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

// Connect to MongoDB
connectDB();

// API Route
app.use('/api', require('./routes/subscriber'));

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the landing page backend!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});