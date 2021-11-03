var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');


/* GET home page. */
router.get('/', indexController.displayIndexPage);

/* GET error page. */
router.get('/error', indexController.displayErrorPage);

module.exports = router;