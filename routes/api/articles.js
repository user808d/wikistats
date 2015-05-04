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

    module.delete = [
        function(req, res, next){
            var q_string = 'SELECT tableName FROM Stats S, Articles A '
                + 'WHERE S.articleID = A.articleID AND A.?';
            res.locals = res.locals || {};
            db.select(q_string, req.params, function(q_res){
                if(q_res.result == 'q_error'){
                    res.status(500).send(q_res);
                }
                else{
                    res.locals.tables = q_res.rows;
                    next();
                }
            });
        },
        function(req, res, next){
            var q_string = 'DROP TABLE IF EXISTS ??';
            var q_params = [];

            if(res.locals.tables.length > 0){
                for(var i in res.locals.tables)
                    for(var k in res.locals.tables[i])
                        q_params.push(res.locals.tables[i][k]);

                db.del(q_string, q_params, function(q_res){
                    if(q_res.result == 'q_error'){
                        res.status(500).send(q_res);
                    }
                    else next();
                });
            }
            else next();
        },
        function(req, res, next) { 
            var q_string = 'DELETE FROM Articles WHERE ?';
            res.locals = res.locals || {};
            db.insert(q_string, req.params, function(q_res){
                if(q_res.result == 'q_error'){
                    res.status(500).send(q_res);
                }
                else{
                    res.locals.result = q_res.result;
                    next();
                }
            });
        }
                    ]

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Articles A, Abstracts Ab, '
            + 'Stats S, Types T '
            + 'WHERE A.articleID = Ab.articleID AND A.? AND '
            + 'A.articleID = S.articleID';
        res.locals = res.locals || {};
        console.log(req.params);
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
            + q_params[0] + '%\' OR email LIKE \'%' + q_params[0]
            + '%\') ORDER BY pubDate DESC';
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

