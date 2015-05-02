module.exports = function(db){
    var module = {};

    module.all = function(req, res, next){
        var q_string = 'SELECT * FROM Types';
        req.locals = {};
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else{
                req.locals.types = q_res.rows;
                next();
            }
        });
    }

    return module;
}
