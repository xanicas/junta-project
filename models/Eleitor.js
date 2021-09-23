const connection = require('../database');

exports.getEleitores = (callback) => {
    connection.connect(function(err, client, done) {
        if(err) {
          return console.error('connexion error', err);
        }
        client.query('SELECT * FROM public.eleitores;', function(err, data) {
          done();
          if(err) {
            return console.error('error running query', err);
          }
          callback(null, data.rows);
        });
    });
}

exports.updateEleitor = async (id, columnId, value, callback) => {
    connection.connect(function(err, client, done) {
        if(err) {
          return console.error('connexion error', err);
        }
        const format = require('pg-format');
        const query = format("update public.eleitores set %I = $1 where id = $2;", columnId);
        client.query(query, [value, id], function(err, data) {
          done();
          if(err) {
            return console.error('error running query', err);
          }
          callback(null, data);
        });
    });
}

exports.createEleitor = (callback) => {
    connection.connect(function(err, client, done) {
        if(err) {
          return console.error('connexion error', err);
        }
        client.query("INSERT INTO public.eleitores(psd, ps, other, indef, abst, name, contact, day, month, year, age, natur, address) VALUES ('', '', 0, 0, 0, '', '', '', 0, 0, 0, '', '');", function(err, data) {
          done();
          if(err) {
            return console.error('error running query', err);
          }
          callback(null, data.rows);
        });
    });
}

exports.getEleitoresPSD = (callback) => {
    connection.connect();
    const query = "select * from public.eleitores where psd = 1"
    connection.query(query, (err, result) => {
        if (err)
            callback(null)
        callback(null, result.rows)
    });
}

exports.getEleitoresPS = (callback) => {
    connection.connect();
    const query = "select * from public.eleitores where ps = 1"
    connection.query(query, (err, result) => {
        if (err)
            callback(null)
        callback(null, result.rows)
    });
}