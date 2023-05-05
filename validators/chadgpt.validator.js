const Joi = require('joi');

const createQuestion = {
  body: Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
};

const getAnswerByQuestion = {
  body: Joi.object({
    question: Joi.string().required(),
  }),
};

const askAQuestion = {
  body: Joi.object({
    question: Joi.string().required(),
    algo: Joi.string().required(),
  }),
};

const deleteQuestion = {
  body: Joi.object({
    question: Joi.string().required(),
  }),
};

module.exports = {
  createQuestion,
  getAnswerByQuestion,
  askAQuestion,
  deleteQuestion,
};
