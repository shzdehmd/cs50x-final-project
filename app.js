// Configure any environment variables from the .env file
require('dotenv').config();

// Import the required dependencies such as express for the web server
// and nunjucks for the html templating engine
const express = require('express');
const njk = require('nunjucks');

// Setup the express web server instance
const app = express();

// Set the host and port for the application
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

// Configure nunjucks to work with express and use it as the
// templating engine
njk.configure('views', { autoescape: true, express: app });
app.set('view engine', 'html');

// Set a temporary homepage route that returns a Hello world message
app.get('/', (req, res) => {
    res.json({
        code: 200,
        status: 'OK',
        message: 'Hello CS50x with NodeJS',
    });
});

// Return a 404 error for all the routes that aren't explicitly or implicitly handled
app.all('*', (req, res) => {
    res.status(404).json({
        code: 404,
        status: 'NOT FOUND',
        message: 'The resource you are looking for does not exist.',
    });
});

// Start the application on the chosen port
app.listen(PORT, () => {
    console.log(`The app is available at http://${HOST}:${PORT}`);
});
