let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//Create reference to model
let Survey = require("../models/survey");
let Question = require("../models/question");
const question = require("../models/question");

module.exports.displaySurveyList = (req, res, next) => {
  Survey.find({ userID: req.user.id }, (err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(surveyList);
      res.render("survey/survey-list", {
        title: "My Surveys",
        SurveyList: surveyList,
        username: req.user ? req.user.username : "",
      });
    }
  });
};

// Displays list of questions in a survey
module.exports.showSurvey = (req, res, next) => {
  let id = req.params.id;
  Question.find({ surveyID: id }, (err, questionList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(questionList);
      res.render("survey/view", {
        title: "Surveys",
        QuestionList: questionList,
        surveyID: id,
        username: req.user ? req.user.username : "",
      });
    }
  });
};

// ****************
// Question section
// ****************
module.exports.displayQuestionPage = (req, res, next) => {
  let id = req.params.id;
  Survey.findById(id, (err, survey) => {
    let newQuestion = new Question({
      surveyID: id,
      surveyQuestion: req.body.surveyQuestion,
      description: req.body.description,
    });
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(survey);
      res.render("survey/addquestion", {
        title: "Add Question",
        question: newQuestion,
        username: req.user ? req.user.username : "",
      });
    }
  });
};

module.exports.processQuestionPage = (req, res, next) => {
  id = req.params.id;
  let newQuestion = new Question({
    surveyID: id,
    surveyQuestion: req.body.surveyQuestion,
    description: req.body.description,
  });

  Question.create(newQuestion, (err, newQuestion) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(newQuestion);
      res.redirect("/survey-list/update/" + req.params.id);
    }
  });
};

// display edit question page
module.exports.displayEditQuestion = (req, res, next) => {
  let id = req.params.id;
  Question.findById(id, (err, questiontoUpdate) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("survey/addquestion", {
        title: "Edit Question",
        question: questiontoUpdate,
        username: req.user ? req.user.username : "",
      });
    }
  });
};

// Edit question function
module.exports.processEditQuestion = (req, res, next) => {
  let id = req.params.id;

  let updatedQuestion = Question({
    _id: id,
    surveyID: req.body.surveyID,
    surveyQuestion: req.body.surveyQuestion,
  });

  Question.updateOne({ _id: id }, updatedQuestion, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("back");
    }
  });
};

// Delete question function
module.exports.deleteQuestion = (req, res, next) => {
  let id = req.params.id;

  Question.remove({ _id: id }, (err) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("back");
    }
  });
};
//
// END QUESTION SECTION
//

module.exports.displayAddPage = (req, res, next) => {
  res.render("survey/add", {
    title: "Add Survey",
    username: req.user ? req.user.username : "",
  });
};

module.exports.processAddPage = (req, res, next) => {
  let newSurvey = Survey({
    surveyName: req.body.surveyName,
    userID: req.user._id,
    username: req.user.username,
    expirationDate: req.body.expirationDate,
  });

  Survey.create(newSurvey, (err, Survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh
      res.redirect("/survey-list");
    }
  });
};

module.exports.processSavePage = (req, res, next) => {
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
      res.redirect("/survey-list/update/" + Survey._id);
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
      Question.find({ surveyID: id }, (err, questionList) => {
        if (err) {
          return console.error(err);
        } else {
          //show update view
          res.render("survey/update", {
            title: "Update Survey",
            survey: updateSurvey,
            QuestionList: questionList,
            username: req.user ? req.user.username : "",
          });
        }
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
      res.redirect("/survey-list");
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
      res.redirect("/survey-list");
    }
  });
};

/*Jeffrey Sy 980045498 */
