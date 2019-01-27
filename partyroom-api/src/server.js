const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
var cors = require('cors');

const config = require('../config/main');
const api = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

// Database connection
mongoose.connect(config.database)
  .then(() => console.log('Connected to server'))
  .catch(console.error);

app.options('*', cors()); // include before other routes

// For logging
app.use(morgan('combined'));

// Stops from blocking OPTION route, fixing CORS problem
app.use(cors());

// Initialize passport
app.use(passport.initialize());

// Configure to use bodyParser(), lets us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Something is happening...');
  next(); // Makes us go to next routes
});

// Register routes
app.use('/api', api);

// Start the server
app.listen(port);
console.log(`Magic happens on port: ${port}`);
