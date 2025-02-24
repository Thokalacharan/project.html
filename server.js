const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const feedback = require('./models/feedback'); // Importing the model correctly

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/coderone_feedback', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Use "public" for serving static files if needed

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit-feedback', async (req, res) => {
    const { name, contactNumber, email, feedback: feedbackText } = req.body;

    const newFeedback = new Feedback({ // Use a different variable name
        name,
        contactNumber,
        email,
        feedback: feedbackText
    });

    try {
        await newFeedback.save();
        console.log('Feedback saved successfully');
        res.send(`
            <html>
                <head>
                    <title>Feedback Submitted</title>
                </head>
                <body>
                    <h1>Thank you!</h1>
                    <p>Your feedback has been successfully submitted.</p>
                    <a href="/">Go back to the form</a>
                </body>
            </html>
        `);
    } catch (err) {
        console.error('Error saving feedback:', err);
        res.status(500).send('There was an error submitting your feedback. Please try again later.');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
