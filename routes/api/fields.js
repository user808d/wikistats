module.exports = function(db){
    var module = {};
    
    module.all = function(req, res, next){
        var q_string = 'SELECT * FROM Fields';
        res.locals = res.locals || {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                res.locals.fields = q_res.rows;
                next();
            }
        });
    };

    module.add = function(req, res, next){
        var q_string = 'INSERT INTO Fields SET ?';
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
    };
    
    return module;
};
