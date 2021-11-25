
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

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


//FIX THIS!!!!

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
    multipleChoice: true
  });
   
  Question.create(newQuestion, (err, newQuestion) => {
    if (err) {
      console.log(err);
      res.end(err);
      }
      else
      {
        let questionId = newQuestion._id;
        let options = req.body.optiontext;
        let x = 0
        options.forEach(() =>{
          
          let newOption = new Option({
            questionID: questionId,
            optionsText: options[x]
          });
          Option.create(newOption, (err, newOption) => {
            if(err){
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
    } 
    else{
      //if the question being edited is not multiple choice, do this
      if(questiontoUpdate.multipleChoice != true){
        res.render("survey/addquestion", {
          title: "Edit Question",
          question: questiontoUpdate,
          username: req.user ? req.user.username : "",
        });
      }
      else{    
        //if the question being edited is multiple choice, do this.
        //find the entries in the object table that have the matching questionID
        Option.find({questionID: id}, (err, optionList)=> {
          if(err){
            console.log(err);
            res.end(err);
          }
          else{
            console.log(optionList)
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
        } 
        else 
        {
          Question.findById(id, (err, question) => {
            let returnSurvey = question.surveyID;

            // if the question being edited is multiple choice, do this
            if(question.multipleChoice == true){
              //find the items in the option table that have the current questionID stored
              Option.find({questionID: id}, (err, option) => {
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
                Option.updateOne({_id: updateID}, updatedOption, (err) => {
                  if(err){
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
    if(question.multipleChoice == true){
      //find the items in the option table that have the current questionID stored
      Option.find({questionID: id}, (err, option) => {
      let x = 0;
      //get a list of all the optiontext field values on the page
      let optionList = req.body.optiontext;
      //foreach loop to go through each option item in the table
      option.forEach(() => {
        //get the id of the current option object to remove
        let updateID = option[x]._id;

        //update option object
        Option.remove({_id: updateID}, (err) => {
          if(err){
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
