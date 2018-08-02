'use strict'

const User = require('../models/user');

function saveUser(req, res) {
    let params = req.body;
    // let user = new User();
    if (params.password === params.password2) {
        res.status(200).send({ message: "Las contraseñas son iguales" })
    } else {
        res.status(200).send({ message: "Las contraseñas NO son iguales" })
    }


}

module.exports = {
    saveUser
}