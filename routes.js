const express = require('express');
const { shortenUrl, redirectUrl } = require('./controllers');

const router = express.Router();

// URL shortening endpoint
router.post('/shorten', shortenUrl);

// Redirect endpoint
router.get('/:shortUrl', redirectUrl);

module.exports = router;
