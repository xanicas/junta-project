const connection = require('../database');

exports.getEleitores = (callback) => {
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

exports.getEleitorByPartido = (callback) => {
    connection.getConnection((err, con) => {
        if(err)
            callback(null);
        const query = "select * from eleitores where psd = 1";
        con.query(query, (err, results) => {
            con.release();
            if(err)
                callback(null)
            callback(null, results)
        })
    })
}