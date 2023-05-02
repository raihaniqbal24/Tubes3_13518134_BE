const express = require('express');
const chadgptController = require('../../../controllers/chadgpt.controller');
const validate = require('../../../middlewares/validate.middleware');
const chadgptValidator = require('../../../validators/chadgpt.validator');

const router = express.Router();

router
  .route('/question/add')
  .post(validate(chadgptValidator.createQuestion), chadgptController.createQnA);

router
  .route('/ask')
  .post(
    validate(chadgptValidator.getAnswerByQuestion),
    chadgptController.getAnswerByQuestion,
  );

router
  .route('/question/delete')
  .post(validate(chadgptValidator.deleteQuestion), chadgptController.deleteQnA);

module.exports = router;
