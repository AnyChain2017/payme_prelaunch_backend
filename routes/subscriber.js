const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// @route    POST /api/subscribe
// @desc     Add a subscriber
// @access   Public
router.post('/subscribe', async (req, res) => {
    // console.log(req.body)
    const { email } = req.body;

    try {
        // Check if the email is already in the database
        let subscriberExists = await Subscriber.findOne({ email });
        if (subscriberExists) {
            return res.status(400).json({ message: 'Email is already subscribed!' });
        }

        // Add email to the database
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(200).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;