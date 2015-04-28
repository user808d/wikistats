var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'wstatsuser',
    password: 'WikiStats15!',
    database: 'wikistats_db'
});

pool.select = function(queryString, params, cb){
    pool.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            cb({result: 'con_error', err: err.code});
        }
        else{            
            connection.query(queryString, params, function(err, rows, cols){
                connection.release();
                if(err){
                    console.error(err);
                    cb({
                        result: 'q_error',
                        err: err.code
                    });
                }
                else{
                    cb({
                        result: 'success',
                        rows: rows,
                        cols: cols
                    });
                }
            });
        }
    });
};

pool.insert = function(queryString, values, cb){
    pool.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            cb({result: 'con_error', err: err.code});
        }
        else{            
            connection.query(queryString, values, function(err, rows, cols){
                connection.release();
                if(err){
                    console.error(err);
                    cb({
                        result: 'q_error',
                        err: err.code
                    });
                }
                else{
                    cb({result: 'success'});
                }
            });
        }
    });
};

pool.update = function(queryString, values, cb){
    pool.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            cb({result: 'con_error', err: err.code});
        }
        else{            
            connection.query(queryString, values, function(err, rows, cols){
                connection.release();
                if(err){
                    console.error(err);
                    cb({
                        result: 'q_error',
                        err: err.code
                    });
                }
                else{
                    cb({result: 'success'});
                }
            });
        }
    });
};

pool.del = function(queryString, values, cb){
    pool.getConnection(function(err, connection){
        if(err){
            console.error('Connection error: ', err);
            cb({result: 'con_error', err: err.code});
        }
        else{            
            connection.query(queryString, values, function(err, rows, cols){
                connection.release();
                if(err){
                    console.error(err);
                    cb({
                        result: 'q_error',
                        err: err.code
                    });
                }
                else{
                    cb({result: 'success'});
                }
            });
        }
    });
};

module.exports = pool;
