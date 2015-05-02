module.exports = function(db){
    var module = {};

    module.all = function(req, res, next){
        var q_string = 'SELECT * FROM Types';

        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    }

    return module;
}
