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

/* GET Login us page. */
router.get("/login", indexController.displayLoginPage);

/* GET register us page. */
router.get("/register", indexController.displayRegisterPage);

module.exports = router;
