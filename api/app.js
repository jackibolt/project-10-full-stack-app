'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// connect to database
(async () => {
  await db.sequelize.sync();

  try {
    await db.sequelize.authenticate();
    console.log('Database is connected');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();


// create the Express app
const app = express();

// Setup request body JSON parsing.
app.use(express.json());

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(cors());

// variables to require route files
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');

// TODO setup your api routes here
app.use('/api', userRoutes);
app.use('/api', courseRoutes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});



// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
