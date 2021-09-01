const connection = require('../database');

exports.getUsers = (callback) => {
    connection.getConnection((err, con) => {
        if(err)
            callback(null)
        const query = "SELECT * FROM eleitores;"
        con.query(query, (err, result) => {
            con.release();
            if(err)
                callback(null)
            callback(null, result)
        })
    })
}
