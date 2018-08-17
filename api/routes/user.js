'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const md_auth = require('../middlewares/authenticated')

const api = express.Router();

api.post('/save-user', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/prueba', md_auth.ensureAuth, UserController.pruebas);
api.get('/get-user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);

module.exports = api;