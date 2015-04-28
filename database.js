var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'wstatsuser',
    password: 'WikiStats15!',
    database: 'wikistats_db'
});

pool.select = function(res, queryString, params){
    pool.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{            
            connection.query(queryString, params, function(err, rows, fields){
                connection.release();
                if(err){
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err: err.code
                    });
                }
                else{
                    res.send({
                        rows: rows
                    });
                }
            });
        }
    });
};

pool.insert = function(res, queryString, values){
    pool.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            res.send({result: 'error', err: err.code});
        }
        else{            
            connection.query(queryString, values, function(err, rows, fields){
                connection.release();
                if(err){
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err: err.code
                    });
                }
                else{
                    res.send('Success');
                }
            });
        }
    });
};

module.exports = pool;
