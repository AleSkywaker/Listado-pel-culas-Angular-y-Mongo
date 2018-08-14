'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = process.env.CLAVE_SECRETA

exports.ensureAuth = function(req, res, next) {

    if (!req.headers.authorization) {
        res.status(403).send({ message: "La cabecera no tiene authorazación" })
    }

}