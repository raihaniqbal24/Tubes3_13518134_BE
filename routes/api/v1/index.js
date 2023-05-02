const express = require('express');
const bmRoute = require('./bm.route');
// const kmpRoute = require('./kmp.route');

const router = express.Router();

router.use('/bm', bmRoute);
// router.use('/kmp', kmpRoute);

module.exports = router;
