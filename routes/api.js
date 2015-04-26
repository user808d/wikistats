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
            var q_string = 'SELECT * FROM Users U, Fields F WHERE F.fieldID = U.fieldID;';
            
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
                        users: JSON.stringify(rows)
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

/* PUT updated user info */
api.put('/users/:id', function(req, res, next){
});

/* GET user info by email */
api.get('/users/:email', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Users U, Fields F WHERE F.fieldID = U.fieldID AND U.email = ?';
            var email = req.params.email;
            
            connection.query(q_string, [email], function(err, rows, fields){
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
                        users: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

/* GET articles */
api.get('/articles/', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Articles A, Abstracts Ab WHERE A.articleID = Ab.articleID';
            
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
                        articles: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

/* POST newly authored article */
api.post('/articles/', function(req, res, next) {
});

/* GET article by id */
api.get('/articles/:id', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Articles A, Abstracts Ab WHERE A.articleID = Ab.articleID AND A.articleID = ?';
            var id = req.params.id;
            
            connection.query(q_string, [id], function(err, rows, fields){
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
                        articles: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

/* PUT updated article by id */
api.put('/articles/:id', function(req, res, next) {
});

/* GET articles by author (email must be encoded) */
api.get('/articles/:email', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Articles A, Abstracts Ab WHERE A.articleID = Ab.articleID AND A.authorEmail = ?';
            var email = req.params.email;
            
            connection.query(q_string, [email], function(err, rows, fields){
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
                        articles: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

/* GET edits */
api.get('/edits/', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Edits';
            
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
                        edits: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

/* POST user edit to an article */
api.post('/edits/', function(req, res, next) {
});

/* GET edits by author */
api.get('/edits/:email', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Edits WHERE authorEmail = ?';
            var email = req.params.email;
            
            connection.query(q_string, [email], function(err, rows, fields){
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
                        edits: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

/* GET edits by date */
api.get('/edits/:date', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Edits WHERE date = ?';
            var date = req.params.date;
            
            connection.query(q_string, [date], function(err, rows, fields){
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
                        edits: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

/* GET edits by article id */
api.get('/edits/:article_id', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Edits WHERE date = ?';
            var article_id = req.params.article_id;
            
            connection.query(q_string, [article_id], function(err, rows, fields){
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
                        edits: JSON.stringify(rows)                        
                    });
                }
            });
        }
        connection.release();
    });
});

module.exports = api;
