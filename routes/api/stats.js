module.exports = function(db){
    var module = {};

    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO Stats SET ?';
        
        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }
    
    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Stats S, Types T '
            + 'WHERE S.typeID = T.typeID AND S.?';

        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }

    return module;
}
