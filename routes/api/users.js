module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT email, city, state, zip,'
            + 'position, website, F.fieldName '
            + 'FROM Users U, Fields F WHERE U.fieldID = F.fieldID';

        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }

    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO Users SET ?';

        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }

    module.update = function(req, res, next){
        var q_string = 'UPDATE Users SET pwHash = ?, city = ?, state = ?, zip = ?, '
            + 'position = ?, website = ?, fieldID = '
            + '(SELECT fieldID FROM Fields WHERE fieldName = ?) WHERE email = ?';
        var q_values = Object.keys(req.body).map(function(k){return req.body[k];});

        db.update(q_string, q_values, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }

    module.delete = function(req, res, next){
        var q_string = 'DELETE FROM Users WHERE ?';

        db.del(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Users U, Fields F '
            + 'WHERE F.fieldID = U.fieldID AND U.?';

        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }

    return module;
}
