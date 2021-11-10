let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if(err){
      return console.error(err);
    } else {
      res.render('survey/list', {title: 'Surveys', SurveyList: surveyList});
    }
  })
}