'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const md_auth = require('../middlewares/authenticated')

const api = express.Router();

api.post('/save-user', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/prueba', md_auth.ensureAuth, UserController.pruebas);

module.exports = api;