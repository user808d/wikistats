var express = require('express');
var root = express.Router();
var db = require('../database');
var articles = require('./api/articles')(db);
var users = require('./api/users')(db);

function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

/* GET home page. */
root.get('/', articles.all, function(req, res, next) {
    res.render('index', {
        title: 'Home',
        site: 'WikiStats',
        articles: req.locals.articles
    });
});

root.get('/articles/:articleID', articles.find, function(req, res, next){
    res.render('articles/show', {
        title: req.locals.articles[0].title,
        site: 'WikiStats',
        article: req.locals.articles[0]
    });
});

root.route('/login')
    .get(function(req, res, next){
        res.render('login', {
            title: 'Login',
            site: 'WikiStats'
        });
    })
    .post(users.auth, function(req, res, next){
        if(req.session && req.session.user){
            res.redirect('/');
        }
        else{
            res.render('login', {error: 'Invalid Email or Password'});
        }
    });

root.route('/logout')
    .get(function(req, res, next){
        res.session.reset();
        res.redirect('/');
    });

root.route('/test')
    .get(function(req, res, next){
        res.render('test');
    });

module.exports = root;
