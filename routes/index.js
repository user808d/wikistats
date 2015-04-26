var express = require('express');
var db = require('../database');
var root = express.Router();

/* GET home page. */
root.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

module.exports = root;
