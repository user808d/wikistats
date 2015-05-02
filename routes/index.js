var express = require('express');
var root = express.Router();

/* GET home page. */
root.get('/', function(req, res, next) {
    res.render('index', { title: 'Home', site: 'WikiStats' });
});

module.exports = root;
