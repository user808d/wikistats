var express = require('express');
var db = require('../database');
var auth = express.Router();

/* GET login page */
auth.get('/', function(req, res, next) {
    res.send('login page');
});

module.exports = auth;
