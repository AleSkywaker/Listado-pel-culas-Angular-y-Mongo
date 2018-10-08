'use strict'

const express = require('express');
const md_auth = require('../middlewares/authenticated');
const MessageController = require('../controllers//message.js');

const api = express.Router();

api.get('/probandocontroller', MessageController.prueba)

module.exports = api;