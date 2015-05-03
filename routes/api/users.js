module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT email, city, state, zip,'
            + 'position, website, fieldName '
            + 'FROM Users U, Fields F WHERE U.fieldID = F.fieldID';
        req.locals = {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                req.locals.users = q_res.rows;
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
                console.log(req.body.fieldName);
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

            db.insert(q_string, req.body, function(q_res){
                if(q_res.result == 'q_error'){
                    res.status(500).send(q_res);
                }
                else{
                    req.locals = q_res;
                    next();
                }
            });
        }
    ]

    module.update = function(req, res, next){
        var q_string = 'UPDATE Users SET pwHash = ?, city = ?, state = ?, zip = ?, '
            + 'position = ?, website = ?, fieldID = '
            + '(SELECT fieldID FROM Fields WHERE fieldName = ?) WHERE email = ?';
        var q_values = Object.keys(req.body).map(function(k){return req.body[k];});

        db.update(q_string, q_values, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                req.locals = q_res;
                next();
            }
        });
    }

    module.delete = [
        function(req, res, next){
            var q_string = 'SELECT tableName FROM Stats S, Articles A, Users U '
                + 'WHERE S.articleID = A.articleID AND A.authorEmail = U.email '
                + 'AND U.?';

            db.select(q_string, req.body, function(q_res){
                if(q_res.result == 'q_error'){
                    res.status(500).send(q_res);
                }
                else{
                    req.locals = q_res.rows;
                    next();
                }
            });
        },
        function(req, res, next){
            var q_string = 'DROP TABLE IF EXISTS ??';
            var q_params = [];

            if(req.locals.length > 0){
                for(var i in req.locals)
                    for(var k in req.locals[i])
                        q_params.push(req.locals[i][k]);

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

            db.del(q_string, req.body, function(q_res){
                if(q_res.result == 'q_error'){
                    res.status(500).send(q_res);
                }
                else{
                    req.locals = q_res;
                    next();
                }
            });
        }
    ]

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Users U, Fields F '
            + 'WHERE F.fieldID = U.fieldID AND U.?';
        req.locals = {};
        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                req.locals.user = q_res.rows[0];
                next();
            }
        });
    }

    module.auth = function(req, res, next){
        var q_string = 'SELECT email FROM Users '
            + 'WHERE email = ? AND pwHash = ?';
        var q_values = Object.keys(req.body).map(function(k){return req.body[k];});
        
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
