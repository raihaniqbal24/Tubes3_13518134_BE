const express = require('express');
const chadgptRoute = require('./chadgpt.route');

const router = express.Router();

router.use('/chadgpt', chadgptRoute);

module.exports = router;
