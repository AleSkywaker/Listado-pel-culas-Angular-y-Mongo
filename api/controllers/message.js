'use strict'

const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const User = require('../models/user');
const Follow = require('../models/follow');
const Message = require('../models/message');


function saveMessage(req, res) {
    let params = req.body;

    if (!params.text || !params.receiver) return res.status(200).send({ message: "Debe rellenar todos los campos" })

    let message = new Message();
    message.emitter = req.user.sub;
    message.text = params.text;
    message.receiver = params.receiver;
    message.created_at = moment().unix();
    message.viewed = 'false'

    message.save((err, messageStored) => {
        if (err) return res.status(500).send({ message: "Error en la petición" })
        if (!messageStored) return res.status(500).send({ message: "Error al enviar el mensaje" })

        res.status(200).send({ message: messageStored })
    })
}

function getReceiverMessages(req, res) {
    let userId = req.user.sub;
    let page = 1;
    let itemsPerPage = 4;

    if (req.params.page) {
        page = req.params.page;
    }

    Message.find({ receiver: userId }).populate('emitter', 'name surname image nick _id').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) return res.status(500).send({ message: "Error en la petición de mensajes recibidos" })
        if (!messages) return res.status(500).send({ message: "Error al recuperar mensajes" })
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        })
    })
}

function getEmitMessages(req, res) {
    let userId = req.user.sub;
    let page = 1;
    let itemsPerPage = 4;

    if (req.params.page) {
        page = req.params.page;
    }

    Message.find({ emitter: userId }).populate('emitter receiver', 'name surname image nick _id').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) return res.status(500).send({ message: "Error en la petición de mensajes recibidos" })
        if (!messages) return res.status(500).send({ message: "Error al recuperar mensajes" })
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        })
    })
}

function getMessagesNoLeidos(req, res) {
    let userLogeado = req.user.sub;

    Message.count({ receiver: userLogeado, viewed: 'false' }).exec((err, count) => {
        if (err) return res.status(500).send({ message: "Error al mostrar mensajes no leidos" });

        return res.status(200).send({
            'no_leidos': count
        })
    })
}

function setViewedMessages(req, res) {
    let userLogeado = req.user.sub;

    Message.update({ receiver: userLogeado, viewed: 'false' }, { viewed: 'true' }, { "multi": true }, (err, messageUpdate) => {
        if (err) return res.status(500).send({ message: "Error al marca mensaje como leido" });
        if (!messageUpdate) return res.status(404).send({ message: "No se ha podido actualizar estado de mensaje" });

        return res.status(200).send({ messages: messageUpdate })
    })
}
module.exports = {
    getReceiverMessages,
    saveMessage,
    getEmitMessages,
    getMessagesNoLeidos,
    setViewedMessages
}