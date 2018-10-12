'use strict'

const express = require('express');
const md_auth = require('../middlewares/authenticated');
const MessageController = require('../controllers//message.js');

const api = express.Router();

// api.get('/probandocontroller', MessageController.prueba);
api.post('/save-message', md_auth.ensureAuth, MessageController.saveMessage)
api.get('/messages/:page?', md_auth.ensureAuth, MessageController.getReceiverMessages)

module.exports = api;