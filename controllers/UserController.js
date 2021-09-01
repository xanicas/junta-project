const User = require('../models/User');

exports.GetUsers = (request, response) => {
    User.getUsers((err, result) => {
        if(err)
            response.send({ success: false, message: "Error" })
        else
            response.send({ success: true, data: result })
    })
}
