let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../models/survey');


//TODO create survey list page + routing
module.exports.displaySurveyList = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if(err) {
      return console.error(err);
    } else {
      res.render('survey/list', {title: 'Surveys', SurveyList: surveyList});
    }
  });
}

//TODO create add survey page + routing
module.exports.displayAddSurvey = (req, res, next) => { 
  res.render('survey/add', {title: 'New Survey'})
}

module.exports.processAddSurvey = (req, res, next) => {
  let newSurvey = Survey({
    "surveyName": req.body.surveyName,
    "author": req.body.author,    
    "expirationDate": req.body.expirationDate
  });

  Survey.create(newSurvey, (err, Survey) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('survey/list');
    }
  });
}


//TODO create edit survey page + routing
module.exports.displayEditSurvey = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, surveyToUpdate) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('survey/edit', {title: 'Edit Survey', survey: surveyToUpdate})
    }
  });
}

module.exports.processEditSurvey = (req, res, next) => {
  let id = req.params.id;
  let updatedSurvey = Survey({
    "_id": id,
    "surveyName": req.body.surveyName,
    "author": req.body.author,
    "expirationDate": req.body.expirationDate
  });

  Survey.updateOne({_id: id}, updatedSurvey, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('survey/list');
    }
  });
}

module.exports.performDeleteSurvey = (req, res, next) => {
  let id = req.params.id;

  Survey.remove({_id: id}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('survey/list');
    }
  });
}
