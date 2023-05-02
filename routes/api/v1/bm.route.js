const express = require('express');
const appController = require('../../../controllers/app.controller');
const validate = require('../../../middlewares/validate.middleware');
const appValidator = require('../../../validators/app.validator');

const router = express.Router();

router
  .route('/question')
  .post(
    validate(appValidator.getAnswerByQuestion),
    appController.getAnswerByQuestion,
  );

module.exports = router;
