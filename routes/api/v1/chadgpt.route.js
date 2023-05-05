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
  .get(validate(chadgptValidator.askAQuestion), chadgptController.askQuestion);

router.route('/all').get(chadgptController.getAllQnAs);

router
  .route('/question/delete')
  .post(validate(chadgptValidator.deleteQuestion), chadgptController.deleteQnA);

module.exports = router;
