module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT * FROM Edits';

        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }

    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO Edits SET ?';
        
        db.post(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    }

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Edits WHERE ?';

        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }

    return module;
}
