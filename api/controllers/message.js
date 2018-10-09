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

    if (!params.text || !params.receiver) return res.status(200).send({ message: "Debe rellenar todos los campos" })

    let message = new Message();
    message.emitter = req.user.sub;
    message.text = params.text;
    message.receiver = params.receiver;
    message.created_at = moment().unix();

    message.save((err, messageStored) => {
        if (err) return res.status(500).send({ message: "Error en la petición" })
        if (!messageStored) return res.status(500).send({ message: "Error al enviar el mensaje" })

        res.status(200).send({ message: messageStored })
    })

}
module.exports = {
    prueba,
    saveMessage
}