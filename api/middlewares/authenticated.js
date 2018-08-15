'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = process.env.CLAVE_SECRETA

exports.ensureAuth = function(req, res, next) {

    if (!req.headers.authorization) {
        res.status(403).send({ message: "La cabecera no tiene authorazación" })
    }

    let token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        var payload = jwt.decode(token, secret)
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'El token ha expirado'
            })
        }
    } catch (error) {
        return res.status(403).send({
            message: 'El token no es válido'
        })
    }

    req.user = payload

    next()

}