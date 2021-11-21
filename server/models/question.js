<<<<<<< HEAD
let mongoose = require ("mongoose");

let questionModel = mongoose.Schema(
  {
    surveyID: String,
    questionText: String,
    description: String
  },
  {
    collection: "questions",
  }
);

module.exports = mongoose.model("Question", questionModel);
=======
let mongoose = require('mongoose');
const survey = require('./survey');

//create question class
let questionModel = mongoose.Schema({
    surveyId: String,  //Added survey ID
    surveyQuestion: String,
    answerOne: String,
    answerTwo: String,
    answerThree: String,
    answerFour: String
    },
    {
      collection: "questions"
    });

module.exports = mongoose.model('Question', questionModel);
>>>>>>> 12bb4c3934b2bae889d8dcd81bfe936bf6c90fb3
