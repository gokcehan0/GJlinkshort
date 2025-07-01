const express = require('express');
const rateLimit = require('express-rate-limit');
const deleteExpiredUrls = require('./deleteExpiredUrls');
const urlRoutes = require('./routes');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Statik dosyalar için middleware
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // Maximum 1 request
  message: "You can only make one request per minute."
});
app.use('/shorten', limiter);

// Use routes
app.use('/', urlRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
