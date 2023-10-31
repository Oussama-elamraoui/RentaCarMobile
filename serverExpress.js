const express = require('express');
const bodyParser = require('body-parser');
const { Twilio } = require('twilio');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const twilioAccountSid = 'AC2a72a5fd714bf34ef88ff8dbda13f6e4';
const twilioAuthToken = '7d7c2c9f3244bb98fb45bba9eb4de33f';
const twilioPhoneNumber = '+15126237523';

const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/send-sms', (req, res) => {
  const { to, body } = req.body;
  console.log(to)
    twilioClient.messages
        .create({
            body: body,
            from: twilioPhoneNumber,
            to: to,
        })
        .then((message) => {
            // console.log('SMS sent:', message.sid);
            console.log('SMS sent:', message.sid);
            res.status(200).send('SMS sent successfully');
        })
        .catch((error) => {
            console.error('Error sending SMS:', error);
            res.status(500).send('Failed to send SMS');
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
