require('dotenv').config
const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello There!');
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



