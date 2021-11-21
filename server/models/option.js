let mongoose = require ("mongoose");

let optionModel = mongoose.Schema(
  {
    questionID: String,
    optionsText: String
  },
  {
    collection: "options",
  }
);

module.exports = mongoose.model("Option", optionModel);