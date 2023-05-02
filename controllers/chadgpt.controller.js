const status = require('http-status');
// const moment = require('moment');
// const config = require('../config/config');
const asyncWrapper = require('../utils/asyncWrapper');
const ApiError = require('../utils/ApiError');
const appService = require('../services/app.service');
const kmpService = require('../services/kmp.service');
const bmService = require('../services/bm.service');
const { sequelizeErrorHandler } = require('../utils/sequelizeErrorHandler');
const db = require('../database/models');

const { Dictionary } = db;

const createQnA = asyncWrapper(async (req, res) => {
  const { question, answer } = req.body;
  const isExist = await appService.getQuestion(question);
  try {
    if (!isExist) {
      const qna = await appService.createQuestion(req.body);
      res.status(status.CREATED).json(qna);
    } else {
      const result = await appService.updateQuestion(question, req.body);
      res.json(result);
    }
  } catch (err) {
    sequelizeErrorHandler(err);
  }
});

const getKMP = asyncWrapper(async (req, res) => {
  const getTransaction = await appService.getAllQuestions();
  res.json(getTransaction);
});

const getBM = asyncWrapper(async (req, res) => {
  const getTransaction = await appService.getAllQuestions();
  res.json(getTransaction);
});

const getAllQnAs = asyncWrapper(async (_req, res) => {
  const transactions = await appService.getAllQuestions();
  res.json(transactions);
});

const getAnswerByQuestion = asyncWrapper(async (req, res) => {
  const { question } = req.body;
  const answer = await appService.getQuestion(question);
  res.json(answer);
});

const deleteQnA = asyncWrapper(async (req, res) => {
  try {
    const { question } = req.body;
    const isExist = await appService.getQuestion(question);
    if (isExist) {
      const result = await appService.deleteQuestion(question);
      res.status(status.CREATED).json(req.body);
    } else {
      res.json(null);
    }
  } catch (err) {
    sequelizeErrorHandler(err);
  }
});

module.exports = {
  createQnA,
  getKMP,
  getBM,
  getAllQnAs,
  getAnswerByQuestion,
  deleteQnA,
};
