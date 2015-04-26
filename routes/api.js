var express = require('express');
var db = require('../database.js');
var api = express.Router();

/* GET users listing. */
api.get('/users/', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Users AS U, Fields AS F WHERE F.fieldID = U.fieldID;';
            
            connection.query(q_string, function(err, rows, fields){
                if(err){
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err: err.code
                    });
                }
                else{
                    res.send({
                        rows: rows,
                        fields: fields
                    });
                }
            });
        }
        connection.release();
    });
});

/* POST new user */
api.post('/users/', function(req, res, next) {
});

/* GET user info by email */
api.get('/users/:email', function(req, res, next) {
});

/* GET articles */
api.get('/articles/', function(req, res, next) {
    db.getConnection(function(err, connection){
        var q_string = 'SELECT * FROM Articles A, Abstracts Ab, Users U WHERE A.authorEmail == U.email AND A.abstractID == Ab.abstractID';

        connection.query(q_string, function(err, rows){
                res.send(rows);
                connection.release();
        });
    });
});

/* POST newly authored article */
api.post('/articles/', function(req, res, next) {
});

/* GET article by id */
api.get('/articles/:id', function(req, res, next) {
});

/* PUT updated article by id */
api.put('/articles/:id', function(req, res, next) {
});

/* GET articles by author (email must be encoded) */
api.get('/articles/:email', function(req, res, next) {
});

/* GET edits */
api.get('/edits/', function(req, res, next) {
    res.send('edits page');
});

/* POST user edit to an article */
api.post('/edits/', function(req, res, next) {
});

/* GET edits by author */
api.get('/edits/:email', function(req, res, next) {
});

/* GET edits by date */
api.get('/edits/:date', function(req, res, next) {
});

/* GET edits by article id */
api.get('/edits/:article_id', function(req, res, next) {
});


module.exports = api;
