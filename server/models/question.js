let mongoose = require("mongoose");
const survey = require("./survey"); 

let questionModel = mongoose.Schema(
  {
    surveyID: String,
    surveyQuestion: String, // actual title/text of question
    description: String, // just in case question needs more explanation/description
    multipleChoice: Boolean
  },
  {
    collection: "questions",
  }
);

module.exports = mongoose.model("Question", questionModel);
