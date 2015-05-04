var express = require('express');
var root = express.Router();
var db = require('../database');
var articles = require('./api/articles')(db);
var users = require('./api/users')(db);
var urlRef = require('./api/urlReferences')(db);

function requireLogin (req, res, next) {
  if (!req.session_state.user) {
    res.redirect('/signin');
  } else {
    next();
  }
};

/* GET home page. */
root.get('/', articles.all, function(req, res, next){
    res.render('index', {
        title: 'Home',
        articles: res.locals.articles
    });
});

root.get('/articles/:articleID', requireLogin, articles.find, urlRef.find,
         function(req, res, next){
             var article = res.locals.articles[0];
             var refs = res.locals.urlReferences;
             res.render('articles/show', {
                 title: article.title,
                 article: article,
                 tableName: article.tableName,
                 typeName: article.typeName,
                 refs: refs
             });
});

root.route('/signin')
    .get(function(req, res, next){
        res.render('signin', {
            title: 'Sign In'
        });
    })
    .post(users.auth, function(req, res, next){
        if(req.session_state && req.session_state.user){
            res.redirect('/');
        }
        else{
            res.render('signin', {
                title: 'Sign In',
                error: 'Invalid Email or Password'});
        }
    });

root.route('/signout')
    .get(function(req, res, next){
        req.session_state.reset();
        res.redirect('/');
    });

root.route('/signup')
    .get(function(req, res, next){
        res.render('signup', {
            title: 'Sign Up'
        });
    })
    .post(users.add, function(req, res, next){
        if(res.locals.result){
            res.redirect('/signin');
        }
        else{
            res.render('signup', {
                title: 'Sign Up',
                error: 'Please check fields for errors.'
            });
        }
    });

root.route('/test/')
    .get(function(req, res, next){
        res.render('test');         
    });

root.route('/search')
    .get(function(req, res, next){
        res.render('search');
    });

root.route('/dashboard/:email')
    .get(requireLogin, users.find, function(req, res, next){
        var user = res.locals.user;
        res.render('dashboard/user', {
            title: 'Dashboard',
            user: user
        });
    })
    .post(requireLogin, users.update, function(req, res, next){
        res.redirect('/dashboard/' + res.locals.user.email);
    });

module.exports = root;
