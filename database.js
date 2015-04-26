var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'wstatsuser',
    password: 'WikiStats15!',
    database: 'wikistats_db'
});

module.exports = pool;
