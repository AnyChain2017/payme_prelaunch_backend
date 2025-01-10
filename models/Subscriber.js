const mongoose = require('mongoose');

// Define subscriber schema
const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
module.exports = mongoose.model('Subscriber', SubscriberSchema);