var express = require('express');
var db = require('../database');
var api = express.Router();

/* GET fields */

/* GET users */
api.get('/users/', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT email, city, state, zip,'
                + 'position, website, F.fieldName '
                + 'FROM Users U, Fields F WHERE U.fieldID = F.fieldID';
            
            connection.query(q_string, function(err, rows, fields){
                connection.release();
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
                        users: rows
                    });
                }
            });
        }
    });
});

/* POST new user */
api.post('/users/', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{            
            var email = req.body.email,
                pwHash = req.body.pwHash,
                city = req.body.city,
                state = req.body.state,
                zip = req.body.zip,
                position = req.body.position,
                website = req.body.website,
                fieldName = req.body.fieldName;

            q_string = 'INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?, ?, '
                + '(SELECT fieldID FROM Fields WHERE fieldName = ?));';
            
            connection.query(q_string,
                             [email, pwHash, city,
                              state, zip, position, website,
                              fieldName],
                             function(err, rows, fields){
                                 connection.release();
                                 if(err){
                                     console.error(err);
                                     res.statusCode = 500;
                                     res.send({
                                         result: 'error',
                                         err: err.code
                                     });
                                 }
                                 else{
                                     res.redirect('/api/users/'+email);
                                 }
            });
        }
    });
});

/* PUT updated user info */
api.put('/users/:email', function(req, res, next){
});

/* DELETE user */
api.delete('/users/:email', function(req, res, next){
});

/* GET user info by email */
api.get('/users/:email', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Users U, Fields F '
                + 'WHERE F.fieldID = U.fieldID AND U.email = ?;';

            var email = req.params.email;
            
            connection.query(q_string, [email], function(err, rows, fields){
                connection.release();
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
                        users: rows
                    });
                }
            });
        }
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
            var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
                + 'WHERE A.articleID = Ab.articleID;';
            
            connection.query(q_string, function(err, rows, fields){
                connection.release();         
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
                        articles: rows
                    });
                }
            });
        }
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
            var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
                + 'WHERE A.articleID = Ab.articleID AND A.articleID = ?;';
            var id = req.params.id;
            
            connection.query(q_string, [id], function(err, rows, fields){
                connection.release();
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
                        articles: rows
                    });
                }
            });
        }
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
            var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
                + 'WHERE A.articleID = Ab.articleID AND A.authorEmail = ?;';

            var email = req.params.email;
            
            connection.query(q_string, [email], function(err, rows, fields){
                connection.release();         
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
                        articles: rows
                    });
                }
            });
        }
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
            var q_string = 'SELECT * FROM Edits;';
            
            connection.query(q_string, function(err, rows, fields){
                connection.release();         
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
                        edits: rows
                    });
                }
            });
        }
    });
});

/* POST user edit to an article */
api.post('/edits/:article_id', function(req, res, next) {
});

/* GET edits by author */
api.get('/edits/:email', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Edits WHERE authorEmail = ?;';
            var email = req.params.email;
            
            connection.query(q_string, [email], function(err, rows, fields){
                connection.release();
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
                        edits: rows
                    });
                }
            });
        }
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
            var q_string = 'SELECT * FROM Edits WHERE date = ?;';
            var date = req.params.date;
            
            connection.query(q_string, [date], function(err, rows, fields){
                connection.release();         
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
                        edits: rows
                    });
                }
            });
        }
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
            var q_string = 'SELECT * FROM Edits WHERE articleID = ?;';
            var article_id = req.params.article_id;
            
            connection.query(q_string, [article_id], function(err, rows, fields){
                connection.release();
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
                        edits: rows
                    });
                }
            });
        }
    });
});

/* GET stats for an article */
api.get('/stats/:article_id', function(req, res, next) {
    db.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{
            var q_string = 'SELECT * FROM Stats S, Types T'
                + 'WHERE S.typeID = T.typeID AND S.articleID = ?;';
            
            var article_id = req.params.article_id;
            
            connection.query(q_string, [article_id], function(err, rows, fields){
                connection.release();
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
                        stats: rows                        
                    });
                }
            });
        }
    });
});

module.exports = api;
