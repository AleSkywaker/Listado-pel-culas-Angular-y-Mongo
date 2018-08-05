'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function saveUser(req, res) {
    let params = req.body;
    let user = new User();
    if (params.password != params.password2) {
        return res.status(200).send({ message: "Las contraseñas NO son iguales" })
    }
    if (params.name && params.surname && params.nick && params.email && params.password) {

        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.find({
            $or: [{ email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) { return res.status(500).send({ message: "Error al guardar el usuario" }) }
            if (users && users.length >= 1) { return res.status(200).send({ message: "El email o nick ya existe en la base de datos" }) } else {

                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((errr, userStored) => {
                        if (err) return res.status(500).send({ message: "Error al guardar el usuario" })
                        if (userStored) {
                            res.status(200).send({ send: userStored });
                        } else {
                            res.status(404).send({ message: "No se ha registrado el usuario" });
                        }
                    })
                })

            }
        })


    } else {
        res.status(200).send({ message: "Debes rellenar todos los campos" })
    }

}

module.exports = {
    saveUser
}