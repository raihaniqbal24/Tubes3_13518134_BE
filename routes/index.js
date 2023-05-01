const express = require('express');
const apiV1Route = require('./api/v1');

const router = express.Router();

router.use('/api/v1', apiV1Route);

module.exports = router;
