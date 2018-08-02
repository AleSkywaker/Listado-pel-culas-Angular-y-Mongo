'use strict'

const express = require('express');
const UserController = require('../controllers/user.js');

const api = express.Router();

api.get('/home', UserController.home);
api.get('/pruebas', UserController.pruebas);
api.post('/guardarusuario', UserController.saveUser);

module.exports = api;