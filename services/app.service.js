const status = require('http-status');
const moment = require('moment');
// const { Sequelize, Op } = require('sequelize');
const db = require('../database/models');
const ApiError = require('../utils/ApiError');
// const { offsetPaginate } = require('../utils/pagination');

const { Dictionary } = db;

/**
 * Prerequisite: user data has already been sanitized and validated
 */

const createQuestion = async (data) => {
  const { question, answer } = data;
  const qna = await Dictionary.create({
    question,
    answer,
  });
  return qna;
};

const getAllQuestions = async () => {
  const QnAs = await Dictionary.findAll({
    attributes: ['question', 'answer'],
  });

  return QnAs;
};

const getQuestion = async (quest) => {
  const question = await Dictionary.findByPk(quest, {
    attributes: ['question', 'answer'],
  });
  return question;
};

const updateQuestion = async (question, data) => {
  const count = await Dictionary.update(data, {
    where: {
      question,
    },
  });
  if (count[0] === 0) {
    throw new ApiError(
      status.NOT_FOUND,
      'Oops! Data QnA yang ingin diubah tidak ditemukan.',
    );
  }
  const getQuest = await getQuestion(question);
  return getQuest;
};

const deleteQuestion = async (question) => {
  const count = await Dictionary.destroy({
    where: {
      question,
    },
  });
  if (count === 0) {
    throw new ApiError(
      status.NOT_FOUND,
      'Data QnA tidak ada atau sudah dihapus sebelumnya.',
    );
  }
};

const calculateNumber = async (question) => {
  const data = question; // parse equation here
  const result = data; // calculate equation here
  return result;
};

const getDayFromDate = async (question) => {
  const day = moment(question, 'dddd', 'id');
  return `Hari ${day}`;
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  calculateNumber,
  getDayFromDate,
};
