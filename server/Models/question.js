let mongoose = require('mongoose');

//create question class
let questionModel = mongoose.Schema({
  questionText: String,
  questionType: String,
  surveyID: String,
  answerID: String,
},
{
  collection: "questions"
});

module.exports = mongoose.model('Question', questionModel);