const connection = require('../database');

exports.getUsers = (callback) => {
    connection.getConnection((err, con) => {
        if(err)
            callback(null)
        const query = "SELECT * FROM users;"
        con.query(query, (err, result) => {
            con.release();
            if(err)
                callback(null)
            callback(null, result)
        })
    })
}


exports.getUserByEmail = (email, callback) => {
    connection.getConnection((err, con) => {
        if(err)
            callback(null);
        const query = "select * from users where email = ?";
        con.query(query, email, (err, results) => {
            con.release();
            if(err)
                callback(null)
            callback(null, results)
        })
    })
}
