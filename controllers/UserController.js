const User = require('../models/User');

exports.GetEleitores = (request, response) => {
    User.getEleitores((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}

exports.GetEleitoresPSD = (request, response) => {
    User.getEleitoresPSD((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}

exports.GetEleitoresPS = (request, response) => {
    User.getEleitoresPS((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}
