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