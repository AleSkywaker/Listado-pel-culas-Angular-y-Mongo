'use strict'

const express = require('express');
const PublicationController = require('../controllers/publication');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.get('/probando-publi', md_auth.ensureAuth, PublicationController.probando);

module.exports = api;