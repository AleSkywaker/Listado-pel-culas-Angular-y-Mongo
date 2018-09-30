'use strict'

const path = require('path');
const fs = require('fs');
const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const Publication = require('../models/publication');
const User = require('../models/user');
const Follow = require('../models/follow');

function probando(req, res) {
    res.status(200).send({ messge: "Hola desde controlador de publicaciones" })
}

module.exports = {
    probando
}