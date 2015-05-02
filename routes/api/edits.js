module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT * FROM Edits';
        req.locals = {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
                end();
            }
            else{
                req.locals.edits = q_res.rows;
                next();
            }
        });
    }

    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO Edits SET ?';

        db.post(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
                end();
            }
            else{
                req.locals = q_res;
                next();
            }
        });
    }

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Edits WHERE ?';

        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
                end();
            }
            else{
                req.locals.edits = q_res.rows;
                next();
            }
        });
    }

    return module;
}
