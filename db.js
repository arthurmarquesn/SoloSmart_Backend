const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'devuser',
    password: 'senha123',
    database: 'solosmart'
});

module.exports = pool.promise();
