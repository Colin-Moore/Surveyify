let mongoose = require ("mongoose");

let optionModel = mongoose.Schema(
  {
    questionID: String,
    surveyID: String,
    optionsText: String,
    optionsValue: Number
  },
  {
    collection: "options",
  }
);

module.exports = mongoose.model("Option", optionModel);