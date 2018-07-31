'use strict'

const User = require('../models/user');

function home(req, res) {
    res.status(200).send({ message: "Pruebas en servidor NodeJs" })
}

function pruebas(req, res) {
    console.log(req.body);
    res.status(200).send({ message: "Pruebas en servidor NodeJs" })
}

module.exports = {
    home,
    pruebas
}