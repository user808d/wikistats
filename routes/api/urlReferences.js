module.exports = function(db){
    var module = {};
    
    module.find = function(req, res, next) {
        var q_string = 'SELECT * FROM URLReferences WHERE ?';
        res.locals = res.locals || {};
        db.select(q_string, req.params, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.urlReferences = q_res.rows;
                next();
            }
        });
    }

    module.add = function(req, res, next) {
        var q_string = 'INSERT INTO URLReferences SET ?';
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
        var q_string = 'UPDATE URLReferences SET urlReference = ? '
            + 'WHERE articleID = ? AND urlReference = ?';
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

    return module;
}
