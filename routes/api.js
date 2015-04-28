var express = require('express');
var api = express.Router();
var db = require('../database');

/* GET fields */
api.get('/fields/', function(req, res, next){
    var q_string = 'SELECT * FROM Fields';

    db.select(q_string, [], function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* POST new field */
api.post('/fields/', function(req, res, next){
    var q_string = 'INSERT INTO Fields(fieldName) VALUES(?)';
    var q_values = Object.keys(req.body).map(function(k){return req.body[k];});

    db.insert(q_string, q_values, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET stats by article */
api.get('/stats/:article_id', function(req, res, next) {
    var q_string = 'SELECT * FROM Stats S, Types T '
        + 'WHERE S.typeID = T.typeID AND S.articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* POST new stat for article */
api.get('/stats/:article_id', function(req, res, next) {
    var q_string = 'INSERT INTO Stats(articleID, typeID, tableName) '
        + 'VALUES(?, ?, ?, ?)';
    var q_values = Object.keys(req.params).map(function(k){return req.params(k);});

    db.insert(q_string, q_values, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET users */
api.get('/users/', function(req, res, next) {
    var q_string = 'SELECT email, city, state, zip,'
                + 'position, website, F.fieldName '
                + 'FROM Users U, Fields F WHERE U.fieldID = F.fieldID';

    db.select(q_string, [], function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* POST new user */
api.post('/users/', function(req, res, next) {
    var q_string = 'INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?, ?, '
        + '(SELECT fieldID FROM Fields WHERE fieldName = ?))';
    var q_values = Object.keys(req.body).map(function(k){return req.body[k];});

    db.insert(q_string, q_values, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* PUT updated user info */
api.put('/users/:email', function(req, res, next){
    var q_string = 'UPDATE ';
    var q_values = Object.keys(req.params).map(function(k){return req.params(k);});

    db.update(q_string, q_values, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* DELETE user */
api.delete('/users/:email', function(req, res, next){
    var q_string = '';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.del(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET user info by email */
api.get('/users/:email', function(req, res, next) {
    var q_string = 'SELECT * FROM Users U, Fields F '
        + 'WHERE F.fieldID = U.fieldID AND U.email = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET articles */
api.get('/articles/', function(req, res, next) {
    var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
        + 'WHERE A.articleID = Ab.articleID';
    
    db.select(q_string, [], function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* POST newly authored article */
api.post('/articles/', function(req, res, next) {
    var q_string = '';
    var q_values = Object.keys(req.params).map(function(k){return req.params(k);});

    db.insert(q_string, q_values, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET article by id */
api.get('/articles/:id', function(req, res, next) {
    var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
        + 'WHERE A.articleID = Ab.articleID AND A.articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* PUT updated article by id */
api.put('/articles/:id', function(req, res, next) {
    var q_string = '';
    var q_values = Object.keys(req.params).map(function(k){return req.params(k);});

    db.update(q_string, q_values, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET articles by author (email must be encoded) */
api.get('/articles/:email', function(req, res, next) {
    var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
        + 'WHERE A.articleID = Ab.articleID AND A.authorEmail = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET edits */
api.get('/edits/', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits';

    db.select(q_string, [], function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* POST user edit to an article */
api.post('/edits/:article_id', function(req, res, next) {
});

/* GET edits by author */
api.get('/edits/:email', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits WHERE authorEmail = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET edits by date */
api.get('/edits/:date', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits WHERE date = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET edits by article id */
api.get('/edits/:article_id', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits WHERE articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET abstract by article id */
api.get('/abstracts/:article_id', function(req, res, next) {
    var q_string = 'SELECT * FROM Abstracts WHERE articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* POST new abstract for article */
api.post('/abstracts/:article_id', function(req, res, next) {
    var q_string = 'INSERT INTO Abstracts(content, articleID) VALUES(?, ?)';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.insert(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* GET urlReferences by articleID */
api.get('/urlReferences/:article_id', function(req, res, next) {
    var q_string = 'SELECT * FROM URLReferences WHERE articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(q_string, q_params, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

/* POST urlReference for article */
api.post('/urlReferences/:article_id', function(req, res, next) {
    var q_string = 'INSERT INTO URLReferences VALUES(?,?)';
    var q_values = Object.keys(req.params).map(function(k){return req.params(k);});

    db.insert(q_string, q_values, function(q_res){
        if(q_res.result == 'error'){
            res.statusCode = 500;
            res.send(q_res);
        }
        else res.send(q_res);
    });
});

module.exports = api;
