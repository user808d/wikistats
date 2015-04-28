var express = require('express');
var db = require('../database');
var api = express.Router();

/* GET fields */
api.get('/fields/', function(req, res, next){
    var q_string = 'SELECT * FROM Fields';
});

/* POST new field */
api.post('/fields/', function(req, res, next){
    var q_string = 'INSERT INTO Fields VALUES(?)';
    var q_values = Object.keys(req.body).map(function(k){return req.body[k];});

    db.insert(res, q_string, q_values);
});

/* GET users */
api.get('/users/', function(req, res, next) {
    var q_string = 'SELECT email, city, state, zip,'
                + 'position, website, F.fieldName '
                + 'FROM Users U, Fields F WHERE U.fieldID = F.fieldID';

    db.select(res, q_string, []);
});

/* POST new user */
api.post('/users/', function(req, res, next) {
    var q_string = 'INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?, ?, '
        + '(SELECT fieldID FROM Fields WHERE fieldName = ?))';
    var q_values = Object.keys(req.body).map(function(k){return req.body[k];});
    
    db.insert(res, q_string, q_values);
});

/* PUT updated user info */
api.put('/users/:email', function(req, res, next){
});

/* DELETE user */
api.delete('/users/:email', function(req, res, next){
});

/* GET user info by email */
api.get('/users/:email', function(req, res, next) {
    var q_string = 'SELECT * FROM Users U, Fields F '
        + 'WHERE F.fieldID = U.fieldID AND U.email = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});
    db.select(res, q_string, q_params);
});

/* GET articles */
api.get('/articles/', function(req, res, next) {
    var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
        + 'WHERE A.articleID = Ab.articleID';

    db.select(res, q_string, []);
});

/* POST newly authored article */
api.post('/articles/', function(req, res, next) {
});

/* GET article by id */
api.get('/articles/:id', function(req, res, next) {
    var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
        + 'WHERE A.articleID = Ab.articleID AND A.articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(res, q_string, q_params);
});

/* PUT updated article by id */
api.put('/articles/:id', function(req, res, next) {
});

/* GET articles by author (email must be encoded) */
api.get('/articles/:email', function(req, res, next) {
    var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
        + 'WHERE A.articleID = Ab.articleID AND A.authorEmail = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(res, q_string, q_params);
});

/* GET edits */
api.get('/edits/', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits';

    db.select(res, q_string, []);
});

/* POST user edit to an article */
api.post('/edits/:article_id', function(req, res, next) {
});

/* GET edits by author */
api.get('/edits/:email', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits WHERE authorEmail = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(res, q_string, q_params);
});

/* GET edits by date */
api.get('/edits/:date', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits WHERE date = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(res, q_string, q_params);
});

/* GET edits by article id */
api.get('/edits/:article_id', function(req, res, next) {
    var q_string = 'SELECT * FROM Edits WHERE articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(res, q_string, q_params);
});

/* GET stats for an article */
api.get('/stats/:article_id', function(req, res, next) {
    var q_string = 'SELECT * FROM Stats S, Types T'
        + 'WHERE S.typeID = T.typeID AND S.articleID = ?';
    var q_params = Object.keys(req.params).map(function(k){return req.params(k);});

    db.select(res, q_string, q_params);
});

module.exports = api;
