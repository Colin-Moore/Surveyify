let express = require("express");
let router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);
router.get("/home", indexController.displayHomePage);

/* GET about page. */
router.get("/about", indexController.displayAboutPage);

/* GET contact us page. */
router.get("/contact", indexController.displayContactPage);

/* GET Login page. */
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post("/login", indexController.processLoginPage);

/* GET register page. */
router.get("/register", indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post("/register", indexController.processRegisterPage);

/* GET Route to perform Logout */
router.get("/logout", indexController.performLogout);

/* GET Route Respond */
router.get("/respond", indexController.displayRespondPage);

module.exports = router;
