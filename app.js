// Import necessary packages
const express = require('express'); // Express framework
const path = require('path'); // Node.js path module
const bodyParser = require('body-parser'); // Body parsing middleware
const { createProxyMiddleware } = require('http-proxy-middleware'); // HTTP proxy middleware

// Create an instance of the Express application
const app = express();

// Set the port number for the application to listen on
const port = process.env.PORT || 9000;
const openApiKey = process.env.OPENAI_API_KEY || '';
// Set up a proxy to forward requests to the OpenAI API endpoint
app.use('/v1/chat/completions', (req, res, next) => {
  const options = {
    target: process.env.TARGET || "https://api.openai.com",
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  };

  // To use the OpenAI API, you will need an API key that can be set as an environment variable (OPENAI_API_KEY) 
  //or integrated into the front-end client.

  if(openApiKey != ''){
    options.headers= { 
      Authorization: `Bearer ${openApiKey}` 
    };
  }
  createProxyMiddleware(options)(req, res, next);
});

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express application
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});