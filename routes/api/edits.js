module.exports = function(db){
    var module = {};

    module.all = function(req, res, next) {
        var q_string = 'SELECT * FROM Edits';
        res.locals = res.locals || {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
                end();
            }
            else{
                res.locals.edits = q_res.rows;
                next();
            }
        });
    }

    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO Edits SET ?';
        res.locals = res.locals || {};
        db.post(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
                end();
            }
            else{
                res.locals.result = q_res.result;
                next();
            }
        });
    }

    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM Edits WHERE ?';
        res.locals = res.locals || {};
        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
                end();
            }
            else{
                res.locals.edits = q_res.rows;
                next();
            }
        });
    }

    return module;
}
