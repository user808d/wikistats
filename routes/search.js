var express = require('express');
var searches = express.Router();

/* GET search page */
searches.get('/', function(req, res, next) {
    res.send('search page');
});

module.exports = searches;
