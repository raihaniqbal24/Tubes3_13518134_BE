const status = require('http-status');
// const moment = require('moment');
// const config = require('../config/config');
const asyncWrapper = require('../utils/asyncWrapper');
// const ApiError = require('../utils/ApiError');
const appService = require('../services/app.service');
const kmpService = require('../services/kmp.service');
const bmService = require('../services/bm.service');
const { sequelizeErrorHandler } = require('../utils/sequelizeErrorHandler');
// const db = require('../database/models');

// const { Dictionary } = db;

const createQnA = asyncWrapper(async (req, res) => {
  const { question } = req.body;
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

function questionType(text) {
  
  let type = 'text';

  const calculation_regex = /^.*[\d+\-*/().\s]+$/;
  const date_regex = /^.*\d{1,2}\/\d{1,2}\/\d{4}.*$/;
  
  if (date_regex.exec(text)) {
    type =  "dayFromDate";
  } 
  else if (calculation_regex.exec(text)) {
    type = "calculation";
  } 

  return type;

}

const askQuestion = asyncWrapper(async (req, res) => {
  const data = await appService.getAllQuestions();
  const { question } = req.body;

  // TODO: parse question buat nentuin pake apa

  const whatToDo = questionType(question);
  let result;

  if(whatToDo === 'text'){
    // TODO: read algo request
  }

  switch (whatToDo) {
    case 'kmp':
      // KMP Search
      for (let i = 1; i <= data.length; i += 1) {
        const exist = kmpService.KMPSearch(data[i], question);
        if (exist) {
          res.json(data[i]);
          break;
        }
      }
      break;
    case 'bm':
      // BM Search
      for (let i = 1; i <= data.length; i += 1) {
        const exist = bmService.BMSearch(data[i], question);
        if (exist) {
          res.json(data[i]);
          break;
        }
      }
      break;
    case 'calculation':
      result = appService.calculateNumber(question);
      res.json(result);
      break;
    case 'dayFromDate':
      result = appService.getDayFromDate(question);
      res.json(result);
      break;
    default:
      // KMP Search
      for (let i = 1; i <= data.length; i += 1) {
        const exist = kmpService.KMPSearch(data[i], question);
        if (exist) {
          res.json(data[i]);
          break;
        }
      }
      break;
  }
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
      await appService.deleteQuestion(question);
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
  askQuestion,
  getAllQnAs,
  getAnswerByQuestion,
  deleteQnA,
};
