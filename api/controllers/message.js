'use strict'

const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const User = require('../models/user');
const Follow = require('../models/follow');
const Message = require('../models/message');


function prueba(req, res) {
    return res.status(200).send({ message: "probando" })
}

function saveMessage(req, res) {
    let params = req.body;

    if (params.text) {

    }

}
module.exports = {
    prueba
}