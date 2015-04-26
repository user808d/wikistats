var express = require('express');
var db = require('../database');
var searches = express.Router();

/* GET search page */
searches.get('/', function(req, res, next) {
    res.send('search page');
});

module.exports = searches;
