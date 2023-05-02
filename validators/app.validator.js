const Joi = require('joi');

const getAnswerByQuestion = {
  body: Joi.object({
    question: Joi.string().required(),
  }),
};

module.exports = {
  getAnswerByQuestion,
};
