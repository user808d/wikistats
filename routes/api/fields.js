module.exports = function(db){
    var module = {};
    
    module.all = function(req, res, next){
        var q_string = 'SELECT * FROM Fields';
        req.locals = {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                req.locals.fields = q_res.rows;
                next();
            }
        });
    };

    module.add = function(req, res, next){
        var q_string = 'INSERT INTO Fields SET ?';

        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                req.locals = q_res;
                next();
            }
        });
    };
    
    return module;
};
