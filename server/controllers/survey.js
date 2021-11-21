let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//Create reference to model
let Survey = require("../models/survey");
let Question = require("../models/question");

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



module.exports.showSurvey = (req, res, next) => {
  let id = req.params.id;
  Question.find({ surveyId: id}, (err, questionList)=>
  {
    if (err) {
      return console.error(err);
    } else {
      console.log(questionList);
      res.render("survey/view", {
        title: "Surveys",
        QuestionList: questionList,
      });
    }
  });
};

module.exports.displayQuestionPage = (req, res, next)=> {
  let id = req.params.id;
  Survey.findById(id, (err, survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(survey);
      res.render("survey/question", {
      title: "Add Question"
      });
    };
  });
};

module.exports.processQuestionPage = (req, res, next) => {
  id = req.params.id;
  let newQuestion = new Question({
    surveyId: id,
    surveyQuestion: req.body.surveyQuestion,
    answerOne: req.body.answerOne,
    answerTwo: req.body.answerTwo,
    answerThree: req.body.answerThree,
    answerFour: req.body.answerFour
  });

  Question.create(newQuestion, (err, newQuestion) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(newQuestion);
      res.redirect("./"+id);
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

/*Jeffrey Sy 980045498 */