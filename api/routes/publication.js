'use strict'

const express = require('express');
const PublicationController = require('../controllers/publication');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/publications' })

api.post('/guardar-publi', md_auth.ensureAuth, PublicationController.savePublication);
api.get('/get-publications/:page?', md_auth.ensureAuth, PublicationController.getPublications);

module.exports = api;