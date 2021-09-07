const Eleitor = require('../models/Eleitor');

exports.GetEleitores = (request, response) => {
    Eleitor.getEleitores((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}

exports.GetEleitoresPSD = (request, response) => {
    Eleitor.getEleitoresPSD((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}

exports.GetEleitoresPS = (request, response) => {
    Eleitor.getEleitoresPS((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}
