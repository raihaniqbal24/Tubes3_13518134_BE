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

// check date format dd/mm/yyyy
const checkDate = (text) => {
  let isDate = false;

  if(text.length === 10 && text[2] === '/' && text[5] === '/'){
    const date = parseInt(text.slice(0,2));
    const month = parseInt(text.slice(3, 5));
    const year = parseInt(text.slice(6));
    
    if(date > 0 && month > 0 && year > 0 && date <= 31 && month <= 12 && !isNaN(date) && !isNaN(month) && !isNaN(year)){
      isDate = true;
    }
  }

  return isDate;
}

// check math, doesnt check for the validity of the expression
const checkMath = (text) => {
  let isMath = true;
  const numberChar = "0123456789+-/*()?";


  for(let i = 0; i < text.length ; i++){
    if(text[i] != " " && !numberChar.includes(text[i])){
      isMath = false;
    }
  }
  
  return isMath;
}

const questionType = (text) => {
  // split the test into word
  const words = text.split(" ");
  let type = 'text';
  
  // if one of the word is date or math, return date or math
  // regardless of other words
  words.forEach(element => {
    if(checkDate(element)){
      type = 'dayFromDate';
    }
    else if (checkMath(element)){
      type = 'calculation';
    }
  });
  return type;
}

const askQuestion = asyncWrapper(async (req, res) => {
  const data = await appService.getAllQuestions();
  const { question } = req.body;

  // TODO: parse question buat nentuin pake apa

  const whatToDo = questionType(question);
  let result;

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
