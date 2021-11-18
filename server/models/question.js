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