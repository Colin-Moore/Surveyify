let mongoose = require ("mongoose");

let userModel = mongoose.Schema(
  {
    fullName: String,
    password: String,
    email: String
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userModel);