'use strict'

const express = require('express');
const kaka = require('../controllers/user.js');

const api = express.Router();

api.get('/home', kaka.home);
api.get('/pruebas', kaka.pruebas);

module.exports = api;