module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT email, city, state, zip,'
            + 'position, website, fieldName '
            + 'FROM Users U, Fields F WHERE U.fieldID = F.fieldID';
        res.locals = res.locals || {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.users = q_res.rows;
                next();
            }
        });
    }

    module.add = [
        function(req, res, next){
            var q_string = 'SELECT fieldID FROM Fields WHERE fieldName = ?';

            db.select(q_string, req.body.fieldName, function(q_res){
                if(q_res.result == 'q_error'){
                    res.status(500).send(q_res);
                }
                else{
                    if(q_res.rows[0]){
                        req.body.fieldID = q_res.rows[0].fieldID;
                    }
                    next();
                }
            });
        },
        function(req, res, next){
            var q_string = 'INSERT INTO Fields SET fieldName = ?';

            if(req.body.fieldID){
                delete req.body.fieldName;
                next();
            }
            else{
                db.insert(q_string, req.body.fieldName, function(q_res){
                    if(q_res.result == 'q_error'){
                        res.status(500).send(q_res); 
                    }
                    else{
                        req.body.fieldID = q_res.id;
                        delete req.body.fieldName;
                        next();
                    }
                });
            }
        },
        function(req, res, next) {
            var q_string = 'INSERT INTO Users SET ?';
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
    ]

    module.update = [
        function(req, res, next){
            var q_string = 'INSERT INTO Fields SET fieldName = ?';

            db.insert(q_string, req.body.fieldName, function(q_res){
                    next();
            });
        },
        function(req, res, next){
            var q_string = 'UPDATE Users SET pwHash = ?, city = ?, state = ?, '
                + 'zip = ?, position = ?, website = ?, fieldID = '
                + '(SELECT fieldID FROM Fields WHERE fieldName = ?) WHERE email = ?';
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
    ]

    module.delete = [
        function(req, res, next){
            var q_string = 'SELECT tableName FROM Stats S, Articles A, Users U '
                + 'WHERE S.articleID = A.articleID AND A.email = U.email '
                + 'AND U.?';
            res.locals = res.locals || {};
            db.select(q_string, req.body, function(q_res){
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
        function(req, res, next){
            var q_string = 'DELETE FROM Users WHERE ?';
            res.locals = res.locals || {};
            db.del(q_string, req.body, function(q_res){
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
        var q_string = 'SELECT * FROM Users U, Fields F '
            + 'WHERE F.fieldID = U.fieldID AND U.?';
        res.locals = res.locals || {};
        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.user = q_res.rows[0];
                next();
            }
        });
    }

    module.auth = function(req, res, next){
        var q_string = 'SELECT email FROM Users '
            + 'WHERE email = ? AND pwHash = ?';
        var q_values = Object.keys(req.body).map(function(k){return req.body[k];});
        res.locals = res.locals || {};
        db.select(q_string, q_values, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                req.session_state.user = q_res.rows[0];
                res.locals.user = req.session_state.user;
                next();
            }
        });
    }

    return module;
}
