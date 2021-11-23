let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

let surveyController = require("../controllers/survey");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET route for Survey List page - READ Operation */
router.get("/", requireAuth, surveyController.displaySurveyList);

/* GET route for displaying ADD page - CREATE Operation */
router.get("/add", requireAuth, surveyController.displayAddPage);

/* POST route for processing ADD page - CREATE Operation */
router.post("/add", requireAuth, surveyController.processAddPage);

/* GET route for displaying UPDATE page - UPDATE Operation */
router.get("/update/:id", requireAuth, surveyController.displayUpdatePage);

/* POST route for processing UPDATE page - UPDATE Operation */
router.post("/update/:id", requireAuth, surveyController.processUpdatePage);

/* GET route to perform deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, surveyController.performDelete);

/* GET route for displaying ADD QUESTION page */
router.get("/question/:id", requireAuth, surveyController.displayQuestionPage);

/* POST route for ADD QUESTION page - CREATE operation */
router.post("/question/:id", requireAuth, surveyController.processQuestionPage);

/* GET route to perform deletion for questions - DELETE Operation */
router.get("/deleteQ/:id", requireAuth, surveyController.deleteQuestion);

/* GET route to edit questions - UPDATE operation */
router.get("/updateQ/:id", requireAuth, surveyController.displayEditQuestion);

/* POST route for editing questions - UPDATE Operation */
router.post("/updateQ/:id", requireAuth, surveyController.processEditQuestion);

/* GET route for displaying VIEW page - READ */
router.get("/view/:id", surveyController.showSurvey);

module.exports = router;
