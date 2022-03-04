var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'etsy',
    user: 'root',
    password: 'password'
});

module.exports = connection;