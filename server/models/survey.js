let mongoose = require("mongoose");

//create survey class
let surveyModel = mongoose.Schema(
  {
    surveyName: String,
    userID: String,
    username: String,
    description: String,
    isPublished: Boolean,
    expirationDate: Date, //TODO String type placeholder for now. change to datetime?
  },
  {
    collection: "surveys",
  }
);

module.exports = mongoose.model("Survey", surveyModel);
