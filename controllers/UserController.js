const User = require('../models/User');

exports.GetEleitores = (request, response) => {
    User.getEleitores((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}

exports.GetEleitorByPartido = (request, response) => {
    User.getEleitorByPartido((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}
