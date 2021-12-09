let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let XLSX = require("xlsx");
let fs = require("fs");

//Create reference to model
let Survey = require("../models/survey");
let Question = require("../models/question");
let Answwer = require("../models/answer");
let Option = require("../models/option");

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
        title: "Survey Responses",
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

module.exports.displayMCQuestionPage = (req, res, next) => {
  let id = req.params.id;
  Survey.findById(id, (err, survey) => {
    let newQuestion = new Question({
      surveyID: id,
      surveyQuestion: req.body.surveyQuestion,
      description: req.body.description,
    });
    res.render("survey/addMCquestion", {
      title: "Add Question",
      question: newQuestion,
      OptionList: "Empty",
      username: req.user ? req.user.username : "",
    });
  });
};

//process multiple choice page
module.exports.processMCQuestionPage = (req, res, next) => {
  id = req.params.id;
  let newQuestion = new Question({
    surveyID: id,
    surveyQuestion: req.body.surveyQuestion,
    description: req.body.description,
    multipleChoice: true,
  });

  Question.create(newQuestion, (err, newQuestion) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      let questionId = newQuestion._id;
      let options = req.body.optiontext;
      let x = 0;
      options.forEach(() => {
        let newOption = new Option({
          questionID: questionId,
          optionsText: options[x],
        });
        Option.create(newOption, (err, newOption) => {
          if (err) {
            console.log(err);
            res.end(err);
          }
        });
        x++;
      });
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
      //if the question being edited is not multiple choice, do this
      if (questiontoUpdate.multipleChoice != true) {
        res.render("survey/addquestion", {
          title: "Edit Question",
          question: questiontoUpdate,
          username: req.user ? req.user.username : "",
        });
      } else {
        //if the question being edited is multiple choice, do this.
        //find the entries in the object table that have the matching questionID
        Option.find({ questionID: id }, (err, optionList) => {
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            console.log(optionList);
            res.render("survey/addMCquestion", {
              title: "Edit Question",
              question: questiontoUpdate,
              OptionList: optionList,
              username: req.user ? req.user.username : "",
            });
          }
        });
      }
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
    multipleChoice: req.params.multipleChoice,
  });
  Question.updateOne({ _id: id }, updatedQuestion, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      Question.findById(id, (err, question) => {
        let returnSurvey = question.surveyID;

        // if the question being edited is multiple choice, do this
        if (question.multipleChoice == true) {
          //find the items in the option table that have the current questionID stored
          Option.find({ questionID: id }, (err, option) => {
            let x = 0;
            //get a list of all the optiontext field values on the page
            let optionList = req.body.optiontext;
            //foreach loop to go through each option item in the table
            option.forEach(() => {
              //get the id of the current option object to update
              let updateID = option[x]._id;

              let updatedOption = Option({
                _id: updateID,
                optionsText: optionList[x],
              });
              //update option object
              Option.updateOne({ _id: updateID }, updatedOption, (err) => {
                if (err) {
                  console.log(err);
                  res.end(err);
                }
              });
              x++;
            });
          });
        }
        res.redirect("/survey-list/update/" + returnSurvey);
      });
    }
  });
};

// Delete question function
module.exports.deleteQuestion = (req, res, next) => {
  let id = req.params.id;

  Question.findById(id, (err, question) => {
    // if the question being removed is multiple choice, do this
    if (question.multipleChoice == true) {
      //find the items in the option table that have the current questionID stored
      Option.find({ questionID: id }, (err, option) => {
        let x = 0;
        //get a list of all the optiontext field values on the page
        let optionList = req.body.optiontext;
        //foreach loop to go through each option item in the table
        option.forEach(() => {
          //get the id of the current option object to remove
          let updateID = option[x]._id;

          //update option object
          Option.remove({ _id: updateID }, (err) => {
            if (err) {
              console.log(err);
              res.end(err);
            }
          });
          x++;
        });
      });
    }
  });
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
    isPublished: true,
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
    userID: req.user._id,
    username: req.user.username,
    expirationDate: req.body.expirationDate,
    isPublished: false,
  });

  Survey.create(newSurvey, (err, newSurvey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh
      res.redirect("/survey-list");
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

// Publish a survey that has been saved and not published
module.exports.publishSavedSurvey = (req, res, next) => {
  let id = req.params.id;

  let updatedSurvey = Survey({
    _id: id,
    surveyName: req.body.surveyName,
    userID: req.user.userID,
    userName: req.user.userName,
    expirationDate: req.body.expirationDate,
    isPublished: true,
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

module.exports.processUpdatePage = (req, res, next) => {
  let id = req.params.id;

  let updatedSurvey = Survey({
    _id: id,
    surveyName: req.body.surveyName,
    userID: req.user.userID,
    userName: req.user.userName,
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

module.exports.downloadSurvey = (req, res, next) => {
  let filename = "survey_results.xlsx";

  //Placeholder for JSON array of responses
  let testData = [
    {
      Question: "What is your favourite colour?",
      Option1: "Red",
      Response1: "2",
      Option2: "Blue",
      Response2: "3",
      Option3: "Yellow",
      Response3: "4",
      Option4: "Green",
      Response4: "5",
    },
    {
      Question: "What is your favourite food?",
      Option1: "Chocolate",
      Response1: "4",
      Option2: "Cake",
      Response2: "2",
      Option3: "Cookies",
      Response3: "5",
    },
    {
      Question: "What is your favourite holiday?",
      Option1: "Christmas",
      Response1: "10",
      Option2: "Halloween",
      Response2: "8",
      Option3: "Thanksgiving",
      Response3: "5",
    },
    {
      Question: "What is your favourite day of the week?",
      Option1: "Monday",
      Response1: "0",
      Option2: "Tuesday",
      Response2: "2",
      Option3: "Wednesday",
      Response3: "3",
      Option4: "Thursday",
      Response4: "4",
      Option5: "Friday",
      Response5: "6",
      Option6: "Saturday",
      Response6: "8",
      Option7: "Sunday",
      Response7: "6",
    },
  ];

  //Create new excel workbook
  let workbook = XLSX.utils.book_new();

  //Create new excel work sheet with responses
  let worksheet = XLSX.utils.json_to_sheet(testData);

  //Writes excel file and saves to server
  XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Results");
  XLSX.writeFile(workbook, filename);

  //Downloads file to client computer from server
  res.download(filename, (err) => {
    if (err) {
      console.log(err);
    }
    //Deletes file from server
    fs.unlink(filename, () => {
      console.log("Temp file deleted");
    });
  });
};

/*Jeffrey Sy 980045498 */
