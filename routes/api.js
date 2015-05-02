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
var urlRef = require('./api/urlReferences.js')(db);

api.route('/fields')
    .get(fields.all) //get all fields
    .post(fields.add); //new field

api.route('/users')
    .get(users.all) //get all users
    .post(users.add) //new user
    .put(users.update) //update user
    .delete(users.delete); //remove user
api.route('/users/:email')
    .get(users.find); //find user by email(id)

api.route('/types')
    .get(types.all); //get all types

api.route('/articles')
    .get(articles.all) //get all articles
    .post(articles.add) //new article
    .put(articles.update) //update article
    .delete(articles.delete); //remove article
api.route('/articles/:articleID')
    .get(articles.find); //find article by id
api.route('/articles/:authorEmail')
    .get(articles.find); //find article by email
api.route('/articles/:pubDate')
    .get(articles.find); //get articles by date

api.route('/stats')
    .post(stats.add); //new stat for article
api.route('/stats/:articleID')
    .get(stats.find); //find stat by articleID

api.route('/edits')
    .get(edits.all) //get all edits
    .post(edits.add); //new article edit
api.route('/edits/:authorEmail')
    .get(edits.find); //get all user edits by email
api.route('/edits/:editDate')
    .get(edits.find); //get all edits by date
api.route('/edits/:articleID')
    .get(edits.find); //get all edits on an article

api.route('/abstracts')
    .post(abstracts.add)
    .put(abstracts.update);
api.route('/abstracts/:articleID')
    .get(abstracts.find);

api.route('/urlReferences')
    .post(urlRef.add)
    .put(urlRef.update);
api.route('/urlReferences/:articleID')
    .get(urlRef.find);

/* POST csv data */
api.post('/upload/', function(req, res, next) {
    var q_string = 'CREATE TABLE IF NOT EXISTS ? '
        + '( vid INT AUTO INCREMENT, ';
    var headers = JSON.parse(req.body.headers);
    var q_params = [];
    q_params.push(req.body.title);
    
    for(var i = 0; i < headers.length; ++i){
        q_string += '? ?, ';
    }
    q_string += 'PRIMARY KEY vid );';
    
    console.log(q_string, q_params, req.body.headers);
    /*db.insert(q_string, q_values, function(q_res){
        if(q_res.result == 'q_error'){
            res.status(500).send(q_res);
        }
        else res.send(q_res);
    });*/
});

module.exports = api;
