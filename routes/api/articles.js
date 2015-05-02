module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT * FROM Articles A, Abstracts Ab '
            + 'WHERE A.articleID = Ab.articleID';
        
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }
 
    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO Articles SET ?';

        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }
    
    module.update = function(req, res, next) {
        var q_string = 'UPDATE Articles SET title = ? WHERE articleID = ?';
        var q_values = Object.keys(req.body).map(function(k){return req.body[k]});

        db.update(q_string, q_values, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }

    module.delete = function(req, res, next) {
        var q_string = 'DELETE FROM Articles WHERE ?';

        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Articles A, Abstracts Ab, URLReferences U, '
            + 'Stats S, Types T '
            + 'WHERE A.articleID = Ab.articleID AND A.? AND '
            + 'A.articleID = S.articleID AND A.articleID = U.articleID';

        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }

    return module;
}
