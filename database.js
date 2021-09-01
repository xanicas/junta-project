const mysql = require('mysql');
const config = require('./config')

const connection = mysql.createPool({
    connectionLimit: 100,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

module.exports = connection;