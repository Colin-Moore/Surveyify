let mongoose = require ("mongoose");

let answerModel = mongoose.Schema(
  {
    surveyID: String,
    questionID: String,
    optionID: String,
    userID: String,
    answerText: String,
    answerDate: Date, 
  },
  {
    collection: "answers", 
  }
);

module.exports = mongoose.model("Answer", answerModel);