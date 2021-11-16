let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// create Survey Model instance
const Survey = require("../models/survey");

module.exports.displayHomePage = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(surveyList);
      res.render("index", {
        title: "Current Surveys",
        SurveyList: surveyList,
      });
    }
  });
};

module.exports.displayAboutPage = (req, res, next) => {
  res.render("about", {
    title: "About",
  });
};

module.exports.displayContactPage = (req, res, next) => {
  res.render("contact", {
    title: "Contact",
  });
};
