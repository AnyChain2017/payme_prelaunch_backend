/*
const Brevo = require('@getbrevo/brevo');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Initialize Brevo client
const brevoClient = new Brevo.TransactionalEmailsApi();
const apiKey = process.env.BREVO_API_KEY;
brevoClient.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

/**
 * Send an email to a single recipient
 * @param {string} email - The recipient's email address
 * @param {string} subject - The email subject
 * @param {string} content - The plain-text or HTML content of the email
 */

/*
const sendEmail = async (email, subject, content) => {
    try {
        const mailData = {
            sender: {
                name: 'PayMe', // Customize sender name
                email: 'example@example.com', // Sender email
            },
            to: [
                {
                    email: email,
                },
            ],
            subject: subject,
            htmlContent: content, // Alternatively, use 'textContent' for plain text
        };

        const response = await brevoClient.sendTransacEmail(mailData);
        console.log(`Email sent to ${email}: ${response.messageId}`);
        // console.log(`Email sent to ${email}: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error.response.text);
        // console.error(`Failed to send email to ${email}:`, error);
        throw error;
    }
};

module.exports = {
    sendEmail,
};

*/


const Brevo = require('@getbrevo/brevo');
const dotenv = require('dotenv');
const SibApiV3Sdk = require("sib-api-v3-sdk");

dotenv.config();

const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (to, subject, content) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.sender = { email: 'marketing.tools@paymeapp.online' };
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = content;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const addContactToList = async (email, listId) => {
    const apiInstance = new SibApiV3Sdk.ContactsApi();
    const createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = email;
    createContact.listIds = [listId];

    try {
        await apiInstance.createContact(createContact);
        console.log('Contact added to list successfully');
    } catch (error) {
        console.error('Error adding contact to list:', error);
    }
};

module.exports = { sendEmail, addContactToList };