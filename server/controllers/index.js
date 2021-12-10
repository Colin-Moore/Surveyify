let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create Survey Model instance
const Survey = require("../models/survey");
const Question = require("../models/question");
const Answer = require("../models/answer");
const Option = require("../models/option");
// create User Model instance
let userModel = require("../models/user");
const answer = require("../models/answer");
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
  let currentDate = new Date().toISOString();
  console.log("date  " + currentDate);
  Survey.find({isPublished: true, expirationDate: {$gte: currentDate}}, (err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(surveyList);
      res.render("index", {
        title: "Current Surveys",
        SurveyList: surveyList,
        username: req.user ? req.user.username : "",
      });
    }
  });
};

module.exports.displayAboutPage = (req, res, next) => {
  res.render("about", {
    title: "About",
    username: req.user ? req.user.username : "",
  });
};

module.exports.displayContactPage = (req, res, next) => {
  res.render("contact", {
    title: "Contact",
    username: req.user ? req.user.username : "",
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      username: req.user ? req.user.username : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error
    if (err) {
      return next(err);
    }
    // user login error
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error
      if (err) {
        return next(err);
      }
      return res.redirect("/survey-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      username: req.user ? req.user.username : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate user
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash("registerMessage", "Registration Error: User Already Exists");
        console.log("ErrorL User Already Exists");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        username: req.user ? req.user.username : "",
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/survey-list");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

module.exports.ShowRespondPage = (req, res, next) => {
  let id = req.params.id;
  Survey.findById(id, (err, currentSurvey) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else{
      Question.find({surveyID: id }, (err, questionList) => {
      if (err) {
        res.end(err);
        return console.error(err);
      }
      else{
        Option.find({surveyID: id}, (err, optionList) => {
          if(err){
            res.end(err);
            return console.error(err);
          }
          else{
 
            //show update view
            res.render("respond", {
            title: currentSurvey.surveyName,
            survey: currentSurvey,
            QuestionList: questionList,
            OptionList: optionList,
            username: req.user ? req.user.username : "",
          });
        };
      });
    };
  });
}
  });
};


module.exports.ProcessRespondPage = (req, res, next) => {
  let id = req.params.id;
  let currentDate = new Date().toISOString();

  let x = 0;

    Question.find({surveyID: id}, (err, currentQuestion) => {
      currentQuestion.forEach(() => {
        if(currentQuestion[x].multipleChoice == true){
          let options = req.body[x];
          let newAnswer = new Answer({
            questionID: currentQuestion[x]._id,
            answerText: options,
            answerDate: currentDate,
          });
          
       Answer.create(newAnswer, (err, newAnswer) => {
      
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            console.log(newAnswer);
          }
        }); 
        }
        else{
          let shortAnswer = "shortAnswer" + x;
          console.log("DSFLKJSDJ    " + currentQuestion[x]._id);
          let answer = req.body[shortAnswer];
          let newAnswer = new Answer({
            questionID: currentQuestion[x]._id,
            answerText: answer,
            answerDate: currentDate,
          });
             
       Answer.create(newAnswer, (err, newAnswer) => {
            if (err) {
            console.log(err);
            res.end(err);
            } else {
          console.log(newAnswer);
        }
       }); 
        }
        x++;
      });
      res.redirect("/home");
    });
  };