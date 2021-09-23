const Eleitor = require('../models/Eleitor');

exports.GetEleitores = (request, response) => {
    Eleitor.getEleitores((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}

exports.UpdateEleitor = (request, response) => {
    const id = request.params.id;
    const value = request.body.value;
    const columnId = request.body.columnId;
    Eleitor.updateEleitor(id, columnId, value, (err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}

exports.CreateEleitor = (request, response) => {
    Eleitor.createEleitor((err, result) => {
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
