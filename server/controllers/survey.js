let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//Create reference to model
let Survey = require("../models/survey");

module.exports.displaySurveyList = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(surveyList);
      res.render("survey/list", {
        title: "Surveys",
        SurveyList: surveyList,
      });
    }
  });
};

module.exports.displayAddPage = (req, res, next) => {
  res.render("survey/add", {
    title: "Add Survey",
  });
};

module.exports.processAddPage = (req, res, next) => {
  let newSurvey = Survey({
    surveyName: req.body.surveyName,
    author: req.body.author,
    expirationDate: req.body.expirationDate,
  });

  Survey.create(newSurvey, (err, Survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh
      res.redirect("/home");
    }
  });
};

module.exports.displayUpdatePage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, updateSurvey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show update view
      res.render("survey/update", {
        title: "Update Survey",
        survey: updateSurvey,
      });
    }
  });
};

module.exports.processUpdatePage = (req, res, next) => {
  let id = req.params.id;

  let updatedSurvey = Survey({
    _id: id,
    surveyName: req.body.surveyName,
    author: req.body.author,
    expirationDate: req.body.expirationDate,
  });

  Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh survey list
      res.redirect("/home");
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  Survey.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh survey list
      res.redirect("/home");
    }
  });
};
