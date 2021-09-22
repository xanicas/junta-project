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

exports.updateEleitor = (id, columnId, value, callback) => {
    connection.getConnection((err, con) => {
        if(err)
            callback(null)
        const query = "update eleitores set ?? = ? where id = ?"
        con.query(query, [columnId, value, id], (err, result) => {
            if(err)
                callback(null)
            callback(null, result);
        })
    })
}

exports.getEleitoresPSD = (callback) => {
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

exports.getEleitoresPS = (callback) => {
    connection.getConnection((err, con) => {
        if(err)
            callback(null);
        const query = "select * from eleitores where ps = 1";
        con.query(query, (err, results) => {
            con.release();
            if(err)
                callback(null)
            callback(null, results)
        })
    })
}