const Joi = require('joi');

const getAnswerByQuestion = {
  params: Joi.object({
    question: Joi.string().required(),
  }),
};

module.exports = {
  getAnswerByQuestion,
};
