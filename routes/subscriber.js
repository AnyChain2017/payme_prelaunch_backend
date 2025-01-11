const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const { sendEmail, addContactToList } = require('../services/emailService');

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

        // Add subscriber to Brevo list
        const listId = 3; // Your Brevo list ID
        await addContactToList(email, listId);

        // Send email to Brevo account
        const subject = 'New Subscriber';
        const content = `<p>New subscriber: ${email}</p>`;
        await sendEmail('marketing.tools@paymeapp.online', subject, content);

        res.status(200).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route    POST /api/send-updates
// @desc     Send update emails to all subscribers
// @access   Admin (Optional authentication logic can be added here)
router.post('/send-updates', async (req, res) => {
    const { subject, message } = req.body;

    if (!subject || !message) {
        return res.status(400).json({ message: 'Subject and message are required!' });
    }

    try {
        // Get the list of all subscribed users
        const subscribers = await Subscriber.find();

        if (subscribers.length === 0) {
            return res.status(400).json({ message: 'No subscribers to send updates to.' });
        }

        // Loop through each subscriber and send an email
        for (const subscriber of subscribers) {
            await sendEmail(
                subscriber.email, // Recipient email
                subject, // Email subject
                message // Email content (HTML or plain text)
            );
        }

        res.status(200).json({ message: 'Update emails sent successfully!' });
    } catch (error) {
        console.error('Error sending update emails:', error);
        res.status(500).json({ message: 'Server error. Email sending failed.' });
    }
});

module.exports = router;