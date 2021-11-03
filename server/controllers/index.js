let express = require('express');
let router = express.Router();



module.exports.displayIndexPage = (req, res, next) => {
    res.render('index', { title: 'Index' });
}

module.exports.displayErrorPage = (req, res, next) => {
    res.render('error', {title: "Error"});
}
