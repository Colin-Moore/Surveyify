let mongoose = require ('mongoose');

// create answer model
let answerModel = mongoose.Schema({
  answerValue: String,
  surveyID: String,
  questionID: String,
},
{
  collection: 'answers'
});

module.exports = mongoose.model('Answer', answerModel);