let mongoose = require('mongoose');

//create survey class
let surveyModel = mongoose.Schema({
  author: String,
  surveyType: String,
  expirationDate: String
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);