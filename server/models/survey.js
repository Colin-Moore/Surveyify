let mongoose = require("mongoose");

//create survey class
let surveyModel = mongoose.Schema(
  {
    surveyName: String,
    authorID: String,
    description: String,
    expirationDate: Date, //TODO String type placeholder for now. change to datetime?
  },
  {
    collection: "surveys",
  }
);

module.exports = mongoose.model("Survey", surveyModel);
