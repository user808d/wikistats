module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
            + 'WHERE A.articleID = Ab.articleID';
        res.locals = res.locals || {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.articles = q_res.rows;
                next();
            }
        });
    }
 
    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO Articles SET ?';
        res.locals = res.locals || {};
        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.result = q_res.result;
                next();
            }
        });
    }
    
    module.update = function(req, res, next) {
        var q_string = 'UPDATE Articles SET title = ? WHERE articleID = ?';
        var q_values = Object.keys(req.body).map(function(k){return req.body[k]});
        res.locals = res.locals || {};
        db.update(q_string, q_values, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.result = q_res.result;
                next();
            }
        });
    }

    module.delete = function(req, res, next) {
        var q_string = 'DELETE FROM Articles WHERE ?';
        res.locals = res.locals || {};
        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.result = q_res.result;
                next();
            }
        });
    }

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Articles A, Abstracts Ab, URLReferences U, '
            + 'Stats S, Types T '
            + 'WHERE A.articleID = Ab.articleID AND A.? AND '
            + 'A.articleID = S.articleID AND A.articleID = U.articleID';
        res.locals = res.locals || {};
        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.articles = q_res.rows;
                next();
            }
        });
    }

    module.findLike = function(req, res, next){
        var q_string = 'SELECT * FROM Articles A, Abstracts Ab WHERE '
            + 'A.articleID = Ab.articleID AND (title LIKE \'%';
        var q_params = Object.keys(req.body).map(function(k){return req.body[k]});
        q_string += q_params[0] + '%\' OR content LIKE \'%'
            + q_params[0] + '%\' OR authorEmail LIKE \'%' + q_params[0]
            + '%\')';
        res.locals = res.locals || {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.articles = q_res.rows;
                next();
            }
        });        
    }

    return module;
}

