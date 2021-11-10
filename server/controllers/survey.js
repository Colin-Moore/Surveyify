let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../models/survey');


//TODO create survey list page
module.exports.displaySurveyList = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if(err){
      return console.error(err);
    } else {
      res.render('survey/list', {title: 'Surveys', SurveyList: surveyList});
    }
  })
}


//TODO create add survey page
module.exports.displayAddSurvey = (req, res, next) => { 
  res.render('survey/add', {title: 'New Survey'})
}

module.exports.processAddSurvey = (req, res, next) => {
  let newSurvey = Survey({
    "author": req.body.author,
    "surveyType": req.body.surveyType,
    "expirationDate": req.body.expirationDate
  });

  Survey.create(newSurvey, (err, Survey) => {
    if(err){
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/survey/list');
    }
  });
}


