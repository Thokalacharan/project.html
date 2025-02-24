const mongoose = require('mongoose');

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Basic email validation
    feedback: { type: String, required: true }
});

// Export the feedback model
module.exports = mongoose.model('Feedback', feedbackSchema);
