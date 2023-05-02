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
  try {
    const qna = await appService.createQuestion(req.body);
    res.status(status.CREATED).json(qna);
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
  const user = await appService.getQuestion(question);
  res.json(user);
});

const updateQnA = asyncWrapper(async (req, res) => {
  const result = await appService.updateQuestion(req.body);
  res.json(result);
});

const deleteQnA = asyncWrapper(async (req, res) => {
  const result = await appService.deleteQuestion(req.body);
  res.json(result);
});

module.exports = {
  createQnA,
  getKMP,
  getBM,
  getAllQnAs,
  getAnswerByQuestion,
  updateQnA,
  deleteQnA,
};
