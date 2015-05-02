module.exports = function(db){
    var module = {};
    
    module.all = function(req, res, next){
        var q_string = 'SELECT * FROM Fields';
        
        db.select(q_string, [], function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res.rows);
        });
    };

    module.add = function(req, res, next){
        var q_string = 'INSERT INTO Fields SET ?';

        db.insert(q_string, req.body, function(q_res){
            if(q_res.result == 'q_error'){
                res.status(500).send(q_res);
            }
            else res.send(q_res);
        });
    };
    
    return module;
};
