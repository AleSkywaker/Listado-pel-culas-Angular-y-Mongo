'use strict'

const express = require('express');
const UserController = require('../controllers/user.js');

const api = express.Router();

api.post('/save-user', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;