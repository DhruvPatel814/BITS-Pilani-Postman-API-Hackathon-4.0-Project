const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

// Twilio credentials
const accountSid = 'YOUR_ACCOUNT_SID';  // Replace with your Twilio Account SID
const authToken = 'YOUR_AUTH_TOKEN';    // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.json());

// API endpoint to handle form submission and send SMS
app.post('/send-sms', (req, res) => {
    const { name, phone, appointmentDate, doctor, city } = req.body;

    const message = `Hello ${name}, your appointment has been booked with ${doctor} for ${appointmentDate} at ${city}.`;

    // Send SMS
    client.messages.create({
        body: message,
        from: 'YOUR_TWILIO_PHONE_NUMBER', // Replace with your Twilio phone number
        to: phone // User's phone number
    })
    .then(message => {
        console.log(`SMS sent to ${phone}: ${message.sid}`);
        res.status(200).json({ success: true });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ success: false });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});