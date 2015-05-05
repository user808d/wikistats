var express = require('express');
var api = express.Router();
var db = require('../database');
var fields = require('./api/fields')(db);
var users = require('./api/users')(db);
var types = require('./api/types')(db);
var articles = require('./api/articles')(db);
var stats = require('./api/stats')(db);
var edits = require('./api/edits')(db);
var abstracts = require('./api/abstracts')(db);
var urlRef = require('./api/urlReferences')(db);

var send = function(req, res, next){ res.send(res.locals); };

api.route('/fields')
    .get(fields.all, send) //get all fields
    .post(fields.add, send); //new field

api.route('/users')
    .get(users.all, send) //get all users
    .post(users.add, send); //new user
api.route('/users/:email')
    .get(users.find, send) //find user by email
    .post(users.update, send); //update user
api.route('/users/delete/:email')
    .get(users.delete, send); //remove user

api.route('/types')
    .get(types.all, send); //get all types

api.route('/articles')
    .get(articles.all, send) //get all articles
    .post(articles.add, send); //new article
api.route('/articles/:articleID')
    .get(articles.find, send) //find article by id
    .post(articles.update, send); //update article
api.route('/articles/delete/:articleID')
    .get(articles.delete, send); //remove article
api.route('/articles/author/:email')
    .get(articles.find, send); //find article by email
api.route('/articles/date/:pubDate')
    .get(articles.find, send); //get articles by date

api.route('/stats')
    .post(stats.add, send); //new stat for article
api.route('/stats/:articleID')
    .get(stats.find, send); //find stat by articleID

api.route('/edits')
    .get(edits.all, send) //get all edits
    .post(edits.add, send); //new article edit
api.route('/edits/author/:email')
    .get(edits.find, send); //get all user edits by email
api.route('/edits/date/:editDate')
    .get(edits.find, send); //get all edits by date
api.route('/edits/article/:articleID')
    .get(edits.find, send); //get all edits on an article

api.route('/abstracts')
    .post(abstracts.add, send); //add abstract to article
api.route('/abstracts/:articleID')
    .get(abstracts.find, send) //find an abstract by article id
    .post(abstracts.update, send); //update an article's abstract
api.route('/abstracts/delete/:articleID')
    .post(abstracts.delete, send); //delete abstract by abstractID

api.route('/urlReferences')
    .post(urlRef.add, send); //add urlReference
api.route('/urlReferences/:articleID')
    .get(urlRef.find, send) //find urlReference by articleID
    .post(urlRef.update, send); //update urlReference
api.route('/urlReferences/delete/:articleID')
    .post(urlRef.delete, send); //delete url by url and articleID

api.route('/search')
    .post(articles.findLike, send); //find articles similar to string provided

/* POST csv data */
api.post('/upload/', function(req, res, next) {
    var q_string = 'CREATE TABLE IF NOT EXISTS ?? '
        + '( vid INT AUTO_INCREMENT, ';
    req.body = JSON.parse(req.body.data);
    res.locals = res.locals || {};
    var q_values = [];
    res.locals.cols = [];
    q_values.push(req.body.title);

    for(var i in req.body.headers)
        for(var k in req.body.headers[i]){
            q_string += '?? ' + req.body.headers[i][k] + ', ';
            q_values.push(k);
            res.locals.cols.push(k);
        }
    
    q_string += 'PRIMARY KEY ( vid ))';

    db.insert(q_string, q_values, function(q_res){
        if(q_res.result == 'q_error'){
            res.status(500).send(q_res);
        }
        else{
            next();
        }
        });
}, function(req, res, next){
    var q_string = 'INSERT INTO ??(??) VALUES ?';
    
    db.select(q_string, [req.body.title, res.locals.cols, req.body.rows],
              function(q_res){
                  if(q_res.result == 'q_error'){
                      console.log(q_res);
                      res.status(500).send(q_res);
                  }
                  else{
                      console.log(q_res);
                      res.locals.result = q_res.result;
                      next();
                  }
              });
}, send);

api.get('/metadata/:tableName', function(req, res, next){
    var q_string = 'DESCRIBE ??';
    res.locals = res.locals || {};
    res.locals.headers = [];

    db.select(q_string, req.params.tableName, function(q_res){
        if(q_res.result == 'q_error'){
            res.status(500).send(q_res);
        }
        else{
            for(var i in q_res.rows)
                res.locals.headers.push(
                    [q_res.rows[i]['Field'],
                     q_res.rows[i]['Type']]
                );
            next();
        }
    });
}, send);

api.get('/data/:tableName', function(req, res, next){
    var q_string = 'SELECT * FROM ??';
    res.locals = res.locals || {};
    res.locals.rows = [];
    db.select(q_string, req.params.tableName, function(q_res){
        if(q_res.result == 'q_error'){
            res.status(500).send(q_res);
        }
        else{
            for(var i in q_res.rows){
                var values = [];
                for(var k in q_res.rows[i]){
                    values.push(q_res.rows[i][k]);
                }
                res.locals.rows.push(values);
            }
            next();
        }        
    });
}, send);

module.exports = api;
