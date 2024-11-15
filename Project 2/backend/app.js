const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const voteRoutes = require('./routes/routes'); 

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the vote routes
app.use('/api/votes', voteRoutes); 

// MongoDB connection setup
const mongoURI = 'mongodb+srv://projectadmin:centennial@cluster0.zfe69.mongodb.net/voterapp?retryWrites=true&w=majority&appName=Cluster0';  // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Middleware to handle errors
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
