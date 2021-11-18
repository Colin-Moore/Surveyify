let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let surveyController = require("../controllers/survey");

/* GET route for Survey List page - READ Operation */
router.get("/", surveyController.displaySurveyList);

/* GET route for displaying ADD page - CREATE Operation */
router.get("/add", surveyController.displayAddPage);

/* POST route for processing ADD page - CREATE Operation */
router.post("/add", surveyController.processAddPage);

/* GET route for processing UPDATE page - UPDATE Operation */
router.get("/update/:id", surveyController.displayUpdatePage);

/* POST route for processing UPDATE page - UPDATE Operation */
router.post("/update/:id", surveyController.processUpdatePage);

/* GET route to perform deletion - DELETE Operation */
router.get("/delete/:id", surveyController.performDelete);

/* GET route for displaying ADD QUESTION page */
router.get("/question/:id", surveyController.displayQuestionPage);

/* POST route for ADD QUESTION page - CREATE operation */
router.post("/question/:id", surveyController.processQuestionPage);

/* GET route for displaying VIEW page - READ */
router.get("/view/:id", surveyController.showSurvey);

module.exports = router;
