let mongoose = require('mongoose');

//create survey class
let surveyModel = mongoose.Schema({
  surveyName: String,
  author: String,
  expirationDate: String  //TODO change to datetime variable. String type placeholder for now
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);