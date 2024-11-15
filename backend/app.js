const express = require('express');
const bodyParser = require('body-parser');


const voteRoutes = require('./routes/routes'); 

const app = express();

app.use(bodyParser.json()); 

app.use('/api/votes', voteRoutes); 

// Middleware to handle errors
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});


app.listen(3000);